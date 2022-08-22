import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";


export const getAllBlogs = async (req,res,next) => {
     let blogs;
     try {
        blogs = await Blog.find().populate("user");
     } catch (error) {
        console.log(error);
     }
     if(!blogs) {
        return res.status(404).json({message:"No blog found"});
     }
     return res.status(200).json({blogs});
}

export const addBlog = async (req,res,next) => {
    const {title , description , img , user} = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser) {
        return res.status(400).json({message:"Please login first"});
    }
    const blog = new Blog({
        title,
        description,
        img,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error});
    }
    return res.status(201).json({blog});
}

export const updateBlog = async (req,res,next) => {
    const blogId = req.params.id;
    const {title , description ,img} = req.body;
    let blog;
    const updatedBlog = {
        title,
        description,
        img
    }
    try {
      blog =   await Blog.findByIdAndUpdate(blogId,updatedBlog);
    } catch (error) {
        console.log(error);
    }
    if(!blog) {
        return res.status(404).json({message:"Blog not found"});
    }
    return res.status(200).json({blog});
}

export const getById = async (req,res,next) => {

    const blogId = req.params.id;
    let blog;
    try {
       blog = await Blog.findById(blogId);
    } catch (error) {
       console.log(error);
    }
    if(!blog) {
       return res.status(404).json({message:"No blog found"});
    }
    return res.status(200).json({blog});
}

export const deleteBlog = async (req,res,next) => {

    const blogId = req.params.id;
    let blog;
    try {
       blog = await Blog.findByIdAndRemove(blogId).populate("user");
       await blog.user.blogs.pull(blog);
       await blog.user.save();
    } catch (error) {
       console.log(error);
    }
    if(!blog) {
       return res.status(404).json({message:"No blog found"});
    }
    return res.status(200).json({message:"Blog deleted succesfully"});
}

export const getByUserId = async (req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        console.log(error);
        return res.status(404).json({message:error});
    }
    if(!userBlogs) {
        return res.status(404).json({message:"No blogs found"});
    }
    return res.status(200).json({user:userBlogs});
}