import express from "express";
import { createUser,  getStories , login, validateUser } from "../controller/user.controller.js";
import multer from "multer";
const upload = multer({
  dest : "./uploads"
})
const user = express();

user.get('/stories',getStories);
 

user.post('/register',createUser);
user.post('/login',login);
user.get('/isAuth',validateUser);
// user.post('/fileUpload',upload.single('img'),fileUpload);

export default user;