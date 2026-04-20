
const express = require("express");
const path = require("path");
const app = express();
// config/passport.js
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
require('./config/passport');

const port = 8080;

// EJS removed
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
    
mongoose.connect('mongodb://127.0.0.1:27017/visionvault', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('You must be logged in to upload files.');
  }
  

app.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

app.post('/signup', async (req, res) => {
    try {
      const { username, password , email } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }
  
      const newUser = new User({ username, password, email });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).send('Error registering user: ' + error.message);
    }
  });

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Logged out successfully' });
    });
});  


app.post('/upload', isAuthenticated, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      // Upload file to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'raw' },  // Automatically detects file type (image/video)
          (error, result) => {
            if (error) {
              console.log('Cloudinary upload error:', error);
              return reject(error);
            }
            resolve(result);
          }
        ).end(req.file.buffer);  // Pipe the file buffer to Cloudinary
      });
  
      // Store file details in MongoDB
      const uploadedFileDetails = {
        url: result.secure_url,
        public_id: result.public_id,
        filename: req.file.originalname
      };
  
      const user = req.user;  // Assuming the user is authenticated
      await User.findByIdAndUpdate(user._id, {
        $push: { uploadedFiles: uploadedFileDetails }
      });
  
      // Send success response
      res.json({
        projectTitle: req.body.title,
        fileUrl: result.secure_url,
        user: req.user,
        fileName: req.file.originalname
      });
  
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
  });

  
app.listen(port, () => {
    console.log(`App is listening on port ${8080}`);
});