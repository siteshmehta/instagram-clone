import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    commentedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: new Date },
    postId: { type: mongoose.Types.ObjectId, ref: "Posts" },
});
  
  commentSchema.set('toJSON', { virtuals: true });
  commentSchema.set('toObject', { virtuals: true });
  

  commentSchema.virtual('commentedByDetails', {
    ref: 'Users',
    localField: 'commentedBy',
    foreignField: '_id',
    justOne: true, // Set this to true since it's a single reference
    select: 'name username email', // Select the desired fields from the 'Users' collection
  });
  
  const commentModel = mongoose.model("Comments", commentSchema);
  export default commentModel;
