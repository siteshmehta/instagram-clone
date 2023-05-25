import express from "express";
import { addComment, createPost, getAllPost, viewPost } from "../controller/post.controller.js";
import multer from "multer";



const storage = process.env.ENVIROMENT == 'production' ? 
multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  }
}) : 
multer.memoryStorage();


const upload = multer({
  storage: storage
})

const app = express();


app.get('/list',getAllPost);
app.get('/:id',viewPost);
app.post('/comment',addComment);
app.post('/upload', upload.single("img") , createPost);


export default app;