import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from 'react-intersection-observer';

import axiosClient from "../../../service/axiosClient.service";
import PostFeedSkeleton from "./PostFeedSkeleton";
import PostFeed from "./PostFeed";


const PostSection = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1); 

  const {
    data: responseData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['posts', 'list'],  //Key for the cache
    async () => {
      try {
        setPage(page + 1);
        const response = await axiosClient.get(`/post/list?_page=${page}`);
        return response?.data;
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    }, 
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextPage) {
          return lastPage.hasNextPage;
        }
        return undefined;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );


  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);



  return (
    <>
      {isFetching && <PostFeedSkeleton />}

      {responseData?.pages &&

        responseData.pages.map((page) => {
          return page.data.map((post) => {
            return <PostFeed key={post._id} data={post} />
          })
        })

      }

      {isFetching && <p className="text-center">Fetching..⏳⏳</p>}


      <div ref={ref} className="text-center">
        --
      </div>
    </>
  );
};

export default PostSection;
