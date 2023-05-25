import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserComment from "./comment/UserComment";
import { useViewPost } from "../../../service/Post.service";

export default function ViewPost() {
  const navigator = useNavigate();
  const { id: postId } = useParams();
  const { status, data: post } = useViewPost(postId);

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
                            Array.from({length:10}).map((_,index)=>{
                              return <div key={index} className="h-10 animate-pulse bg-gray-300 rounded-lg m-2"> </div>
                            })
                          }
                            
                        </div>
                      </div>
                    ) : status === "error" ? (
                      "Unexpected error"
                    ) : (
                      <div className="flex min-h-80vh  justify-center">
                        <div className="w-fit min-w-[500px] min-h-full">
                          <img
                            className="object-contain h-full m-auto"
                            src={post?.img_url}
                          />
                        </div>
                        <div className=" bg-slate-100 relative w-[700px]">

                          
                          {/* <div className="flex flex-col"> */}

                                <div className="absolute top-0 min-h-[5%] bg-slate-100 w-full border-b-2 z-10">
                                    <div className="grid grid-cols-12 gap-0">
                                          <div className="col-span-1 min-h-10">
                                              <img src="https://cdn1.iconfinder.com/data/icons/colored-social-media-set-volume-1/512/instagram-256.png" className="objec-fit p-2" />
                                          </div>
                                          <div className="col-span-2 my-auto">
                                            Ajay
                                          </div>
                                    </div>
                                    {/* Profile section */}
                                </div>
                                <div className="absolute top-[5%] pb-[30%] h-full w-full overflow-y-scroll">
                                    {Array.from({ length: 30 }).map((_, index) => {
                                        return <UserComment key={index} id={index} />;
                                    })}
                                 </div> 
                                  

                                 <div className="absolute bottom-0 w-full min-h-[15%] flex flex-row border-t-2 bg-slate-100 z-10">
                                  <div className="grow">
                                    <textarea className="w-full border-0 bg-slate-100" placeholder="Add a comment.."></textarea>
                                  </div>
                                  <div className="p-2 m-auto">
                                    <button className="rounded border-2 bg-blue-500" type="button">
                                      Submit
                                    </button>
                                  </div>
                                </div> 

                          {/* </div> */}
                          
                        </div>
                      </div>
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