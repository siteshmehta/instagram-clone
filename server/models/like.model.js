import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    likedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Posts"
    },
    createdAt: { type: Date, default: new Date() },
});



const LikeModel = mongoose.model("Likes",likeSchema);
export default LikeModel;