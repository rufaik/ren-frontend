import React, {useState, useEffect, useContext, Fragment} from 'react'
import {UserContext} from '../context/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import VerifyButton from "@passbase/button/react";
import {API_URL} from '../utils/urls'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import ImageUploading from "react-images-uploading";



export const Verify = () => {

const [error, setError] = useState('')
const [open, setOpen] = useState(true)
const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
const [post1, setPost1] = useState({})


const updateCurrent = async (identityAccessKey) => {
 const data1 = {
      verifyKey: identityAccessKey
    }
      try{
        const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data1)
          })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
    

      } catch(err){
    console.log("Exception ", err)}

    }

const formatImageUrl = (url) => `${API_URL}${url}`

                  console.log("if", post1)


  const [image, setImages] = React.useState([]);
  const [image1, setImages1] = React.useState([]);
  const [showSave, setShowSave] = useState(true)
  console.log("image", image)
  console.log("image1", image1)

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("iiiiii", imageList, addUpdateIndex);
    setImages(imageList);
    console.log("imageList", imageList)
  };  

    const onChange1 = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("pppppp",imageList, addUpdateIndex);
    setImages1(imageList);
    console.log("imageList2", imageList)
  };

  const saveImage = async (event) => {
    event.preventDefault()
    console.log('handling', image)


  

    // const formData = new FormData()
    // formData.append('files.image', image[0].file)
    // formData.append('files.image1', image1[0].file)

    // formData.append('refId', simpleUser.id)
    // formData.append('ref', 'user')
    // formData.append('field', 'image')
    // formData.append('source', 'users-permissions')

    const formData = new FormData()
    formData.append('data', JSON.stringify({ status: "submitted", userID: simpleUser.id}))
    formData.append('files.image', image[0].file)
    formData.append('files.image1', image1[0].file)
    
  try{
        const response = await fetch(`${API_URL}/verifies`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          },          
          body: formData
        })


  
        const data = await response.json()
        // getUser()
        console.log("dataK1", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }



  return (
    <div className="Login">



      <Transition.Root show={open} as={Fragment}>
            <Dialog 
              as="div" 
              className="fixed z-10 inset-0 overflow-y-auto" 
              onClose={() => window.location.href = `/profile/${user.user.id}`}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
               <div 
              className={create === 'darkbg'
                    ? "darkbg text-white inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
                    : "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
                  }
              style={{"width": "44em", }}
            >
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center"> ID verification </div>
              <div 
                className={create === 'darkbg' ? "gryLine2 w-full mt-6 mb-10" : "gryLine2 w-full mt-6 mb-10"}
              ></div>
              <div className="flex justify-center">
              
               
                    <ImageUploading
                        multiple={false}
                        value={image}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper relative">
                          {console.log(imageList)}
                            <div
                              style={isDragging ? { color: "red" } : null}
                              className="imgBx2 mr-4 rounded-t-lg border border-black-100 cursor-pointer rounded-b-lg flex justify-center items-center"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                             
                                 <img className="w-100" src="../camsketch.png" />

                               
                              {simpleUser && simpleUser.image === null
                                ? <img className="absolute uploadSketch" src="../upload.png" /> 
                                : null
                              }
                              
                              {imageList.map((image, index) => (
                              <div key={index} className=" flex justify-center items-center imgBx2 rounded-t-lg rounded-b-lg absolute top-0 left-0">
                                <img src={image.data_url} className="rounded-t-lg rounded-b-lg w-full h-full object-cover" alt="" width="66%" />
                                
                              </div>
                            ))}

                            </div>
                      
                          </div>
                        )}
                    </ImageUploading>
                    <ImageUploading
                        multiple={false}
                        value={image1}
                        onChange={onChange1}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper relative">
                          {console.log(imageList)}
                            <div
                              style={isDragging ? { color: "red" } : null}
                              className="imgBx2 ml-4 overflow-hidden rounded-t-lg border border-black-100 cursor-pointer rounded-b-lg flex justify-center items-center"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                             
                                 <img className="w-100" src="../camsketch.png" />

                               
                              {simpleUser && simpleUser.image === null
                                ? <img className="absolute uploadSketch" src="../upload.png" /> 
                                : null
                              }
                              
                              {imageList.map((image1, index) => (
                              <div key={index} className=" flex justify-center items-center imgBx2 rounded-t-lg rounded-b-lg absolute top-0 left-0">
                                <img src={image1.data_url} className="rounded-t-lg rounded-b-lg w-full h-full object-cover" alt="" width="66%" />
                                
                              </div>
                            ))}

                            </div>
                        
                          </div>
                        )}
                    </ImageUploading>

{/*                <ImageUploading
                  multiple={false}
                  value={image1}
                  onChange={onChange1}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <div
                        style={isDragging ? { color: "red" } : null}
                        className={create === 'darkbg' ? "darkInput imgBx2 relative cursor-pointer flex justify-center items-center" : "imgBx2  relative cursor-pointer flex justify-center items-center"}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {imageList && imageList[0] ? null : <img className="w-100" src="../smcam.png" />}
                        {imageList && imageList[0] ? null : <img className="absolute uploadSketch" src="../smup.png" />}
                        {imageList.map((image1, index) => (
                        <div key={index} className=" absolute flex justify-center items-center">
                          <img src={image1.data_url} alt="" width="66%" />
                          
                        </div>
                      ))}

                      </div>
                      &nbsp;
                      
                    </div>
                  )}
              </ImageUploading>*/}
             
                  </div>
                  {showSave &&
                          <div className="flex mx-auto">
                            {image && image[0] && image1 && image1[0] && 
                              <button onClick={saveImage} className="authBtn text-white cursor-pointer mx-auto mt-4">
                                      Upload
                              </button>
                            }
                            </div>
                            }
                  </div>
                  
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

    





    </div>
  );
}