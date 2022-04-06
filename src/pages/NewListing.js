import React, {useState, useEffect, useContext, Fragment} from 'react'
import ReactMarkdown from "react-markdown";
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {API_URL} from '../utils/urls'
import {CartContext} from '../context/CartContext'
import {Calc} from './Calc'
import ReactPlayer from 'react-player'
import ImageUploading from "react-images-uploading";
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link} from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}






const formatImageUrl = (url) => `${API_URL}${url}`

export default () =>{

	const [userTypes, setUserTypes] = useState([])
	const [change1, setChage1] = useState('Creative')
	const [change2, setChage2] = useState('')
	const [name, setName] = useState(null)
	const [nameError, setNameError] = useState(false)
	const [descError, setDescError] = useState(false)
	const [featError, setFeatError] = useState(false)
	const [catError, setCatError] = useState(false)
	const [locError, setLocError] = useState(false)
	const [rentError, seRentError] = useState(false)
	const [imgError, setImgError] = useState(false)
	const [coinError, setCoinError] = useState(false)
	const [desc, setDescription] = useState(null)
	const [features, setFeatures] = useState([])
	const [postcode, setPostcode] = useState(null)
	const [rental, setRent] = useState(null)
	const [error, setError] = useState('')
	const [file1, setFile1] = useState(null)
	const [file2, setFile2] = useState(null)
	const [file3, setFile3] = useState(null)
	const [file4, setFile4] = useState(null)
	const [image, setImages] = React.useState([]);
	const [images1, setImages1] = React.useState([]);
	const [images2, setImages2] = React.useState([]);
	const [images3, setImages3] = React.useState([]);
	const [itemValue, setItemValue] = useState('');
	const [rentalValue, setRentalValue] = useState('');
	const [calculated, setCalculated] = useState(false);
	const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
	const [open, setOpen] = useState(true)
	const [open1, setOpen1] = useState(true)
	const [booked, setBooked] = useState(false)
	const [categories, setCategories] = useState(null)
	const [dropdown, setDrop] = useState('Select from dropdown')
	const [feat1, setFeat1] = useState('')
	const [feat2, setFeat2] = useState('')
	const [feat3, setFeat3] = useState('')
	


	// console.log("user", booked)
	// console.log("simpleUser", open1)



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
    console.log("imageList", imageList)
  };	

  const onChange2 = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages2(imageList);
    console.log("imageList", imageList)
  };	

  const onChange3 = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages3(imageList);
    console.log("imageList", imageList)
  };	


	// useEffect(() => {
	//     const getUserTypes = async () => {
	//       const response = await fetch(`${API_URL}/identity-cards`)
	//       const data = await response.json()
	//       // console.log("data", data)
	//       setUserTypes(data)
	//       setChage2(data[0].user_stories[0].id)
 //    }

 //    getUserTypes()
 //    console.log("userTypes", userTypes)


 //  }, [])



	useEffect(() => {
	    getCategories()

  }, [])


	const getCategories = async () => {
		console.log("yooo")
    	try{
	    	const response = await fetch(`${API_URL}/new-listing-pages`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          // 'Authorization': `Bearer ${user.jwt}`
	          }
	        })
	        const data = await response.json()
	      console.log("categories", data)
	      setCategories(data[0].categories.dropdown)

    	} catch(err){
		console.log("Exception ", err)}
	

    }


    const handleSubmit = (event) => {
    	event.preventDefault()
    	// let updatedItems = features;
    	if(name === null || name === '') {
    		setNameError(true)
    	}
    	if(desc === null || desc === '') {
    		setDescError(true)
    	}
    	if(feat1 === null || feat1 === '') {
    		setFeatError(true)
    	}
    	if(postcode === null || postcode === '') {
    		setLocError(true)
    	}
    	if(rental === null || rental === '') {
    		seRentError(true)
    	}
    	if(dropdown === 'Select from dropdown') {
    		setCatError(true)
    	}
    	if(image.length === 0) {
    		setImgError(true)
    	}
    	if(images1.length === 0) {
    		setImgError(true)
    	}
    	if(images2.length === 0) {
    		setImgError(true)
    	}
    	if(images3.length === 0) {
    		setImgError(true)
    	}
    	if(itemValue === 0 || rentalValue === 0 || itemValue === '' || rentalValue === '' ) {
    		setCoinError(true)
    	}
    	if(nameError === false && descError === false && featError === false && locError === false && rentError === false && catError === false && coinError === false) {
    		handleSubmit1()
    	}
    	
    	// handleSubmit1()
    	// setFeatures(updatedItems);
     //  	console.log("updatedItems", updatedItems)
      	// handleSubmit1()
    // 	  post3.map((booking, i) => {
    // if (booking.status === "Confirmed" && `${booking.renter.id}` === id) {
    //   let updatedItems = bookingList;
    //   updatedItems.push(booking.id);
    //   setBookingList(updatedItems);
    //   console.log("updatedItems", updatedItems)
  
    }

    console.log("NAME", name)

