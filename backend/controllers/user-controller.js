import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req,res,next) => {
     let users;
     try {
        users = await User.find().populate("user");
     } catch (error) {
        console.log(error);
     }
     if(!users) {
        return res.status(404).json({message:"No user found"});
     }
     return res.status(200).json({users});
}

export const signup = async (req,res,next) => {

   const {name , email , password} = req.body;
   let userExist;
   try {
      userExist = await User.findOne({email});
   } catch (error) {
      console.log(error);
   }
   if(userExist) {
      return res.status(400).json({message:"User with email already exists"});
   }
   const hashedPassword = bcrypt.hashSync(password);
   const user = new User ({
      name,
      email,
      password:hashedPassword,
      blogs : [],
   })
   try {
      await user.save();
   } catch (error) {
      console.log(error);
   }
   return res.status(201).json({user});
}

export const login = async (req,res,next) => {

   const {email , password} = req.body;
   let userExist;
   try {
      userExist = await User.findOne({email});
   } catch (error) {
      console.log(error);
   }
   if(!userExist) {
      return res.status(404).json({message:"Invalid Credentials"});
   }
   const isPassword = bcrypt.compareSync(password,userExist.password);
   if(!isPassword) {
      return res.status(404).json({message:"Invalid Credentials"});
   }
   res.status(200).json({message:"Login successful",user:userExist});
}