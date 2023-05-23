import { useQuery } from "react-query";
import axiosClient from "./axiosClient.service";



export function useListOfPost(){
  const { status , data : posts } = useQuery({
    queryKey : ['post','list'],
    queryFn : async function () {
      return axiosClient.get(`/post/list`).then((response) => {
        const finalResponse = response.data; // AJAX body data comes under the data attr.
        let finalData = [];
        if (finalResponse?.status === true) {
          finalData = finalResponse?.data;
        }
        return finalData;
      });
    },
    staleTime : 1000 * 4,
    refetchOnWindowFocus : false
  });

  return { status , posts};
}

export function useViewPost( post_id ) {
  const { status, data } = useQuery({
      queryKey : ['post',post_id],
      queryFn : async function () {
        const response = await axiosClient.get(`/post/${post_id}`);
        const finalResponse = response.data;
        let finalData = [];
        if (finalResponse?.status === true) {
          finalData = finalResponse?.data;
          finalData['imgBase64'] = `data:image/png;base64,${finalData?.imgBase64}`;
        }
        return finalData;
      },
      refetchOnWindowFocus : false
  });
  return { status, data };
}