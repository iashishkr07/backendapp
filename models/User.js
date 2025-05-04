import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  FullName:{type:String,required:true},
  Email:{type:String,required:true,unique:true},
  Phone:{type:String,required:true},
  Password:{type:String,required:true},
  isVerified:{type:Boolean,default:false}
});

const User =mongoose.model('User',userSchema);
export default User;