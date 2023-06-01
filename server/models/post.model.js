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
  

  //find the list of comment
  PostSchema.virtual('commentArr', {
    ref: 'Comments',
    localField: '_id',
    foreignField: 'postId',
  });


  //find who commented on the post[user detail]
  PostSchema.pre('findOne', function (next) {
    this.populate({
      path: 'commentArr',
      populate: {
        path: 'commentedBy',
        model: 'Users',
        select: 'name username',
      },
    });
    next();
  });
  


  const Post = mongoose.model("Posts", PostSchema);
  export default Post;