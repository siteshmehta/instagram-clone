import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    commentedBy : {type : mongoose.Types.ObjectId , ref : "Users"},
    text : {type : String , required : true},
    createdAt : {type: Date, default : new Date},
    postId  : {type : mongoose.Types.ObjectId , ref : "Posts"},
});

const commentModel = mongoose.model("Comments",commentSchema);
export default commentModel;