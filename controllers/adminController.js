import bcrypt from 'bcrypt';
import validator from 'validator';
import Doctor from '../models/doctors.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      degree,
      about,
      fees,
      speciality,
      experience,
      address,
    } = req.body;

    // Basic validation
    if (
      !name || !email || !password || !degree || !fees ||
      !speciality || !experience || !address || !req.file
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check for existing email
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Doctor with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse address
    let parsedAddress = {};
    try {
      parsedAddress = JSON.parse(address);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid address format (must be JSON)' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'doctors',
    });

    // Clean up local temp file
    fs.unlinkSync(req.file.path);

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      degree,
      about,
      fees,
      speciality,
      experience,
      address: parsedAddress,
      image: result.secure_url, // Cloudinary image URL
    });

    await doctor.save();
    res.status(201).json({ success: true, message: 'Doctor added successfully', doctor });
  } catch (error) {
    console.error('Add Doctor Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add doctor', error });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { addDoctor, loginAdmin};
