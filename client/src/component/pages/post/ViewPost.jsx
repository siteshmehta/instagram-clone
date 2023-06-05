import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserComment from "./comment/UserComment";
import { addComment, useViewPost, useViewPostComment } from "../../../service/Post.service";
import { useQueryClient, useMutation } from "react-query";

export default function ViewPost() {

  const navigator = useNavigate();
  const queryClient = useQueryClient();


  const [comment, setComment] = useState("");


  const { id: postId } = useParams();
  const { status, data: post } = useViewPost(postId);
  const { commentStatus, comments } = useViewPostComment(postId);



  const { mutate, status: addCommentStatus } = useMutation({
    mutationFn: addComment, //Here we define the AJAX function which will update or delete the data in the database. It does not affect the data of current component.
    onSuccess: (data, variables) => {  //variables is the value which we have passed in the parameter of the another function. eg. in hook defination addComment( commentDetails ) 
      queryClient.invalidateQueries(['post', postId, 'comment'], { exact: true }); //it will refetch the data after the sucessful response (just like a re-call the AJAX, but it will update the data only on the specific cache or key)
    }
  });



  const submitComment = function () {

    const commentDetails = {
      comment,
      postId
    };
    mutate(commentDetails)
  }


  return (
    <>
      <Transition show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => {
            navigator(-1);
          }}
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-300 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Main content lies here */}
                <Dialog.Panel className="w-full  max-h-[90vh] max-w-min transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="">
                    {status === "loading" ? (
                      <div className="grid grid-cols-12 min-w-[70vw]">
                        <div className="col-span-7 mb-3 animate-pulse bg-gray-300 rounded-lg">

                        </div>
                        <div className="col-span-5 w-full bg-slate-100 overflow-y-scroll h-[90vh]">
                          {
                            Array.from({ length: 10 }).map((_, index) => {
                              return <div key={index} className="h-10 animate-pulse bg-gray-300 rounded-lg m-2"> </div>
                            })
                          }

                        </div>
                      </div>
                    ) : status === "error" ? (
                      "Unexpected error"
                    ) : (
                      <>

                        <div className="flex justify-center h-[90vh]">
                          <div className="w-fit min-w-[500px] my-auto">
                            <img
                              className="object-contain m-auto"
                              src={post?.img_url}
                            />
                          </div>

                          <div className=" bg-slate-100 min-w-[500px]">

                            <div className="fixed top-0 h-[50px] bg-slate-100 border-b-2 z-10 " style={{ width: "-webkit-fill-available" }}>
                              <div className="grid grid-cols-11 gap-0">
                                <div className="h-[40px] w-[50px] m-0">
                                  <img src="https://cdn1.iconfinder.com/data/icons/colored-social-media-set-volume-1/512/instagram-256.png" className="objec-contain p-2" />
                                </div>
                                <div className="ml-3 col-span-10 my-auto">
                                  {post?.uploadedBy?.name}
                                </div>
                              </div>
                              {/* Profile section */}
                            </div>

                            <div className="mt-[50px] pb-[50%] h-full w-full overflow-y-scroll">
                              {
                                (commentStatus === "success" && comments.length > 0) && comments.map((commentData) => {
                                  return <UserComment key={commentData?._id} comment={commentData} />
                                })
                              }
                              {
                                ((commentStatus == "success" && addCommentStatus == "loading") && "Updating....")
                              }
                            </div>

                            <div className="fixed bottom-0 flex flex-row border-t-2 bg-slate-100 z-10" style={{ width: "-webkit-fill-available" }}>
                              {/* <form ref={commentFormElem}> */}
                              <div className="grow">
                                <textarea className="w-full border-0 bg-slate-100" placeholder="Add a comment.." value={comment}
                                  onChange={(values) => {
                                    setComment(values.target.value)
                                  }}
                                ></textarea>
                              </div>
                              <div className="p-2 m-auto">
                                <p className="text-sky-700 font-semibold cursor-pointer" onClick={submitComment}>
                                  Post
                                </p>
                              </div>
                              {/* </form> */}
                            </div>


                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}