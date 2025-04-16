const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const multer = require("multer");
const path = require("path");

const userModel = require('./models/userModel'); // Ensure this model exists and is correct

const PORT = 8000;
const JWT_SECRET = '123321'; // Use environment variables for better security

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for text data
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// DB Connection
mongoose.connect("mongodb://localhost:27017/exam_ms")
    .then(con => console.log(`Mongoose connected to host: ${con.connection.host}`))
    .catch(err => console.log(err));


// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize multer
const upload = multer({ storage: storage });

// Example route for user registration with image upload
app.post("/register", upload.single("image"), async (req, res) => {
  try {
    // Extract data from req.body
    const { name, email, phone, address, city, state, zipCode, password, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !address || !city || !state || !zipCode || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Validate role if provided
    const validRoles = ['admin', 'student'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds

    const imageUrl = req.file ? req.file.path : null; // Get image path from file, if uploaded

    // Save the new user to the database
    const newUser = await userModel.create({
      name,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      password: hashedPassword, // Save the hashed password
      image: imageUrl, // Save the image path in the 'image' field
      role: role || 'student' // Default to 'student' if role not provided
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// Login with Password Validation and JWT Token
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No record exists for this email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        // Generate JWT token on successful login
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login', error: err });
    }
});

// Route to fetch user data
app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Route to update the users
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});

// In your Express server (server.js or routes file)
app.get('/users', async (req, res) => {
  try {
    const users = await userModel.find();  // Assuming you're using Mongoose
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

