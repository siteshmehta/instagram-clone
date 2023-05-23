import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    title : {type : String , required : true},
    imgBase64 : {type : String , required : true},
    createdAt : { type: Date, default: new Date() },
    location : String,
    uploadedBy : {type : mongoose.Schema.Types.ObjectId , ref: 'Users'},
});


const Post = mongoose.model("Posts",PostSchema);
export default Post;
