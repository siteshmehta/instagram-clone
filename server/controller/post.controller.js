import PostModel from "../models/post.model.js";
import errorHandler from "./errorHandler.controller.js";
import commentModel from "../models/comment.model.js";
import { uploadFile } from "./s3.controller.js";
import {rimraf} from "rimraf";


export async function getAllPost(req,res,next){
     
    try{

      const posts = await PostModel.find().populate({
        path: 'uploadedBy',
        select: '_id name username'
      }).lean();
      
      posts.forEach(post => {
        post.img_url = `${process.env.IMAGE_URL}/${post.img_name}`
      });
      res.json({
        status : true ,
        data : posts
      });


    }catch(err){
      errorHandler(err,res);
    }
}


export async function createPost(req, res) {
  const { title, location } = req.body;
  
  try {
    const file = req.file;
    
    const result = await uploadFile(file);
    

    if (result.error) {
      res.status(500).json({
        status: false,
        message: "Unable to upload the post",
      });
      return;
    }

    const userId = req.currentUserInfo._id;

    if (!userId) {
      throw new Error("Invalid user ID");
    }

    const post = new PostModel({
      uploadedBy: userId,
      title,
      img_name: result?.awsImageName,
      location,
    });

    await post.save();

    res.send({
      data: post,
      status: true,
    });
  } catch (err) {
    errorHandler(err, res);
  }
}

export async function viewPost(req,res){
  try{

    const { id : post_id } = req.params;
    

    const post = await PostModel.findById(post_id).populate({
      path: 'uploadedBy',
      select: '_id name username'
    }).lean();

    const comment = await commentModel.findById(post_id).populate({
      path: 'uploadedBy',
      select: '_id name username'
    }).lean();

    
    
    if(!post){
      throw new Error("Post not found");
    }
    
    post.img_url = `${process.env.IMAGE_URL}/${img_name}`;
    
    res.send({
      status : true,
      data : post
    })

  }catch(err){
      errorHandler(err,res);
  }
}

export async function addComment(req,res){
  try{
    
    let { postId , text } = req.body;
    let { _id : commentedBy} = req?.currentUserInfo;

    const post = await PostModel.findById(postId);  //check if post exist of not
    if (!post) {
      throw new Error('Post not exist');
    }

    var comment = new commentModel({
      postId , 
      commentedBy ,
      text
    })

    await comment.save();

    res.send({
      status : true,
      data : comment
    })

  }catch(err){
    errorHandler(err,res);
  }
}

export async function getComment(req,res){
  
}