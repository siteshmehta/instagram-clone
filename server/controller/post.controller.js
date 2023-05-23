import mongoose from "mongoose";
import PostModel from "../models/post.model.js";
import he from "he"; 
import errorHandler from "./errorHandler.controller.js";
import commentModel from "../models/comment.model.js";

export async function getAllPost(req,res,next){
     
    try{

      const posts = await PostModel.find().populate({
        path: 'uploadedBy',
        select: '_id name username'
      }).lean();
      
      posts.forEach(post => {
        post.imgBase64 = he.decode(post.imgBase64);
      });
      res.json({
        status : true ,
        data : posts
      });


    }catch(err){
      errorHandler(err,res);
    }
}


export async function createPost(req,res){
    
  const { title , imgBase64 , location } = req.body;
  try{
    const userId = req.currentUserInfo._id;
    
    let post = new PostModel({
      uploadedBy : userId,
      title ,
      imgBase64,
      location
    });
    
    if(!userId){
      throw new Error("Invalid user ID");
    }

    await post.save();

    res.send({
      data : post,
      status : true
    })


  }catch(err){
    errorHandler(err,res);
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
    
    post.imgBase64 = he.decode(post?.imgBase64);
    
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