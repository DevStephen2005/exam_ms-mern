require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT token generation
const multer = require("multer");
const path = require("path");

const User = require("./models/userModel"); // Ensure this model exists and is correct
const RegistrationModel = require("./models/registrationModel"); 
const ExamModel = require("./models/ExamModel"); 


const PORT = 8000;
const JWT_SECRET = "123321"; // Use environment variables for better security

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for text data
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// DB Connection
mongoose
  .connect("mongodb://localhost:27017/exam_ms")
  .then((con) =>
    console.log(`Mongoose connected to host: ${con.connection.host}`)
  )
  .catch((err) => console.log(err));


// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

// File filter (optional: add type/size checks)
const upload = multer({ storage });

// POST register
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body; // Destructure role

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Create and save new user with role
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role }, // Include role in the payload
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // send token to frontend
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role, // Include role in the response
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token with role
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },  // Include role in the payload
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send response with token and user info
    res.status(200).json({
      success: true,
      token, // Send token to frontend
      role: user.role, // Include the role
      userId: user._id,
      name:user.name
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Handle form data with files
app.post('/examRegistrations', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'idProof', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      name,email, dob, gender, mobilePrimary, mobileReentered, mobileAlternate,
      country, state, city, idProofType
    } = req.body;

    const registration = new RegistrationModel({
      name,
      email,
      dob,
      gender,
      mobilePrimary,
      mobileReentered,
      mobileAlternate,
      country,
      state,
      city,
      idProofType,
      photo: req.files.photo?.[0]?.path || '',
      signature: req.files.signature?.[0]?.path || '',
      idProof: req.files.idProof?.[0]?.path || '',
    });

    await registration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ message: 'Error saving registration' });
  }
});


// GET all exams (exam schedule)
app.get("/exams", async (req, res) => {
  try {
    const exams = await ExamModel.find().sort({ date: 1 }); // sorted by date
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam schedule" });
  }
});

// GET top 2 upcoming exams
app.get("/", async (req, res) => {
  try {
    const exams = await ExamModel.find()
      .sort({ date: 1 }) // sort by soonest date
      .limit(2);         // only return 2 records

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam schedule" });
  }
});
