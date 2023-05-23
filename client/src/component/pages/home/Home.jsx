import FriendSuggestionNav from "./FriendSuggestionNav";
import StoriesNav from "./StoriesNav";
import PostSection from "../post/PostSection";

const Home = () => {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-10">
        <StoriesNav />
        <PostSection />
      </div>
      <div className="col-span-2 ">
        <FriendSuggestionNav />
      </div>
    </div>
  );
};

export default Home;