const handleSubmit1 = async () => {
    const coins = Math.round(rentalValue * 5)
    console.log('handling1', image)
    console.log('handling2', images1)

    if(!user){
      setError('Please log in first')
      return
    }



    const formData = new FormData()
    formData.append('data', JSON.stringify({name, description: desc, feature1: feat1, feature2: feat2, feature3: feat3, borough:postcode, category:dropdown,  rental, coins, userID: simpleUser.id}))
    formData.append('files.image', image[0].file)
    formData.append('files.image1', images1[0].file)
    formData.append('files.image2', images2[0].file)
    formData.append('files.image3', images3[0].file)

  try{
        const response = await fetch(`${API_URL}/listings`, {
          method: 'POST',
          // headers: {
          //   'Authorization': `Bearer ${user.jwt}`
          // },          
          body: formData
        })
  
        const data = await response.json()
  
        console.log("dataK1", data) 
        setBooked(true)
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }

	return(
		<div>

		{ simpleUser && simpleUser.stripeStatus  !== "Completed"
		  ?
			<Transition.Root show={open} as={Fragment}>
			      <Dialog 
			        as="div" 
			        className="fixed z-10 inset-0 overflow-y-auto" 
			        onClose={()=> {
			          setOpen(false)
			        }}>
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
			            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "17em"}}>
			              <div style={{"width":"620px"}} className="mx-auto">
			              { simpleUser.stripeStatus === "NotStarted"  && 
				              <div className="h3Bold mt-12 text-center">
				              	Please set up your payment information to convert your coins into cash!
				              </div>
				          }
			              { simpleUser.stripeStatus === "Incomplete"  && 
				              <div className="h3Bold mt-12 text-center">
				              	You have not completed your payment setup
				              </div>
				          }
			              <div className="flex flex-col justify-center items-center pt-">
			          
			                <Link to={`/profile/${user.user.id}`} className="sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto">
			                Setup payments
			                </Link>
			               {/* <div 
			                  className="orangeCol mb-8 text-white block mt-4 text-center orangeBtm pb-0.5"
			                >
			                 I made a mistake
			                </div>*/}
			              </div>
			              </div>
			            </div>
			          </Transition.Child>
			        </div>
			      </Dialog>
			    </Transition.Root>


		  :

			<div className="sectWidth mx-auto">
				<h2 className="mt-12">Add new listing</h2>
				<div className="genLight mt-6">All your items will be insured for <b> up to £20,000 </b> so you and lend with confidence.</div>

				<h2 className="mt-20">Your item listing details</h2>
				<div>
					<div className="flex flex-row">
					<div className="flex flex-col w-1/2">

					<div className="space-y-6 sm:space-y-5">


			            <div className="flex flex row">
		              		<div className ='flex flex-col'>
					              <div className="genBold pt-4 mr-6 text-right w-40">Name</div>
					              </div>
		              		<div className="flex flex-row">
		              			<div className ='flex flex-col'>    
					                <input
					                  placeholder="Max 40 characters"
					                  type="text"
					                  name="item-title"
					                  id="item-title"
					                  className="uniqueBox mt-4 pl-4"
					                  onClick={() => {setNameError(false)}}
					                  onChange={(event) => {
					                    setError('')
					                    setName(event.target.value)
					                  }}

					                />
					                {nameError &&
					                	<div className="mt-3 genBold text-red-600"> Please add the name of your item </div> 
					                }
					            </div>
				            </div>
			              </div>
			           

              <div className="flex flex row">
		              		<div className ='flex flex-col'>
					              <div className="genBold pt-4 mr-6 text-right w-40">Featured Image</div>
					              </div>
		              		<div className="flex flex-row">
{/*		                <input
		                  // placeholder="Max 40 characters"
		                  // type="text"
		                  // name="item-title"
		                  // id="item-title"
		                  className="uniqueBoxImg mt-4 pl-4"
		                  type="file"
			              placeholder="Add a File"
			              onChange={(event) => {
				              setError('')
				              setFile(event.target.files[0])
				              console.log("pic",event.target.files[0])}}

		                />

*/}		                <ImageUploading
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
					          <div className="upload__image-wrapper">
					            <div
					              style={isDragging ? { color: "red" } : null}
					              className="uniqueBoxImg mt-4 relative cursor-pointer flex justify-center items-center"
					              onClick={onImageUpload}
					              {...dragProps}
					            >
					              {imageList && imageList[0] ? null : <img className="w-100" src="../camsketch.png" />}
					              {imageList && imageList[0] ? null : <img className="absolute uploadSketch" src="../upload.png" />}
					              {imageList.map((image, index) => (
					              <div key={index} className=" absolute flex justify-center items-center">
					                <img src={image.data_url} alt="" width="66%" />
					                
					              </div>
					            ))}

					            </div>
					            &nbsp;
					            
					          </div>
					        )}
					    </ImageUploading>
	            </div>
              </div>

                     
{/*		                <input
		                  // placeholder="Max 40 characters"
		                  // type="text"
		                  // name="item-title"
		                  // id="item-title"
		                  className="uniqueBoxImg mt-4 pl-4"
		                  type="file"
			              placeholder="Add a File"
			              onChange={(event) => {
				              setError('')
				              setFile(event.target.files[0])
				              console.log("pic",event.target.files[0])}}

		                />


*/}		                
				<div className="flex flex row">
					<div className="pt-4 mr-6 text-right w-40"></div>
              		<div className="flex flex-col">
              		<div className="flex flex-row">
              			<ImageUploading
					        multiple={false}
					        value={images1}
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
					              className="uniqueBoxSm mt-4 relative cursor-pointer flex justify-center items-center"
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
					    </ImageUploading>
	         
          
{/*		                <input
		                  // placeholder="Max 40 characters"
		                  // type="text"
		                  // name="item-title"
		                  // id="item-title"
		                  className="uniqueBoxImg mt-4 pl-4"
		                  type="file"
			              placeholder="Add a File"
			              onChange={(event) => {
				              setError('')
				              setFile(event.target.files[0])
				              console.log("pic",event.target.files[0])}}

		                />

*/}		                <ImageUploading
					        multiple={false}
					        value={images2}
					        onChange={onChange2}
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
					              className="uniqueBoxSm mt-4 relative cursor-pointer flex justify-center items-center"
					              onClick={onImageUpload}
					              {...dragProps}
					            >
					              {imageList && imageList[0] ? null : <img className="w-100" src="../smcam.png" />}
					              {imageList && imageList[0] ? null : <img className="absolute uploadSketch" src="../smup.png" />}
					              {imageList.map((image2, index) => (
					              <div key={index} className=" absolute flex justify-center items-center">
					                <img src={image2.data_url} alt="" width="66%" />
					                
					              </div>
					            ))}

					            </div>
					            &nbsp;
					            
					          </div>
					        )}
					    </ImageUploading>
	           
          
           
