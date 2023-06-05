import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img_name: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    location: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  });
  
  PostSchema.set('toJSON', { virtuals: true });
  PostSchema.set('toObject', { virtuals: true });
  
  //find the total number of comment on the post
  PostSchema.virtual('totalComment', {
    ref: 'Comments',
    localField: '_id',
    foreignField: 'postId',
    count: true,
  });


  //find the total number of like on the post
  PostSchema.virtual('totalLike', {
    ref: 'Likes',
    localField: '_id',
    foreignField: 'postId',
    count: true,
  });


  const Post = mongoose.model("Posts", PostSchema);
  export default Post;