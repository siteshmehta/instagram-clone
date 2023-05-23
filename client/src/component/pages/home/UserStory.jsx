const UserStory = (props) => {
  const { name, profile_image } = props?.story;
  return (
    <>
      <div className="snap-start shrink-0 space-x-2 text-center mx-2 mb-5">
        <div className="w-20 h-20">
          <img
            className="rounded-full border-2 border-purple-400 object-cover w-full h-full"
            src={`${profile_image}?width=200&height=200`}
          />
        </div>
        <p className="">{name}</p>
      </div>
    </>
  );
};
export default UserStory;
