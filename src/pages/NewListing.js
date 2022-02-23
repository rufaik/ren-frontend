import React, {useState, useEffect, useContext, Fragment} from 'react'
import ReactMarkdown from "react-markdown";
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
import {Calc} from './Calc'
import ReactPlayer from 'react-player'
import ImageUploading from "react-images-uploading";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}






const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default () =>{

	const [userTypes, setUserTypes] = useState([])
	const [change1, setChage1] = useState('Creative')
	const [change2, setChage2] = useState('')
	const [name, setName] = useState('')
	const [desc, setDescription] = useState('')
	const [features, setFeatures] = useState('')
	const [postcode, setPostcode] = useState('')
	const [rental, setRent] = useState('')
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

	console.log("user", user)
	console.log("simpleUser", simpleUser)



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


	useEffect(() => {
	    const getUserTypes = async () => {
	      const response = await fetch('http://localhost:1337/identity-cards')
	      const data = await response.json()
	      console.log("data", data)
	      setUserTypes(data)
	      setChage2(data[0].user_stories[0].id)
    }

    getUserTypes()
    console.log("userTypes", userTypes)


  }, [])

const handleSubmit = async (event) => {
    event.preventDefault()
    const coins = Math.round(rentalValue * 5)
    console.log('handling')

    if(!user){
      setError('Please log in first')
      return
    }



    const formData = new FormData()
    formData.append('data', JSON.stringify({name, features, postcode, rental, coins, userID: simpleUser.id}))
    formData.append('files.image', image[0].file)
    formData.append('files.image1', images1[0].file)
    formData.append('files.image2', images2[0].file)
    formData.append('files.image3', images3[0].file)

  try{
        const response = await fetch('http://localhost:1337/listings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          },          
          body: formData
        })
  
        const data = await response.json()
  
        console.log("dataK1", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }

	return(
		<div>
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
					                <input
					                  placeholder="Max 40 characters"
					                  type="text"
					                  name="item-title"
					                  id="item-title"
					                  className="uniqueBox mt-4 pl-4"
					                  onChange={(event) => {
					                    setError('')
					                    setName(event.target.value)
					                  }}

					                />
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
					   </div>

				<div className="flex flex row">
					<div className="genBold pt-4 mr-6 text-right w-40">Category</div>
              		<div className="flex flex-row">
              			<Menu as="div" className="relative inline-block text-left">
						      <div>
						        <Menu.Button className="genLight uniqueBox inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
						          Select from dropdown
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
						          <div className="py-1">
						            <Menu.Item>
						              {({ active }) => (
						                <a
						                  href="#"
						                  className={classNames(
						                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
						                    'block px-4 py-2 text-sm'
						                  )}
						                >
						                  Account settings
						                </a>
						              )}
						            </Menu.Item>
						            <Menu.Item>
						              {({ active }) => (
						                <a
						                  href="#"
						                  className={classNames(
						                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
						                    'block px-4 py-2 text-sm'
						                  )}
						                >
						                  Support
						                </a>
						              )}
						            </Menu.Item>
						            <Menu.Item>
						              {({ active }) => (
						                <a
						                  href="#"
						                  className={classNames(
						                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
						                    'block px-4 py-2 text-sm'
						                  )}
						                >
						                  License
						                </a>
						              )}
						            </Menu.Item>
						            <form method="POST" action="#">
						              <Menu.Item>
						                {({ active }) => (
						                  <button
						                    type="submit"
						                    className={classNames(
						                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
						                      'block w-full text-left px-4 py-2 text-sm'
						                    )}
						                  >
						                    Sign out
						                  </button>
						                )}
						              </Menu.Item>
						            </form>
						          </div>
						        </Menu.Items>
						      </Transition>
						    </Menu>

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
			                  onChange={(event) => {
			                    setError('')
			                    setDescription(event.target.value)
			                  }}
			            >
				  
				  		</textarea>
				  		<div className="pr-8 text-right">
				  			{desc ? desc.length : null}
				  		</div>
				  	</div>
			             </div>
				  		
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Product Feature</div>
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
			            <textarea
			            	name="Description"
			                  id="description"
			                  className="uniqueBoxDesc mt-4 p-4"
			                  maxlength='240'
			                  onChange={(event) => {
			                    setError('')
			                    setFeatures(event.target.value)
			                  }}
			            >
				  
				  		</textarea>
				  	
			             </div>
				  		
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Postcode</div>
					</div>
              		<div className="flex flex-row">
              			 <input
			                  type="text"
			                  name="postcode"
			                  id="postcode"
			                  autoComplete="postcode"
			                  className="uniqueBox mt-4 pl-4"
			                  onChange={(event) => {
			                    setError('')
			                    setPostcode(event.target.value)
			                  }}
			                />
			          
				  	
			             </div>
				  		
			            </div>

              	<div className="flex flex row">
              		<div className ='flex flex-col'>
						<div className="genBold pt-4 mr-6 text-right w-40">Minimum rental days</div>
					</div>
              		<div className="flex flex-row">
              			 <input
			                  type="text"
			                  name="rental"
			                  id="rental"
			                  className="uniqueBox mt-4 pl-4"
			                  onChange={(event) => {
			                    setError('')
			                    setRent(event.target.value)
			                  }}
			                />
			      
				  	
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
						                            onChange={(event ) => {setItemValue(event.target.value)}}
						                            className="uniqueBox mt-2 pl-4"
						                          
						                          />
						        </div>
						        <div className="flex flex-row">
						          <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (£)</div>
						          <input
						                            value={rentalValue}
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

			</div>
		</div>

		)
}