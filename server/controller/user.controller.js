import UserModel from "../models/user.model.js"; 
import AWS from "aws-sdk";
import bcrypt from 'bcrypt';
import { generateToken } from "./autenticator.controller.js";
import { uploadFile } from "./s3.controller.js";
let saltRounds = 8;
import fs from "fs/promises";



export async function getStories(req,res,next){
    const stories = [
        {
           "id":20,
           "name":"Katie",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?nature,travel",
              "https://source.unsplash.com/random/200x900/?people",
              "https://source.unsplash.com/random/200x900/?people"
           ]
        },
        {
           "id":21,
           "name":"Avery",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?travel,food",
              "https://source.unsplash.com/random/200x900/?nature"
           ]
        },
        {
           "id":22,
           "name":"Liam",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?city"
           ]
        },
        {
           "id":23,
           "name":"Mila",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?people,travel"
           ]
        },
        {
           "id":24,
           "name":"Noah",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?nature,travel",
              "https://source.unsplash.com/random/200x900/?city"
           ]
        },
        {
           "id":25,
           "name":"Aria",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?nature"
           ]
        },
        {
           "id":26,
           "name":"Oliver",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?travel",
              "https://source.unsplash.com/random/200x900/?nature,food"
           ]
        },
        {
           "id":27,
           "name":"Charlotte",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?people,travel",
              "https://source.unsplash.com/random/200x900/?nature"
           ]
        },
        {
           "id":28,
           "name":"Ethan",
           "profile_image":"https://source.unsplash.com/random/200x200/?face",
           "stories":[
              "https://source.unsplash.com/random/200x900/?nature,food",
              "https://source.unsplash.com/random/200x900/?people"
           ]
        },
        {
         "id": 41,
         "name": "Priya",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?people,travel,fun",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 42,
         "name": "Amit",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?nature,landscape",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 43,
         "name": "Riya",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?people,travel,fun",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 44,
         "name": "Saurav",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?nature,landscape",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 45,
         "name": "Anu",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?people,travel,fun",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 46,
         "name": "Kunal",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?nature,landscape",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 47,
         "name": "Meera",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?people,travel,fun",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
       {
         "id": 48,
         "name": "Sandeep",
         "profile_image": "https://source.unsplash.com/random/200x200/?face",
         "stories": [
           "https://source.unsplash.com/random/200x900/?nature,landscape",
           "https://source.unsplash.com/random/200x900/?travel"
         ]
       },
    ];

    try{
        let filtered_data = Number(req?.query?.limit) <=1 ? stories : stories.slice(0,req?.query?.limit);  
        
        res.send({
          data : filtered_data,
          status : true
        })
    }catch(error){
        res.json({
            status : false,
            message : "Unexpected error"
        })
    }
    
}


export async function createUser(req, res) {
  console.log(req.body);
   try {
     const { name, username,  email, phone } = req.body;
     let password = req.body.password;
    
    await bcrypt.hash(password, saltRounds).then(function(hash) {
      password = hash;
    });

     const user = new UserModel({
       name,
       username,
       password,
       email,
       phone,
     });
      
     await user.save();
     
     delete user['password'];
     res.status(201).json({
       status: true,
       message: 'Register successfully',
       data: user
     });

   } catch (error) {
    console.log(error.message);
     res.status(500).json({
       status: false,
       message: error.message,
     });
   }
}

export async function login(req, res ){

  const { username , password : plaintextPassword  } = req.body;
  
  try{

    const userObj = await UserModel.findOne({username});
    const hasPassword = userObj?.password;

    let finalStatus = await bcrypt.compare(plaintextPassword, hasPassword).then(function(result) {
      return result;
    });

    if(finalStatus === true){
      
      const userData = {
        _id : userObj?._id,
        username : userObj?.username,
      };

      userData['token'] = generateToken(userData);

      res.send({
        status : true,
         message : "Logged in",
         data : userData
      })
    }else{
      res.status(401).json({
        status : false,
        message : "Incorrect password."
      });
    }


  }catch(mongoErr){
      res.status(500).json({
        status : false,
        message : "Invalid username or password."
      })
  }

}


export async function validateUser(req,res){
  try{
    const currentUserInfo = req.currentUserInfo;

    res.send({
      status : true,
      data : currentUserInfo
    })
    delete currentUserInfo['exp'];  delete currentUserInfo['iat'];
  }catch(err){
      res.send({
        status : false,
        message : "Invalid user"
      })
  }
}
