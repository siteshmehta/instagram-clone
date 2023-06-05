import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';

import PostFeedSkeleton from "./PostFeedSkeleton";
import PostFeed from "./PostFeed";
import { useListOfPost } from "../../../service/Post.service";


const PostSection = () => {
  
  const { ref, inView } = useInView();  // inView ==> true | false (boolean)
  const { responseData, fetchNextPage, isFetching , status , hasNextPage } = useListOfPost();
  

    useEffect(() => {
      if(inView ) fetchNextPage();  //it is the main or required line to fetch infinite data. it trigger when we reach to the end of page & will trigger a react query function to fetch the next data where we left at the last time
    }, [inView]);

    
  return (
    <>

      {/* Show skeleton on first page reload */}
      {isFetching && <PostFeedSkeleton />}  


      {/* if successful response and there is data contain then render the component */}
      {status === "success"  &&
          responseData.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.data.map((post) => (
                <PostFeed key={post._id} data={post} />
              ))}
            </React.Fragment>
          ))
       }
      

      {/* Show skeleton only when there is more data to fetch */}
      {hasNextPage && <PostFeedSkeleton />} 



      
      <div ref={ref} className="text-center my-10">
        --
      </div>

    </>
  );
};

export default PostSection;
