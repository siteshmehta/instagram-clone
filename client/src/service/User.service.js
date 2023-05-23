import { useQuery } from "react-query";
import axiosClient from "./axiosClient.service";

export default function useListOfStory(){

    const { status , data : stories } = useQuery({
        queryKey : ['user','stories'],
        queryFn : async function () {
            const limit = Math.floor(Math.random() * 16) + 1;
            const response = await axiosClient.get(`/user/stories?limit=${limit}`);
            const finalResponse = response.data;
            let finalData = [];
            if (finalResponse?.status === true) {
                finalData = finalResponse?.data;
            }
            return finalData; 
        },
        refetchOnWindowFocus : false
    })    

    return { status , stories };
}