import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(dotenv.config());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.b377xtm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},(err) =>{
    if(err)
        console.log(err);
    else
        console.log("DB has been connected successfully");
});


app.listen(8080,(err)=>{
    if(err)
        console.log(err.message);
    else
        console.log("Server is listening at port 8080");;
})