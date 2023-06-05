import PostModel from "../models/post.model.js";
import errorHandler from "./errorHandler.controller.js";
import commentModel from "../models/comment.model.js";
import { uploadFile } from "./s3.controller.js";
import LikeModel from "../models/like.model.js";


export async function getAllPost(req, res, next) {

  try {
    const { _id: myUserId } = req?.currentUserInfo;
    const { _page } = req.query;
    const _limit = 2;
    const _offset = (_page - 1) * _limit;

    const posts = await PostModel.
      find().
      limit(_limit).
      skip(_offset).
      populate({ path: 'uploadedBy', select: '_id name username' }).
      populate('totalComment').
      populate('totalLike').
      lean();


    const finalPost = await Promise.all(
      posts.map(async (post) => {
        const likeObj = await LikeModel.findOne({ postId: post._id, likedBy: myUserId });
        let isPostLiked = false;
        if (likeObj) {
          isPostLiked = true;
        }
        post.isPostLiked = isPostLiked;


        post['img_url'] = `${process.env.IMAGE_URL}/${post?.img_name}`;
        return post;
      })
    );



    res.json({
      status: true,
      data: finalPost,
      hasNextPage: finalPost.length !== 0,
      NextPage: Number(_page) + 1
    });
  } catch (err) {
    errorHandler(err, res);
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

export async function viewPost(req, res) {

  try {
    const { id: post_id } = req.params;
    const post = await PostModel.findOne({ _id: post_id }).lean();

    if (!post) {
      throw new Error("Post not found");
    }

    post.img_url = `${process.env.IMAGE_URL}/${post.img_name}`;

    res.send({
      status: true,
      data: post
    })

  } catch (err) {
    errorHandler(err, res);
  }
}

export async function addComment(req, res) {
  try {

    const { text } = req.body;
    const { id: postId } = req.params;
    const { _id: commentedBy } = req?.currentUserInfo;

    const post = await PostModel.findById(postId);  //check if post exist of not
    if (!post) {
      throw new Error('Post not exist');
    }

    var comment = new commentModel({
      postId,
      commentedBy,
      text
    })

    await comment.save();

    res.send({
      status: true,
      data: comment
    })

  } catch (err) {
    errorHandler(err, res);
  }
}

export async function getCommentByPostId(req, res) {
  const postId = req.params.id;

  try {
    const userObj = await commentModel.find({ postId }).populate({
      path: "commentedBy",
      select: "username name"
    });

    console.log(userObj)
    res.send({
      status: true,
      data: userObj
    })
  } catch (err) {
    errorHandler(err, res);
  }

}

export async function updatePostLike(req, res) {
  const { _id: likedBy } = req?.currentUserInfo;
  const { id: postId } = req.params;

  try {

    const like = await LikeModel.findOne({ likedBy, postId });  //check if user has already like or not
    let message;
    if (!like) {  //then insert into database
      const likeDoc = new LikeModel({
        likedBy,
        postId
      });
      await likeDoc.save();
      message = "Like added";
    } else {
      await like.deleteOne();
      message = "Like removed";
    }


    res.send({
      status: true,
      message
    })


  } catch (err) {
    errorHandler(err);
  }

}