{/*		                <input
		                  // placeholder="Max 40 characters"
		                  // type="text"
		                  // name="item-title"
		                  // id="item-title"
		                  className="uniqueBoxImg mt-4 pl-4"
		                  type="file"
			              placeholder="Add a File"
			              onChange={(event) => {
				              setError('')
				              setFile(event.target.files[0])
				              console.log("pic",event.target.files[0])}}

		                />

*/}		                <ImageUploading
					        multiple={false}
					        value={images3}
					        onChange={onChange3}
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
					              className="uniqueBoxSm mt-4 relative cursor-pointer flex justify-center items-center"
					              onClick={onImageUpload}
					              {...dragProps}
					            >
					              {imageList && imageList[0] ? null : <img className="w-100" src="../smcam.png" />}
					              {imageList && imageList[0] ? null : <img className="absolute uploadSketch" src="../smup.png" />}
					              {imageList.map((image3, index) => (
					              <div key={index} className=" absolute flex justify-center items-center">
					                <img src={image3.data_url} alt="" width="66%" />
					                
					              </div>
					            ))}

					            </div>
					            &nbsp;
					            
					          </div>
					        )}
					    </ImageUploading>
					   </div>
					   {imgError &&
					                	<div className="mt-3 genBold text-red-600"> Please include FOUR images </div> 
					                }

					   </div>
					   </div>

				<div className="flex flex row">
					<div className="genBold pt-4 mr-6 text-right w-40">Category</div>
              		<div className="flex flex-row">
              		<div className="flex flex-col">
              			<Menu as="div" className="relative inline-block text-left">
						      <div>
						        <Menu.Button className="genLight uniqueBox inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
						          {dropdown}
						          <ChevronDownIcon className="-mr-1 ml-auto h-5 w-5" aria-hidden="true" />
						        </Menu.Button>
						      </div>

						      <Transition
						        as={Fragment}
						        enter="transition ease-out duration-100"
						        enterFrom="transform opacity-0 scale-95"
						        enterTo="transform opacity-100 scale-100"
						        leave="transition ease-in duration-75"
						        leaveFrom="transform opacity-100 scale-100"
						        leaveTo="transform opacity-0 scale-95"
						      >
						        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
						        {categories &&
						          <div className="py-1"> 
						           {categories.map((cat, index) => { 
			            				return(
								            <Menu.Item>
								              {({ active }) => (
								                <div
								                  onClick={() => {
								                  	setDrop(cat)
								                  	setCatError(false)
								                  }}
								                  className={classNames(
								                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								                    'block px-4 py-2 text-sm'
								                  )}
								                >
								                  {cat}
								                </div>
								              )}
								            </Menu.Item>
								        )})}

						          </div>
						         }
						        </Menu.Items>
						      </Transition>
						    </Menu>
						    {catError &&
					                	<div className="mt-3 genBold text-red-600"> Please select a category </div> 
					                }
					               </div>

              		</div>
              	</div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Description</div>
						<div className="genLight pt-2 mr-6 text-right w-40">(Max 240 characters)</div>
					</div>
              		<div className="flex flex-row">
              {/*			 <input
			                  placeholder="Last Name"
			                  type="text"
			                  name="last-name"
			                  id="last-name"
			                  autoComplete="family-name"
			                  className="uniqueBoxDesc mt-4 pl-4"
			                  onChange={(event) => {
			                    setError('')
			                    setDescription(event.target.value)
			                  }}

			                />*/}
			          <div className ='flex flex-col'>  
				            
				            <textarea
				            	name="Description"
				                  id="description"
				                  className="uniqueBoxDesc mt-4 p-4"
				                  maxlength='240'
				                  onClick={() => {setDescError(false)}}
				                  onChange={(event) => {
				                    setError('')
				                    setDescription(event.target.value)
				                  }}
				            >
					  
					  		</textarea>
					  		  {descError &&
					                	<div className="mt-3 genBold text-red-600"> Please write a description </div> 
					                }

				  		<div className="pr-8 text-right">
				  			{desc ? desc.length : null}
				  		</div>
				  	</div>
			             </div>
				  		
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Product Features</div>
					</div>
					<div className="flex flex-col">
              		<div className="flex flex-row uniqueBoxDesc">
              {/*			 <input
			                  placeholder="Last Name"
			                  type="text"
			                  name="last-name"
			                  id="last-name"
			                  autoComplete="family-name"
			                  className="uniqueBoxDesc mt-4 pl-4"
			                  onChange={(event) => {
			                    setError('')
			                    setDescription(event.target.value)
			                  }}

			                />*/}
			       {/*     <textarea
			            	name="Description"
			                  id="description"
			                  className="uniqueBoxDesc mt-4 p-4"
			                  maxlength='240'
			                  onChange={(event) => {
			                    setError('')
			                    setFeatures(event.target.value)
			                  }}
			            >
				  
				  		</textarea>*/}
				  		<div className="flex flex-col ">
				  		 <input
			                  type="text"
			                  name="feat1"
			                  id="feat1"
			                  placeholder="feature 1"
			                  onClick={() => {setFeatError(false)}}
			                  className="featureBox mt-4 pl-4 mx-auto border-none"
			                  onChange={(event) => {
			                    setError('')
			                    setFeat1(event.target.value)
			                  }}
			                />
			                 <input
			                  type="text"
			                  name="feat2"
			                  id="feat2"
			                  placeholder="feature 2"
			                  className="featureBox mt-4 pl-4 mx-auto border-none"
			                  onChange={(event) => {
			                    setError('')
			                    setFeat2(event.target.value)
			                  }}
			                />
			                 <input
			                  type="text"
			                  name="feat3"
			                  id="feat3"
			                  placeholder="feature 3"
			                  className="featureBox mt-4 pl-4 mx-auto border-none"
			                  onChange={(event) => {
			                    setError('')
			                    setFeat3(event.target.value)
			                  }}
			                />
				  	
			             </div>
			             </div>

			             {featError &&
					                	<div className="mt-3 genBold text-red-600"> Please add some features </div> 
					                }
					          
				  		</div>
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Location</div>
					</div>
              		<div className="flex flex-row">
              			<div className="flex flex-col">
              			 <input
			                  type="text"
			                  name="postcode"
			                  id="postcode"
			                  placeholder="e.g. Islington"
			                  autoComplete="postcode"
			                  className="uniqueBox mt-4 pl-4"
			                  onClick={() => {setLocError(false)}}
			                  onChange={(event) => {
			                    setError('')
			                    setPostcode(event.target.value)
			                  }}
			                />
			          
				  	 {locError &&
					                	<div className="mt-3 genBold text-red-600"> Please specify your location </div> 
					                }
					          
				  		</div>
			             </div>
				  		
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Minimum rental days</div>
					</div>
              		<div className="flex flex-row">
              		<div className="flex flex-col">
              			 <input
			                  type="text"
			                  name="rental"
			                  id="rental"
			                  className="uniqueBox mt-4 pl-4"
			                  onClick={() => {seRentError(false)}}
			                  onChange={(event) => {
			                    setError('')
			                    setRent(event.target.value)
			                  }}
			                />
			      		{rentError &&
					                	<div className="mt-3 genBold text-red-600"> Please include the minimum rental days </div> 
					                }
					          
				  		</div>
				  	
			             </div>
				  		
			            </div>


