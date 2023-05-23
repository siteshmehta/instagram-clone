import UserStory from "./UserStory";
import useListOfStory from "../../../service/User.service";

export default function StoriesNav() {
  const { status, stories } = useListOfStory();

  
  if (status == "error") {
    return <h1>No stories available</h1>; // Return null or a loading state if stories are not available yet
  }
  if (status == "loading") {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="scroll-pl-1 snap-x flex flex-nowrap justify-start overflow-x-scroll">
      {stories.map((story) => (
        <UserStory key={story?.id} story={story} />
      ))}
    </div>
  );
}
