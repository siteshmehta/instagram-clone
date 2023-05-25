import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js"; 
import postRouter from "./routes/post.route.js"; 
import { config } from 'dotenv';

import mongoose from "mongoose";
import { inputValidator, sanitizeInputs } from "./middleware/inputValidator.js";
import { authenticateToken } from "./middleware/jwtAuthenticator.js";
import multer from "multer";
const upload = multer({
    dest: './uploads'
});
  

config();

const app = express();
const PORT = 8080;
app.use(cors()); 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


// middlewares
app.use("/",authenticateToken);
app.use("/",inputValidator);
app.use("/",sanitizeInputs);


app.get('/',(req,res)=>{
    res.json({
        status : `App is running at PORT NO. ${PORT} `
    })
});
app.use('/user', userRouter);
app.use('/post', postRouter);
  
 

mongoose.connect(process.env.DB_URI)
.then(() => app.listen(PORT, () => console.log(`Running on ${PORT}...`)))
.catch((error) => {
    console.log(`Unable to connect ${error}`);
});