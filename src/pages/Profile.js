import React, {useState, useEffect, useContext, Fragment} from 'react'
import Post from '../components/Post'
import Share from './Share'

import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import Tabs,{Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'




export default ({match, history}) =>{
const {id} = match.params
console.log("idd", id)
console.log("match", id)
const [open, setOpen] = useState(false)
const [open1, setOpen1] = useState(false)
const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
console.log("user1111x", simpleUser)
// console.log("setUser", setUser)

// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
//   return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

const [post1, setPost1] = useState({})
const [post2, setPost2] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description1, setDescription1] = useState('')
const [letter, setLetter] = useState('')
const [first, setFirst] = useState('')
const [unique, setUnique] = useState('')
const [code, setCode] = useState('')
const [coins, setCoins] = useState('')
const [file, setFile] = useState(null)
const [profile, setProfile] = useState('/profile.jpg')
const [error, setError] = useState('')
const [show, setShow] = useState('collapse')
const [pop, setPop] = useState({})
// const [profileUser, setProfileUser] = useState([])


useEffect(() => {

  fetchUser()

}, [])

const fetchUser = async (user) => {
  console.log("go", user)
    const response = await fetch(`http://localhost:1337/users/${id}`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                
                // setDescription1(data.description)
                setLoading(false);
                console.log("side", data)
                if(data !== null){
                  setPost1(data);
                  setFirst(data.Name)
                  setCode(data.username)
                  setCoins(data.coins)
                  setDescription1(data.Name)
                  const letterA = data.Surname.charAt(0)
                  setLetter(letterA)
                } else {
                  console.log("else", user)
                  setFirst(user.user.Name)
                  setCode(user.user.username)
                  setCoins(user.user.coins)
                  setDescription1(user.user.bio)
                  const letterA = user.user.Surname.charAt(0)
                  setLetter(letterA)

                }
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
                setPost1({}); 
                setLoading(false);
            }         
        }


useEffect(() => {

  fetchListings()

}, [user])

const fetchListings = async (user) => {
  console.log("gosssss", user)
    const response = await fetch('http://localhost:1337/listings', {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                
                // setDescription1(data.description)
                setLoading(false);
                console.log("sideeeee", data)
                if(data !== null){
                  setPost2(data);
          
                } else {
                  console.log("else", user)
               

                }
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
                setPost2({}); 
                setLoading(false);
            }         
        }





useEffect(() =>{
    console.log("hey")
  }, [])

// const handleDelete = async () => {
//   const response = await fetch(`http://localhost:1337/posts/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${user.jwt}`
//     },
//   })
//   const data = await response.json();
//   history.push('/')
// }

const handleEditSubmit = async (event) => {
  event.preventDefault()
  console.log("handleEditSubmit")

  const response = await fetch(`http://localhost:1337/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${user.jwt}`
    },
    body: JSON.stringify({
      name: description1
    })
  })
  const data = await response.json();
  fetchUser()
  console.log("handleEditSubmit data", data)
}


// const handleLike = async () => {
//   try{
//     const response = await fetch('http://localhost:1337/likes', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${user.jwt}`,
//         'Content-Type':'application/json',
//       },
//       body: JSON.stringify({
//         post: parseInt(id)
//       })
//     })
//     fetchPost()
//     reloader()
//   } catch(err){
//     console.log("Exception ", err)
//   }
// }

// const handleRemoveLike = async () => {
//   try{
//     const response = await fetch(`http://localhost:1337/likes/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.jwt}`
//       }
//     })
//     fetchPost()
//     reloader()
//   } catch(err){
//     console.log("Exception ", err)
//   }
// }


