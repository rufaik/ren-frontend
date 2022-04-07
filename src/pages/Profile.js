import React, {useState, useEffect, useContext, Fragment} from 'react'
import Post from '../components/Post'
import Availability from '../components/Availability'
import Share from './Share'
import {API_URL} from '../utils/urls'
import Payout from './Payout'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import Tabs,{Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import ImageUploading from "react-images-uploading";
import { addDays } from 'date-fns';
import Footer from '../components/Footer'


export default ({match, history}) =>{
const {id} = match.params
console.log("idd", id)
console.log("match", id)
const [open, setOpen] = useState(false)
const [open1, setOpen1] = useState(false)
const [open2, setOpen2] = useState(false)
const [open3, setOpen3] = useState(false)
const [final, setFinalPayout] = useState(false)
const {user, setUser, simpleUser, setSimpleUser, simpleUser1} = useContext(UserContext)
// console.log("setUser", setUser)

// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
//   return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

const [post1, setPost1] = useState({})
const [post2, setPost2] = useState({})
const [post3, setPost3] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description1, setDescription1] = useState('')
const [letter, setLetter] = useState('')
const [first, setFirst] = useState('')
const [unique, setUnique] = useState('')
const [code, setCode] = useState('')
const [coins, setCoins] = useState(0)
const [file, setFile] = useState(null)
const [profile, setProfile] = useState('/profile.jpg')
const [error, setError] = useState('')
const [show, setShow] = useState('collapse')
const [pop, setPop] = useState({})
const [fullBooking, setFullBooking] = useState({})
const [status, setStatus] = useState('')
const [lastStatement, setLast] = useState('')
const [newBooking, setNewBooking] = useState('')
// const [profileUser, setProfileUser] = useState([])
  const [bookingList, setBookingList] = useState([]);
  const [bookingList1, setBookingList1] = useState([]);
  const [reject, setReject] = useState(false);
  const [tranStatus, setTranStatus] = useState('Ingoing');
  const [activePayout, setActivePayout] = useState(false);
  const [showPayout, setShowPayout] = useState(false);
  const [coinsToTransfer, setCoinsToTransfer] = useState(null);
  const [range1, setRange1] = useState(null);
  const [range2, setRange2] = useState(null);
  const [range3, setRange3] = useState(null);
  const [joined, setJoined] = useState(null);

const [name, setName] = useState('')
const [surname, setSurname] = useState('')




useEffect(() => {

  fetchUser()

}, [])

const fetchUser = async (user) => {
  console.log("go", user)
    const response = await fetch(`${API_URL}/users/${id}`, {
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
                  setFirst(data.name)
                  changeDate(data.created_at)
                  setCode(data.username)
                  setCoins(data.coins)
                  setDescription1(data.bio)
                  const letterA = data.surname.charAt(0)
                  setLetter(letterA)
                } else {
                  console.log("else", user)
                  setFirst(user.user.name)
                  setCode(user.user.username)
                  setCoins(user.user.coins)
                  setDescription1(user.user.bio)
                  const letterA = user.user.surname.charAt(0)
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



const callRange1 =  () => {

  const sold = localStorage.getItem("simpleUser1")
  console.log("simpleUser1", sold.value)
  console.log("state", window)



setRange1(simpleUser1)

}

const callRange2 =  () => {

setRange2(simpleUser1)

}

const callRange3 =  () => {

setRange3(simpleUser1)

}

const fetchListings = async (user) => {
  console.log("gosssss", user)
    const response = await fetch(`${API_URL}/listings`, {
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


useEffect(() => {

  fetchBookings()

}, [user])

const fetchBookings = async (user) => {
  console.log("gottttt", user)
    const response = await fetch(`${API_URL}/bookings`, {
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
                console.log("sidYYYYY", data)
            

                if(data !== null){
                  setPost3(data);
          
                } else {
                  console.log("else", user)
               

                }
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
                setLoading(false);
            }         
        }




const newBookings =  () => {
    // pop.bookings.map( async (booking, i) => {
    //   if(booking.status ==='Pending'){
    //     const original = booking.id
    //     console.log("original", original)

  post3.map((booking, i) => {
    if (booking.status === "Confirmed" && `${booking.renter.id}` === id) {
      let updatedItems = bookingList;
      updatedItems.push(booking.id);
      setBookingList(updatedItems);
      console.log("updatedItems", updatedItems)
  }
})}

useEffect(() =>{
if(post3.length > 0) {
    newBookings()}

  }, [post3])


const newBookingsRej =  () => {
    // pop.bookings.map( async (booking, i) => {
    //   if(booking.status ==='Pending'){
    //     const original = booking.id
    //     console.log("original", original)

  post3.map((booking, i) => {
    if (booking.status === "Rejected" && `${booking.renter.id}` === id) {
      let updatedItems = bookingList;
      updatedItems.push(booking.id);
      setBookingList1(updatedItems);
      console.log("updatedItems", updatedItems)
  }
})}

useEffect(() =>{
if(post3.length > 0) {
    newBookingsRej()}

  }, [post3])

useEffect(() =>{
if(simpleUser && simpleUser.stripeStatus !== "Completed") {
    setActivePayout(true)
  }

  }, [simpleUser])

console.log("bookingList", bookingList)

  // const addToList = item => {
  //   //copy the selected item array
  //   let updatedItems = recipeIds;
  //   //use array.push to add it to the array
  //   updatedItems.push(item.id);
  //   setRecipeIds(updatedItems);
  //   setSelectedId1(item.id);
  //   // console.log(itemList);
  // };


  //   const addToList = item => {
  //   //copy the selected item array
  //   let updatedItems = bookingList;
  //   //use array.push to add it to the array
  //   updatedItems.push(booking.id);
  //   setBookingList(updatedItems);
  
  //   // console.log(itemList);
  // };


// const handleDelete = async () => {
//   const response = await fetch(`${API_URL}/posts/${id}`, {
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

  const response = await fetch(`${API_URL}/users/${id}`, {
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


const editBio = async () => {


  const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${user.jwt}`
    },
    body: JSON.stringify({
      bio: description1,
      name,
      surname
    })
  })
    const data = await response.json();
    setSimpleUser(data)
    localStorage.setItem('simpleUser', JSON.stringify(data))
    console.log("editBio data", data)
    setFirst(data.name)
    setDescription1(data.bio)
    const letterA = data.surname.charAt(0)
    setLetter(letterA)
}

// const handleLike = async () => {
//   try{
//     const response = await fetch('${API_URL}/likes', {
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
//     const response = await fetch(`${API_URL}/likes/${id}`, {
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
   
        const response = await fetch(`${API_URL}/users/${id}`, {
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



  const acceptBooking = async (event) => {
   

    // pop.bookings.map( async (booking, i) => {
    //   if(booking.status ==='Pending'){
    //     const original = booking.id
    //     console.log("original", original)


    try{
   
        const response = await fetch(`${API_URL}/bookings/${fullBooking.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },          
         body: JSON.stringify({
              status,
              fullBooking
            })
        })
  
        const data = await response.json()
  
        console.log("dataRRRRRRR", data) 

        // window.location.reload()
        setOpen1(true)
        createTransaction1()
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

    //   }
    //   return null
    // })

    //find booking set Status to confirmed

}


const createTransaction1 = async () => {
  const data = {
      amount: fullBooking.coins,
      InOrOut: "Outgoing",
      type:"Payment",
      booking: parseInt(fullBooking.id),
      userID:simpleUser.id
    }
  const response = await fetch(`${API_URL}/transactions`, {
       method: 'POST',
          headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(data)
        })


} 


  // try{
   
  //       const response = await fetch(`${API_URL}/booking/${id}`, {
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

console.log("fullBooking", fullBooking)

  const rejectBooking = async (event) => {
    //item.booked to false
    //find booking set Status to rejected

    event.preventDefault()

    // pop.bookings.map( async (booking, i) => {
    //   if(booking.status ==='Pending'){
    //     const original = booking.id
    //     console.log("original", original)


    try{
   
        const response = await fetch(`${API_URL}/bookings/${fullBooking.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },          
         body: JSON.stringify({
              status: "Rejected"
            })
        })
  
        const data = await response.json()
        releaseItem()
        console.log("Rejected", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

    //   }
    //   return null
    // })
    
  }

  const showingPayout = () => {
    setShowPayout(true)
  }


//item.booked to false
const releaseItem = async () => {
  

  const response = await fetch(`${API_URL}/listings/${pop.id}`, {
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
 shareCoins()
  console.log("releaseItem", data)
}


   const shareCoins = async () => {
    console.log()
    const data2 = {
      coins:  
        fullBooking.renter.coins === null 
        ? Math.round(parseInt(0) + parseInt(fullBooking.coins))
        : Math.round(parseInt(fullBooking.renter.coins) + parseInt(fullBooking.coins))
      
    }

      try{
        const response = await fetch(`${API_URL}/users/${fullBooking.renter.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data2)
          })

          const shared = await response.json() 
          createTransaction()        

      } catch(err){
    console.log("Exception ", err)}

    } 

const createTransaction = async () => {
  const data = {
      amount: fullBooking.id,
      InOrOut: "Ingoing",
      type:"BookingRejected",
      booking: parseInt(fullBooking.id),
      userID:fullBooking.renter.id
    }
  const response = await fetch(`${API_URL}/transactions`, {
       method: 'POST',
          headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(data)
        })


} 

 console.log("FORST", parseInt(coins) * 20 )
 console.log("SEC", Math.round(parseInt(coins) * 20 ))

  const confirmPayout = async (data) => {
    setCoinsToTransfer(simpleUser.coins)
    setOpen3(true)
  }


  const goToDashboard = async (data) => {
    
    console.log("CLICK2")
       try{
        const response = await fetch(`${API_URL}/payouts/getLink`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ account: simpleUser.payoutID})
          })

          const confirm = await response.json()
          console.log("confirm2", confirm)
          window.location.href = `${confirm.url}`

      } catch(err){
    console.log("Payment ", err)
      }

    }




   const clearCoins = async (data) => {
    
    const data1 = {
      coins: 0,
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
           setCoins(simpleUser.coins)
          transferCoins()

      } catch(err){
    console.log("Exception ", err)}

    }

  const transferCoins = async () => {
     const data3 = {
      account: post1.payoutID, 
      amount: Math.round(parseInt(coinsToTransfer) * 20)
      }
      console.log("CLICK2")
       try{
        const response = await fetch(`${API_URL}/payouts/coinPay`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify(data3)
          })

          const confirm = await response.json()
          console.log("confirm2", confirm)
          setFinalPayout(true)
          // window.location.reload()

      } catch(err){
    console.log("Payment ", err)
      }
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

console.log("coins", coins)


// const url = post.image && post.image.url
const formatImageUrl = (url) => `${API_URL}${url}`

                  console.log("if", post1)


  const [image, setImages] = React.useState([]);
  const [showSave, setShowSave] = useState(true)

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("iiiiii", imageList, addUpdateIndex);
    setImages(imageList);
    console.log("imageList", imageList)
  };  

  const saveImage = async (event) => {
    event.preventDefault()
    console.log('handling', image)


  

    const formData = new FormData()
    formData.append('files', image[0].file)

    formData.append('refId', simpleUser.id)
    formData.append('ref', 'user')
    formData.append('field', 'image')
    formData.append('source', 'users-permissions')

  try{
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          },          
          body: formData
        })


  
        const data = await response.json()
        getUser()
        console.log("dataK1", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }

  const getUser = async () => {


  try{
        const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          },          
        })
        const data = await response.json()
        setSimpleUser(data)
           localStorage.setItem('simpleUser', JSON.stringify(data))
        setShowSave(false)
        console.log("dataK1", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }
const changeDate = (data) => {
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  setJoined(joined2.toLocaleDateString('en-EN', options))

}


  // const capit = () => {
  //     const name1 = "sandy"
  //  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
  //  console.log("name1", name1)
  // }

// const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
//     const username1 = data.user.name + "-" + data.user.surname.charAt(0) + "-" + getRndInteger(100, 1000) + data.user.id





// console.log("joined", (new Date(joined)).setDate((new Date(joined)).getDate() - 1))

return (
    <div className="SinglePost">

    <div className="sectWidth flex mx-auto mt-16">
    <div className="flex flex-col">
{/*      <div className="imgBx rounded-t-full rounded-b-lg flex justify-center items-center">
        <img className="rounded-t-full rounded-b-lg w-full h-full object-cover" src={profile} alt="" />
*/}{/*        <img className="PostImage w-full h-full object-cover" src={formatImageUrl(url)} alt="" />
*/}         

{user && user.user.id.toString() === id.toString() 
  ?
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
                className="imgBx rounded-t-full border border-black-100 cursor-pointer rounded-b-lg flex justify-center items-center"
                onClick={onImageUpload}
                {...dragProps}
              >
                {simpleUser && simpleUser.image === null && imageList.length === 0
                  ? <img className="w-100" src="../camsketch.png" />

                  : <div  className=" flex justify-center items-center imgBx rounded-t-full rounded-b-lg">
                      {simpleUser && simpleUser.image &&
                         <img 
                          src={simpleUser.image.url} 
                          className="rounded-t-full rounded-b-lg w-full h-full object-cover" 
                          alt="" 
                          width="66%" 
                        />
                      }
                      
                    </div> 
                }
                {simpleUser && simpleUser.image === null
                  ? <img className="absolute uploadSketch" src="../upload.png" /> 
                  : null
                }
                
                {imageList.map((image, index) => (
                <div key={index} className=" flex justify-center items-center imgBx rounded-t-full rounded-b-lg absolute top-0 left-0">
                  <img src={image.data_url} className="rounded-t-full rounded-b-lg w-full h-full object-cover" alt="" width="66%" />
                  
                </div>
              ))}

              </div>
          {showSave &&
            <div>
              {imageList && imageList[0] &&
                <button onClick={saveImage} className="orangeCol my-3 text-white block mx-auto mt-4 text-center underline cursor-pointer">
                        Save
                </button>
              }
              </div>
              }
            </div>
          )}
      </ImageUploading>
    :
     <div className="relative">
      <div
          className="imgBx rounded-t-full border border-black-100 rounded-b-lg flex justify-center items-center"
        >
          {post1 && post1.image === null
            ? <img className="w-100" src="../camsketch.png" />

            : <div  className=" flex justify-center items-center imgBx rounded-t-full rounded-b-lg">
                {post1 && post1.image &&
                   <img 
                    src={post1.image.url} 
                    className="rounded-t-full rounded-b-lg w-full h-full object-cover" 
                    alt="" 
                    width="66%" 
                  />
                }
              </div> 
          }
          {post1 && post1.image === null
            ? <img className="absolute uploadSketch" src="../upload.png" /> 
            : null
          }
      </div>
    </div>
   }


    
{/*      {user && user.user.id === post1.id 
      ? <button className="orangeTxt" onClick={() => { show ==='collapse' ? setShow('visible') : setShow('collapse')}} >Choose Photo</button>
      : null
    }*/}
{/*      <form onSubmit={handleImgSubmit} className="flex flex-col justify-center mx-auto" style={{"visibility":show}}> 
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
       </form>*/}
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
                {user && user.user.id.toString() === id.toString() &&
                <div className="flex flex-col">
                  <Link to='/topup' style={{"padding": "0.3rem"}} className="cursor-pointer authBtn ml-10 mb-1">
                    Top up
                  </Link>
                  <button onClick={confirmPayout} className=" cursor-pointer authBtn ml-10 mt-1">
                    Payouts 
                  </button>
{/*                  <button onClick={clearCoins} className="authBtn ml-10 mt-1 onClick">
                    OUTTTT
                  </button>*/}
                </div>
              }
       
              </div>

              <div className="flex mt-4">
                <div className="genBold">75</div>
                <div className="gen ml-2">earned in the past 30 days</div>
              </div>
              <div className="flex">
                <div className="genBold">30</div>
                <div className="gen ml-2">spent in the past 30 days</div>
              </div>
        {bookingList.length > 0 
          ?
              <div className="flex mt-4">
                <div className="genBold orangeCol">{bookingList.length}</div>
                <div className="gen ml-2"> rental booking(s) have been confirmed</div>
              </div>
          : null
        }
        {bookingList1.length > 0 
          ?
              <div className="flex">
                <div className="genBold orangeCol">{bookingList.length}</div>
                <div className="gen ml-2"> rental booking(s) have been rejected</div>
              </div>
          : null
        }

      {user && user.user.id.toString() === id.toString() &&
        <div>
        {activePayout &&
          <button onClick={showingPayout} className="orangeCol my-3 text-white block mt-4 underline cursor-pointer">
                  Set up your payment information
          </button>
        }
        </div>
      }
        {showPayout &&
          <Payout />
        }
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


     <Transition.Root show={open3} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed z-10 inset-0 overflow-y-auto" 
        onClose={()=> {
          setOpen3(false)
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
              <div style={{"width":"620px"}} className="mx-auto flex justify-center flex-col">
     
            <div>
              <div className="h3Bold mt-12 text-center">
              Payouts
              </div>
              <div className="genLight mt-4 text-center">
                Would you like to convert your coins to cash and payout or go to payout dashboard
              </div>
      

              <div className="flex mt-8 mx-12">
                <div 
                  className="orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1"
                  onClick={clearCoins}
                >
                  Payout
                </div>
                <div 
                  className="sendBtn bulkTxt block mt-4 text-center pt-1 ml-auto"
                  onClick={goToDashboard}
                >
                 Dashboard
                </div>
            </div>
          
              </div>
              </div>
              </div>
           
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


<div className="sectWidth flex mx-auto mt-10">
  <div className="leftCol">
  <div className="flex items-center">
    <h2 className="flex">
      <div className="capitalize">{first}.</div>
      <div className="capitalize">{letter}</div>
    </h2>

    {user && user.user.id.toString() === id.toString() 
      ?<>
       {edit 
        ? <button 
            onClick={() => {
              setEdit(false)
              editBio()
            }} 
            className="editBtn bulkTxt ml-8 text-center"
          >
            Save bio
          </button>
        : <button 
            onClick={() => {
              setEdit(true)
              
              setName(simpleUser.name)
              setSurname(simpleUser.surname)
            }} 
            className="editBtn bulkTxt ml-8 text-center"
          >
            Edit bio
          </button>
      } 
      </>
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
    
    {edit 
      ?
          <form onSubmit={handleEditSubmit}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="New description"
              className="descBox mt-4 gen pl-3"
            />
            <input
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              placeholder="New description"
              className="descBox mt-4 gen pl-3"
            />
            <input
              value={description1}
              onChange={(event) => setDescription1(event.target.value)}
              placeholder="Tell us about yourself"
              className="descBox my-4 gen pl-3"
            />
          </form> 

      : <div className="gen mt-4">
          {description1}
        </div>

      }
      </>
                 
  {joined &&
    <div className="gen greyCol mb-7">
      Joined {joined}

    </div>
  }
    {user && user.user.id.toString() === id.toString() &&
      <div className="orangeCol my-3 text-white block mt-4 underline cursor-pointer" onClick={() => setOpen2(true)}
      >
      Select availability
      </div>
    }
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

 {user && user.user.id.toString() === id.toString()
?
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
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={listing.image && listing.image.url} alt="playstation" />
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

              { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Pending" && `${booking.renter.id}` === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(booking.listing)
                        setFullBooking(booking)
                        console.log("list", booking.listing)
                        setOpen(true)
                        setStatus("Complete")
                        setLast("Congratulations, your order is complete! Your coins will be transferred to your account shortly.")
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={booking.listing.image && booking.listing.image.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
            </>
: null}

      <div className="genBold">confirmed</div>

      { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Confirmed" && `${booking.renter.id}` === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(booking.listing)
                        setFullBooking(booking)
                        console.log("list", booking.listing)
                        setOpen(true)
                        setStatus("Complete")
                        setLast("Congratulations, your order is complete! Your coins will be transferred to your account shortly.")
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={booking.listing.image && booking.listing.image.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
            </>
: null}

  <div className="genBold">all</div>
        { post2 && post2[0]
          ?<>

                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post2.map((listing, i) => {
                     if (listing.booked === true && listing.userID === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(listing)
                        console.log("list", listing)
                        setOpen(true)
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={listing.image && listing.image.url}  alt="playstation" />
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
     
          <Tab title="Bookings" className="mr-3 w-1/3">
              <div className="mt-3">
                <div>
                    <div className="h3Bold mt-8 mb-4">Pending { post3 && post3[0] && <span>: Congratulations!&nbsp;&nbsp;You have bookings!</span>}</div>
                    <div className="genLight my-4">Please click on each item to <b>accept</b> or <b>reject</b> the reservations on your items</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>

          { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Pending" && booking.listing.userID === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(booking.listing)
                        setFullBooking(booking)
                        console.log("list", booking)
                        setOpen(true)
                        setStatus("Confirmed")
                        setLast("Congratulations, your item will be rented out! Contact the renter to organise your drop off")
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={booking.listing.image && booking.listing.image.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
            </>
: null}
                <div>
                    <div className="h3Bold mt-8 mb-4">Confirmed</div>
                    <div className="genLight my-4">Once you're booking has been complete and your items have been returned, set your booking to <b>COMPLETED</b> and your coins will be released your account</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>
        { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Confirmed" && booking.listing.userID === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(booking.listing)
                        setFullBooking(booking)
                        console.log("list", booking.listing)
                        setOpen(true)
                        setStatus("Complete")
                        setLast("Congratulations, your order is complete! Your coins will be transferred to your account shortly.")
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={booking.listing.image && booking.listing.image.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
            </>
: null}
                <div>
                    <div className="h3Bold mt-8 mb-4">Completed</div>
                    <div className="genLight my-4">View your completed bookings</div>
                    <div className="gryLine2 w-full my-10"></div>
                </div>

          { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

                  <div>
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Complete" && booking.listing.userID === id) {
                        return(
                  <div 
                    className="flex flex-col overflow-hidden thumbImgBx" 
                    onClick={() => {
                        setPop(booking.listing)
                        setFullBooking(booking)
                        console.log("list", booking)
                        setOpen(true)
                      }}>
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={booking.listing.image && booking.listing.image.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.listing.rental}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.listing.name}</div>
                        </div>

                        <div className="gen pt-9">23rd Sep 2021</div>
                    </div>
                  </div>
                  )}})}

                 

                 
                  
                  </div>


            </div>
            </>
: null}
              </div>
          </Tab>
      </Tabs>
  </div>



:

  <div className="rightCol ml-12">

      <div
      className="mt-5 w-100">
        <div className="mr-3 w-full " >
           <div className='h3Bold borderbot border-black py-2'>
           Listed
           </div>
        
           <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

{ post2 && post2[0]
  ?            


      <div>
           {post2.map((listing, i) => {
            if(listing.userID === id)
                     
                        return(
                  <div className="flex flex-col overflow-hidden thumbImgBx">
                    <div className="flex-shrink-0 relative thumbImg">
                      <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src={listing.image && listing.image.url} alt="playstation" />
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




         </div>
     
         
     
      </div>
  </div>
}

</div>







<Transition.Root show={open2} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen2}>
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
              <div className="h3Bold mt-12 text-center">Availability</div>
              <div className="mx-auto flex justify-center decoration-none">
                <Availability />
                {/*<button className="authBtn ml-10 mb-1" onClick={callRange1}>
                   Range 1
                  </button>
                  <h3>{range1}</h3>
                <button className="authBtn ml-10 mb-1"onClick={callRange2}>
                   Range 2
                  </button>
                  <h3>{range2}</h3>
                <button className="authBtn ml-10 mb-1"onClick={callRange3}>
                   Range 3
                  </button>
                  <h3>{range3}</h3>*/}
              </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>




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
              {lastStatement}
                
              }
              </div>

    
              <div className="flex flex-col justify-center items-center pt-">
          
                <a className="sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto" href="mailto:kemi@kodedldn.com" target="_blank" rel="noopener noreferrer" > Contact Now</a>
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

<Footer />
     

    </div>
  );
}






























