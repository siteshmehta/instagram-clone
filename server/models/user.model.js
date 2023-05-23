import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true , unique: true , minLength : 6 },
  password: { type: String, required: true , minLength : 6 },
  email: { type: String, required: true },
  phone: { type: String, maxlength: 15 ,  minlength: 10, required : true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
  followers: [{ type: mongoose.Schema.Types.ObjectId }],
  followed: [{ type: mongoose.Schema.Types.ObjectId }],
});


const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
