import express from "express";
import { createUser, getStories , login, validateUser } from "../controller/user.controller.js";

const user = express();

user.get('/stories',getStories);
 

user.post('/register',createUser);
user.post('/login',login);
user.get('/isAuth',validateUser);

export default user;