const PostFeedSkeleton = () => {
  return (
    <>
      <main className="animate-pulse flex flex-col w-[25vw] h-[80vh] my-3 mx-auto p-2 border border-slate-200 ">
        <div className="flex items-center m-2">
          <section className="w-10 h-10 mr-3">
            <div className="rounded-full bg-slate-200 w-10 h-10"></div>
          </section>
          <span className="my-auto font-semibold">
            <div className="w-40 p-2 h-2 bg-slate-200"></div>
          </span>
        </div>

        <section className="w-full h-full overflow-hidden rounded-md animate-pulse">
          <div className="object-cover w-full h-full bg-slate-200"></div>
        </section>

        <div className="flex space-x-3 py-2 animate-pulse"></div>
      </main>
    </>
  );
};

export default PostFeedSkeleton;
