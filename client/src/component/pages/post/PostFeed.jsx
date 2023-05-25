import { FaRegComment, FaShareAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PostFeed = (props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  let {
    _id: post_id,
    uploadedBy,
    title,
    img_url,
    like_count = 0
  } = props["data"];

  return (
    <>
      <div className="flex flex-col lg:w-[25vw] sm:w-[40vw] lg:h-[80vh]  my-3 mx-auto p-3 border-y-2  rounded-md shadow-md ">
        <div className="flex items-center m-2">
          <div className="w-10 mr-3">
            <img
              src="https://cdn1.iconfinder.com/data/icons/colored-social-media-set-volume-1/512/instagram-256.png"
              alt="user profile"
            />
          </div>
          <span className="my-auto font-semibold">{uploadedBy?.name}</span>
          <span className="ml-auto">
            <BsThreeDotsVertical />
          </span>
        </div>

        <div className="w-full lg:h-full overflow-hidden rounded-md">
          <img
            src={`${img_url}`}
            className="object-contain h-full"
            onDoubleClick={() => {
              setLiked(!liked);
            }}
          />
        </div>

        <div className="flex space-x-3 py-2">
          {liked === true ? (
            <AiFillHeart
              className="text-xl text-red-500 hover:cursor-pointer"
              onClick={() => {
                setLiked(!liked);
              }}
            />
          ) : (
            <AiOutlineHeart
              className="text-xl text-black hover:cursor-pointer"
              onClick={() => {
                setLiked(!liked);
              }}
            />
          )}
          <FaRegComment
            className="text-xl text-black hover:cursor-pointer"
            onClick={() => {
              navigate(`/p/${post_id}`);
            }}
          />
          <FaShareAlt className="text-xl text-black hover:cursor-pointer" />
        </div>

        <span className="font-semibold text-sm">
          {like_count} {like_count > 1 ? "Likes" : "Like"}
        </span>

        <div className="flex text-sm">
          <span className="font-semibold">{uploadedBy?.name}</span>
          <span className="ml-1">{title}</span>
        </div>

        <span className="font-thin text-gray-400 text-sm">
          View all comments
        </span>
        <span className="text-sm">Add a comment..</span>
      </div>
    </>
  );
};

export default PostFeed;
