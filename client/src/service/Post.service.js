import { useQuery } from "react-query";
import axiosClient from "./axiosClient.service";
import { useNavigate } from "react-router-dom";



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
        
        if (finalResponse?.status === true) {
          return finalResponse?.data;
        }
      },
      refetchOnWindowFocus : false
  });
  return { status, data };
}

export function addComment( commentDetails ){
 
  const { postId , comment } = commentDetails;
  const formFinalData = {
    postId ,
    text : comment
  };

  axiosClient.post(`/post/comment`, formFinalData).then(response=>{
    const finalResponse = response.data;  // AJAX body data comes under the data attr.      
    if(finalResponse?.status === true){
      //post added successfully
    }
  }).catch((err)=>{
    alert("Fail to add comment");
  }).finally(()=>{
    
  });
  
}