{/*{file &&*/}
{/*<img className='w-100' alt='icon' src={URL.createObjectURL(file)} />}
*/}{/*              <input
          type="file"
            placeholder="Add a File"
            onChange={(event) => {
              setError('')
              setFile(event.target.files[0])
              console.log("pic",event.target.files[0])}}
          />*/}


             
     


       

     

         

          

   
          </div>


					</div>
					<div className="flex flex-col w-1/2">
					<div className="sticky top-4">

						<div className="calcBox">
						      <div className="borderBoundary mx-auto">
						        <div className="h3Dark border-solid pt-8 pb-4 border-b-2 inline-flex orangeBorder">R.E.N Coin Calculator</div>
						        <div className="normalBold mt-7">Set the item value and desired rental price above to calculate R.E.N price and return on investment.</div>
						        
						        <div className="flex flex-row">
						          <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Item value (£)</div>
						          <input
						                            value={itemValue}
						                            onClick={() => {setCoinError(false)}}
						                            onChange={(event ) => {setItemValue(event.target.value)}}
						                            className="uniqueBox mt-2 pl-4"
						                          
						                          />
						        </div>
						        <div className="flex flex-row">
						          <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (£)</div>
						          <input
						                            value={rentalValue}
						                            onClick={() => {setCoinError(false)}}
						                            onChange={(event ) => {setRentalValue(event.target.value)}}
						                            className="uniqueBox mt-2 pl-4"
						                          
						                          />
						        </div>

						         <button 
						                  className="sendBtn bulkTxt ml-auto mr-12 block mt-4 text-center"
						                  onClick={() => setCalculated(true)} 
						                  value="Submit"
						                >
						                Calculate
						          </button>
						          {calculated && itemValue > 0 && rentalValue > 0 &&
						            <div>
						              <h2 className="normalBold mt-7">Your item rents for {Math.round(rentalValue * 5)} coins/day </h2>
						              <h2 className="normalBold mt-7">Your would pay off the item in {Math.round(itemValue/rentalValue)} rental days </h2>
						            </div>

						          }
						          {coinError &&
						          	<div className="mt-3 mb-2 genBold text-red-600"> Please calculate how much you would like to rent out your equipment for</div> 
						          }
						      	<button
						      		className="orangeBg text-white h3Dark py-3 px-8 rounded-full"
						      		onClick={handleSubmit} 
						      		>
						      		Submit your listing
						      	</button>

						      </div>
						    </div>

					</div>
					</div>
					</div>
				</div>
{booked &&
				<Transition.Root show={open1} as={Fragment}>
				      <Dialog 
				        as="div" 
				        className="fixed z-10 inset-0 overflow-y-auto" 
				        onClose={()=> {
				          setOpen1(false)
				          window.location.reload()
				        }}>
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
				            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "17em"}}>
				              <div style={{"width":"620px"}} className="mx-auto">
				              <div className="h3Bold mt-12 text-center">
				             Congratulations! Your item has been set for listing. Click below to view in profile.
				              </div>

				    
				              <div className="flex flex-col justify-center items-center pt-">
				          {user &&
				                <Link 
				                	to={`/profile/${user.user.id}`} 
				                	className="sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto" 
				                > 
				                	Got it
				                </Link>
				             }
				               {/* <div 
				                  className="orangeCol mb-8 text-white block mt-4 text-center orangeBtm pb-0.5"
				                >
				                 I made a mistake
				                </div>*/}
				              </div>
				              </div>
				            </div>
				          </Transition.Child>
				        </div>
				      </Dialog>
				    </Transition.Root>	

}

			</div>
		 }
		</div>

		)
}