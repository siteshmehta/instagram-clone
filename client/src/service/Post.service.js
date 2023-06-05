import { useInfiniteQuery, useQuery } from "react-query";
import axiosClient from "./axiosClient.service";




export function useListOfPost() {

  const { data: responseData, fetchNextPage, isFetching, isIdle, status, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'list'],
    queryFn: async ({ pageParam = 1 }) => {
      console.log({ params: pageParam });
      try {
        const response = await axiosClient.get(`/post/list?_page=${pageParam}`);
        return response?.data;
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNextPage === true ? lastPage.NextPage : undefined; //if there is next page then return the next page number e.g. if current query staring has page value as 1 then return 2.
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }
  );

  return { responseData, fetchNextPage, isFetching, isIdle, status, hasNextPage }; // hasNextPage is required to check if there is more page to fetch or not .. it helps us to find the last data of the API.

}

export function useViewPost(post_id) {
  const { status, data } = useQuery({
    queryKey: ['post', post_id],
    queryFn: async function () {
      const response = await axiosClient.get(`/post/${post_id}`);
      const finalResponse = response.data;

      if (finalResponse?.status === true) {
        return finalResponse?.data;
      }
    },
    refetchOnWindowFocus: false
  });
  return { status, data };
}


export function useViewPostComment(post_id) {

  const { status: commentStatus, data: comments } = useQuery({
    queryKey: ['post', post_id, 'comment'],
    queryFn: async function () {
      const response = await axiosClient.get(`/post/${post_id}/comment`);
      const finalResponse = response.data;

      if (finalResponse?.status === true) {
        return finalResponse?.data;
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!post_id, // The query will not execute until the userId exists
  })

  return { commentStatus, comments };
}


export async function addComment(commentDetails) {

  const { postId, comment } = commentDetails;
  const formFinalData = {
    text: comment
  };

  return axiosClient.post(`/post/${postId}/comment`, formFinalData).then(response => {
    const finalResponse = response.data;  // AJAX body data comes under the data attr.      
    // console.log({finalResponse})
    return finalResponse;
  }).catch((err) => {
    alert("Fail to add comment");
  });

}

export async function updatePostLike(post_id) {
  return await axiosClient.put(`/post/${post_id}/like`).then((response) => response.data).catch(err => {
    alert("Fail to like the post");
  })
}