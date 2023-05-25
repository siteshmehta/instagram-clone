import express from "express";
import { addComment, createPost, getAllPost, viewPost } from "../controller/post.controller.js";
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
})

const app = express();


app.get('/list',getAllPost);
app.get('/:id',viewPost);
app.post('/comment',addComment);
app.post('/upload', upload.single("img") , createPost);


export default app;