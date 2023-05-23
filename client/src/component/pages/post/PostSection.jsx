import { useListOfPost } from "../../../service/Post.service";
import PostFeed from "./PostFeed";
import PostFeedSkeleton from "./PostFeedSkeleton";

const PostSection = () => {

  const { status , posts } = useListOfPost();

  return (
    <>
      {status == "loading" ? (
        <PostFeedSkeleton />
      ) : status == "error" ? (
        <h1>😓 No data found</h1>
      ) : (
        posts.map((post) => {
          return <PostFeed key={post?._id} data={post} />;
        })
      )}
    </>
  );
};

export default PostSection;