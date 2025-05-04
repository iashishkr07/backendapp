import express from 'express';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router =express.Router();

// Signup Router
router.post('/signup',async(req,res)=>{
  const {FullName,Email,Phone,Password}=req.body;

  try {
    const existingUser= await User.findOne({Email})
    if(existingUser){
      return res.status(400).json({success:false,message:'Email already exist'})
    }

    const hashPassword = await bcrypt.hash(Password,10);

    const newUser =new User({FullName,Email,Phone,Password:hashPassword})
    await newUser.save();

    res.status(201).json({success:true,message:'User registered successfully'})
  } catch (error) {
    console.error('Error:',err);
    res.status(500).json({success:false,message:'Server error'})
    
  }
});

export default router;
