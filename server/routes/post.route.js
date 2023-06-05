import express from "express";
import { addComment, createPost, getAllPost, getCommentByPostId, updatePostLike, viewPost } from "../controller/post.controller.js";
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


//POST SECTION
app.get('/list',getAllPost);
app.post('/add', upload.single("img") , createPost);  
app.get('/:id',viewPost);


//COMMENT SECTION
app.get('/:id/comment',getCommentByPostId);
app.post('/:id/comment',addComment);


//LIKE SECTION
app.put('/:id/like',updatePostLike);

export default app; 