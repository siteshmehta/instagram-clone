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
                <Dialog.Panel className="p-2 w-full  max-h-[90vh] max-w-min transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row h-[100%]">
                    {status === "loading" ? (
                      <div className="grid grid-cols-12 min-w-[70vw]">
                        <div className="col-span-7 mb-3 animate-pulse bg-gray-300 rounded-lg">
                           
                        </div>
                        <div className="col-span-5 w-full bg-slate-100 overflow-y-scroll h-[90vh]">
                          {
                            Array.from({length:10}).map((value)=>{
                              return <div key={value} className="h-10 animate-pulse bg-gray-300 rounded-lg m-2"> </div>
                            })
                          }
                            
                        </div>
                      </div>
                    ) : status === "error" ? (
                      "Unexpected error"
                    ) : (
                      <div className="grid grid-cols-12 min-w-[70vw]">
                        <div className="col-span-7">
                          <img
                            className="object-contain h-full"
                            src={post?.imgBase64}
                          />
                        </div>
                        <div className="col-span-5 w-full bg-slate-100 overflow-y-scroll h-[90vh]">
                          {Array.from({ length: 20 }).map((value, index) => {
                            return <UserComment key={index} />;
                          })}
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