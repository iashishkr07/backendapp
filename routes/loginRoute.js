import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET;

//login router

router.post('/login',async(req,res)=>{
    const {Email, Password}= req.body;

    try {
        const user=await User.findOne({Email});
        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }
        const isMatch = await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            return res.status(401).json({success:false,message:'Invalid Password'})
        }
        const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({success:true,message:'Login successful',token,user:{FullName:user.FullName,
            Email:user.Email,Phone:user.Phone
        }});
    } catch (error) {
        console.error('Login Error:',error);
        res.status(500).json({success:false,message:'server error'})
    }
})

export default router;