const handleImgSubmit = async (event) => {
    event.preventDefault()

    if(!file){
      setError('Please add a file')
      return
    }

    const formData = new FormData()
    formData.append('files.image', file)

  try{
   
        const response = await fetch(`http://localhost:1337/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/multipart/form-data',
            'Authorization': `Bearer ${user.jwt}`
          },          
          body: {formData}
        })
  
        const data = await response.json()
  
        console.log("dataR", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }



  const acceptBooking = (event) => {
    event.preventDefault()

    pop.bookings.map( async (booking, i) => {
      if(booking.status ==='Pending'){
        const original = booking.id
        console.log("original", original)


    try{
   
        const response = await fetch(`http://localhost:1337/bookings/${original}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },          
         body: JSON.stringify({
              status: 'Confirmed'
            })
        })
  
        const data = await response.json()
  
        console.log("dataRRRRRRR", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

      }
      return null
    })

    //find booking set Status to confirmed

}


  // try{
   
  //       const response = await fetch(`http://localhost:1337/booking/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type':'application/multipart/form-data',
  //           'Authorization': `Bearer ${user.jwt}`
  //         },          
  //         body: {formData}
  //       })
  
  //       const data = await response.json()
  
  //       console.log("dataR", data) 
  //     }catch(err){
  //       console.log("Exception", err)
  //       setError(err)
  //     }

  // }

  const rejectBooking = (event) => {
    //item.booked to false
    //find booking set Status to rejected

    event.preventDefault()

    pop.bookings.map( async (booking, i) => {
      if(booking.status ==='Pending'){
        const original = booking.id
        console.log("original", original)


    try{
   
        const response = await fetch(`http://localhost:1337/bookings/${original}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },          
         body: JSON.stringify({
              status: 'Rejected'
            })
        })
  
        const data = await response.json()
        releaseItem()
        console.log("Rejected", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

      }
      return null
    })
    
  }


//item.booked to false
const releaseItem = async () => {
  

  const response = await fetch(`http://localhost:1337/listings/${pop.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${user.jwt}`
    },
    body: JSON.stringify({
      booked: false
    })
  })
  const data = await response.json();
 
  console.log("releaseItem", data)
}


// useEffect(() => {
//   {user && 
//   fetchUser()
// }
// }, [user])

// useEffect(() => {

//   {user && 
//     setDescription1(user.user.Name)
//   }
// }, [user])

console.log("sided", letter)

const API_URL = 'http://localhost:1337'

// const url = post.image && post.image.url
const formatImageUrl = (url) => `${API_URL}${url}`

                  console.log("if", post1)



  return (
    <div className="SinglePost">

    <div className="sectWidth flex mx-auto mt-16">
    <div className="flex flex-col">
      <div className="imgBx rounded-t-full rounded-b-lg flex justify-center items-center">
        <img className="rounded-t-full rounded-b-lg w-full h-full object-cover" src={profile} alt="" />
{/*        <img className="PostImage w-full h-full object-cover" src={formatImageUrl(url)} alt="" />
*/}         
      </div>
      {user && user.user.id === post1.id 
      ? <button className="orangeTxt" onClick={() => { show ==='collapse' ? setShow('visible') : setShow('collapse')}} >Choose Photo</button>
      : null
    }
      <form onSubmit={handleImgSubmit} className="flex flex-col justify-center mx-auto" style={{"visibility":show}}> 
         <input
            type="file"
            className="orangeTxt"
            placeholder="Add a File"
            onChange={(event) => {
              setError('')
              setFile(event.target.files[0])
              console.log("event.target.files[0]", event)
            }}
          />
          <button onClick={() => setProfile('./profile2')} c>Submit</button>
       </form>
       </div>

      <div className="ml-12 coinBox">
          <h2 className="items-start">Your R.E.N Coins</h2>
          <div className="flex mt-12">

            <div>
              <div className="flex items-center ">
                <div className="coin mr-2">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <h3>{coins}</h3>
                <button className="authBtn ml-10">
                  Top up
                </button>
              </div>

              <div className="flex mt-4">
                <div className="genBold">75</div>
                <div className="gen ml-2">earned in the past 30 days</div>
              </div>
              <div className="flex">
                <div className="genBold">30</div>
                <div className="gen ml-2">spent in the past 30 days</div>
              </div>
            </div>

            <Share />

{/*            <div className="shareBox ml-auto">
              <div className="h3Dark">Share your R.E.N Coins</div>
              <div className="gen mt-4 mb-7"> Simply enter the user’s unique code and submit the number of R.E.N Coins you’d like to share.</div>
              <input
                          value={unique}
                          placeholder="Enter user unqiue code"
                          className="uniqueBox pl-4"
                        />
              <input
                          value={unique}
                          placeholder="Number of R.E.N Coins"
                          className="uniqueBox mt-2 pl-4"
                        />
              <div className="flex items-center mt-6">
                <div className="bulkTxt underline">Bulk Share Option</div>
                <button className="sendBtn bulkTxt ml-20 text-center">Send R.E.N Coins</button>
              </div>
            </div>*/}
            
        </div>
    </div>
  </div>

<div className="sectWidth flex mx-auto mt-10">
  <div className="leftCol">
  <div className="flex items-center">
    <h2 className="flex">
      <div>Jasmine.</div>
      <div className="capitalize">K</div>
    </h2>

    {user && user.user.id.toString() === id.toString() ?
      <button onClick={() => setEdit(true)} className="editBtn bulkTxt ml-8 text-center">Edit profile</button>

      : null
    }
  </div>
    <div className="flex items-center">
      <div className="gen greyCol">R.E.N code:</div>
      <div className="genBold orangeCol mr-2">&nbsp;{code}</div>
      <div className="mb-1">
        <img className='w-100' alt='info' src="../info.png" />
      </div>
    </div>
   
      <>
    <div className="gen mt-4">
      {description1}
    </div>
    {edit &&
                      <form onSubmit={handleEditSubmit}>
                        <input
                          value={description1}
                          onChange={(event) => setDescription1(event.target.value)}
                          placeholder="New description"
                        />
                        <button onClick={() => setEdit(false)}> Confirm</button>
                      </form> 
                    }
                    </>
                 
  
    <div className="gen greyCol mb-7">
      Joined 8th Jan 2021
    </div>
    <div className="flex my-3 items-center">
      <h3>95%</h3>
      <div className="gen">&nbsp;Rentals approved</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>98%</h3>
      <div className="gen">&nbsp;Response rate</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>72</h3>
      <div className="gen">&nbsp;Rentals</div>
    </div>
    <div className="lineA mt-8"></div>


  </div>

  <div className="rightCol ml-12">

      <Tabs activeTab="1" className="mt-5 w-100" ulClassName="tabTitle" activityClassName="bg-success activeTabTitle" onClick={(event, tab) => console.log(event, tab)} >
        <Tab title="Listed" className="mr-3 w-1/3">
           
        
           <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

{ post2 && post2[0]
  ?            


      <div>
           {post2.map((listing, i) => {
            if(listing.userID === id)
                     
                        return(
                  <div className="flex flex-col overflow-hidden thumbImgBx">
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={formatImageUrl(listing.image && listing.image.url)} alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )})}
            </div>
        : null}
            </div>




         </Tab>
     
         <Tab title="Rented" className="mr-3 w-1/3">
              <div className="mt-3">
        { post2 && post2[0]
          ?<>

{/*            { post1.listings[0].booked === true
                    ?<>
                          <div className="h3Bold mt-8 mb-4">Congratulations!&nbsp;&nbsp;You have bookings!</div>
                          <div className="genLight my-4">Please click on each item to <b>accept</b> or <b>reject</b> the reservations on your items</div>
                      </>
                    : null
                  }*/}
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post2.map((listing, i) => {
{/*                    console.log("listing", listing)
*/}                     if (listing.booked === true && listing.userID === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(listing)
                        console.log("list", listing)
                        setOpen(true)
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={formatImageUrl(listing.image && listing.image.url)}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
             <div className="gryLine2 w-full my-10"></div>
            </>
: null}


               </div>
          </Tab>
     
{          <Tab title="Bookings" className="mr-3 w-1/3">
              <div className="mt-3">
                <div>
                    <div className="h3Bold mt-8 mb-4">Pending: Congratulations!&nbsp;&nbsp;You have bookings!</div>
                    <div className="genLight my-4">Please click on each item to <b>accept</b> or <b>reject</b> the reservations on your items</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>
                <div>
                    <div className="h3Bold mt-8 mb-4">Confirmed</div>
                    <div className="genLight my-4">Once you're booking has been complete and your items have been returned, set your booking to <b>COMPLETED</b> and your coins will be released your account</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>
                <div>
                    <div className="h3Bold mt-8 mb-4">Completed</div>
                    <div className="genLight my-4">View your completed bookings</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>
              </div>
          </Tab>}
      </Tabs>
  </div>

</div>
{ pop && pop.name ?
<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "44em"}}>
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Review Item Rental</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{/*              <div className="h3Sub my-4 ">Canon EOS M50 Black + EF-M 15-45mm IS STM Lens Black</div>
*/}              <div className="h3Sub my-4 ">{pop.name}</div>
              <div className="flex flex-row">
                <div className="flex-col flex w-9/12">
                  <div className="genLight mt-6">
                    A modern classic, this 4K mirrorless camera is packed with innovative technologies with an EF-M 15-45mm lens
                  </div>
                  <div className="genLight mt-6">
                    From Jasmine
                  </div>
                  <div className="genLight mt-6">
                    The location will be confirmed and agreed upon confirmation.
                  </div>

                </div>
                
                <div className="flex-col flex w-3/12 justify-center items-center">
                   <div className="w-full flex ">
                      <img className="w-full" src="../bigCam.png" alt="playstation" />
                    </div>
                </div>
              </div>
              <div className="gryLine2 w-full my-10"></div>

              <div className="flex items-center ">
                <h3>8</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <div className="genLight">x 19 days</div>
                <div className="genBold">&nbsp; (2nd May - 21st May)</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="genBold">Total:&nbsp;</div>
                <h3>152</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
              </div>
              <div className="gryLine2 w-full mt-10 mb-3"></div>
              <div className="flex">
                <div 
                  className="orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1"
                  onClick={acceptBooking}
                >
                 Accept
                </div>
                <div 
                  className="sendBtn bulkTxt block mt-4 text-center pt-1 ml-auto"
                  onClick={rejectBooking}
                >
                 Reject
                </div>
              </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

: null}



<Transition.Root show={open1} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen1}>
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
                Congratulations, your item will be rented out! Contact the renter to organise your drop off
              </div>

    
              <div className="flex flex-col justify-center items-center pt-">
          
                <div 
                  className="sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto"
                >
                 Contact Now
                </div>
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


     

    </div>
  );
}






























