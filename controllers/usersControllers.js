import bcrypt from "bcryptjs";
import validator from 'validator';
import User from "../models/user.js"; 
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  try {
    const { FullName, Email, Phone, Password, Address, Gender, Dob } = req.body;

    if (!FullName || !Email || !Phone || !Password) {
      return res.status(400).json({ success: false, message: "Invalid user data" });
    }

    if (!validator.isEmail(Email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existing = await User.findOne({ Email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    let profilePicUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'users',
      });
      profilePicUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = new User({
      FullName: FullName,
      Email,
      Phone,
      Password: hashedPassword,
      profilePic: profilePicUrl,
      Address: Address,
      Gender,
      Dob
    });

    await user.save();

    res.status(201).json({ success: true, message: 'User added successfully', user });
  } catch (error) {
    console.error('Add User Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add user', error });
  }
};

export default createUser;
