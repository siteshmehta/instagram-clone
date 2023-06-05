import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor';
import { MdUpload } from "react-icons/md";
import axiosClient from '../../../service/axiosClient.service';


export default function AddPost() {

  const [uploadFileData, setUploadFileData] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadFileData(file);
  };


  const navigator = useNavigate();
  const editorRef = useRef(null);

  const formHandler = (event) => {
    event.preventDefault();
    const formFinalData = new FormData();
    formFinalData.append('title', postTitle);
    formFinalData.append('location', 'NOIDA');

    if (editorRef.current) {
      const canvas = editorRef.current.getImage();

      if (canvas) {
        const dataURL = canvas.toDataURL();

        const base64Data = dataURL.split(',')[1];

        // Convert base64 data to binary image data
        const imageData = Buffer.from(base64Data, 'base64');
        const imageBlob = new Blob([imageData], { type: 'image/jpg' });
        formFinalData.append('img', imageBlob, 'image.jpg');

      }
    }

    console.log(formFinalData);

    axiosClient.post(`/post/add`, formFinalData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      const finalResponse = response.data;  // AJAX body data comes under the data attr.      
      if (finalResponse?.status === true) {
        alert("Post uploaded");
      }
    }).catch((err) => {
      alert("Fail to upload");
    }).finally(() => {
      navigator("/");
    });
  };




  return (
    <>
      <Transition show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={() => {
          navigator(-1);
        }
        }>

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
                {/* Main content lies here hide overflow here */}
                <Dialog.Panel className=" p-2 w-full max-h-[100vh] max-w-min transform overflow-auto rounded-2xl bg-white text-left align-middle shadow-xl transition-all">

                  <div>
                    <div className='min-h-full h-full w-auto'>

                      {

                        uploadFileData == '' ?
                          <input type="file" onChange={handleFileUpload} accept=".jpg,.png,.jpeg" className='' /> :
                          <>
                            <form onSubmit={formHandler}>
                              <textarea type='text' placeholder='Enter the title' className='border-1 rounded-md w-full' rows="3"
                                onChange={(values) => setPostTitle(values.target.value)}
                              >

                              </textarea>
                              <AvatarEditor
                                ref={editorRef}
                                image={uploadFileData}
                                width={500}
                                height={550}
                                border={10}
                                disableHiDPIScaling={true}
                                disableBoundaryChecks={true}
                                borderRadius={10}
                                scale={1}
                                className='border-2 border-red-800 h-[70vh] overflow-auto'
                              />
                              <div className='flex justify-center my-3'>
                                <button type="submit" className='rounded-sm p-2 bg-blue-400'><MdUpload className='inline-block' /> Upload</button>
                              </div>
                            </form>
                          </>

                      }

                    </div>

                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

        </Dialog>
      </Transition>
    </>
  )
}