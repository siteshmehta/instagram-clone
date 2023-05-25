import express from "express";
import { addComment, createPost, getAllPost, viewPost } from "../controller/post.controller.js";
import multer from "multer";
const upload = multer({
  dest : "./uploads"
})

const app = express();


app.get('/list',getAllPost);
app.post('/upload', upload.single('img') , createPost);
app.get('/:id',viewPost);
app.post('/comment',addComment);


export default app;