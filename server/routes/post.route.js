import express from "express";
import { addComment, createPost, getAllPost, viewPost } from "../controller/post.controller.js";


const app = express();


app.get('/list',getAllPost);
app.post('/upload', createPost);
app.get('/:id',viewPost);
app.post('/comment',addComment);

export default app;