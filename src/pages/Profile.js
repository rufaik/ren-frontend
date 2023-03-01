import React, {useState, useEffect, useContext, Fragment} from 'react'
import Availability from '../components/Availability'
import Share from './Share'
import {API_URL} from '../utils/urls'
import Payout from './Payout'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import 'react-best-tabs/dist/index.css';
import ImageUploading from "react-images-uploading";
import Footer from '../components/Footer'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Transactions from './Transactions'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Profile = ({match, history}) => {

const {id} = match.params
console.log("idd", id)
console.log("match", id)
const [open, setOpen] = useState(false)
const [open4, setOpen4] = useState(false)
const [open5, setOpen5] = useState(false)
const [open6, setOpen6] = useState(false)
const [open1, setOpen1] = useState(false)
const [open2, setOpen2] = useState(false)
const [open3, setOpen3] = useState(false)
const [upSection, setUp] = useState(true)
const [allSection, setAll] = useState(false)
const {user, simpleUser, setSimpleUser, simpleUser1, create} = useContext(UserContext)
 console.log("setUser", user)

// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
//   return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

  const [post1, setPost1] = useState({})
  const [post2, setPost2] = useState({})
  const [post3, setPost3] = useState({})
  const [loading, setLoading] = useState(true)
  const [description1, setDescription1] = useState('')
  const [letter, setLetter] = useState('')
  const [first, setFirst] = useState('')
  const [code, setCode] = useState('')
  const [coins, setCoins] = useState(0)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [pop, setPop] = useState({})
  const [fullBooking, setFullBooking] = useState({})
  const [status, setStatus] = useState('')
  const [lastStatement, setLast] = useState('')
  const [bookingList, setBookingList] = useState([]);
  const [bookingList1, setBookingList1] = useState([]);
  const [activePayout, setActivePayout] = useState(false);
  const [showPayout, setShowPayout] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [coinsToTransfer, setCoinsToTransfer] = useState(null);
  const [range1, setRange1] = useState(null);
  const [range2, setRange2] = useState(null);
  const [range3, setRange3] = useState(null);
  const [joined, setJoined] = useState(null);
  const [rentalCount, setRentalCount] = useState(0);
  const [rentalApproval, setRentalApproval] = useState(100);
  const [rentalRate, setRentalRate] = useState(100);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [job, setJob] = useState(null);
  const [borough, setBorough] = useState(null);
  const [listingUser, setListingUser] = useState(null);
  const [dropdown, setDrop] = useState('Select from dropdown')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')




useEffect(() => {

  fetchUser()

}, [])


useEffect(() => {

  if( user && user.user.id.toString() !== id.toString()) {
    
    window.location.href = '/home'
  }

}, [user])

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
        console.log("categories1", data[1].categories.dropdown)
        setCategories(data[1].categories.dropdown)

      } catch(err){
    console.log("Exception ", err)}
  

    }

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


const getPopUser = async (productUser) => {
        const response = await fetch(`${API_URL}/users/${productUser}`, {
          method: 'GET'
        })
        try{
                const data = await response.json();
                setListingUser(data);
                console.log("listingUser", data)
              
            } catch(err){
                
            }         
        }


// useEffect(() => {

//   fetchListings()

// }, [user])



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

// const fetchListings = async (user) => {
//   console.log("gosssss", user)
//     const response = await fetch(`${API_URL}/listings`, {
//        method: 'GET',
//         headers: {
//           'Content-Type':'application/json',
//           // 'Authorization': `Bearer ${user.jwt}`
//         }
//     })
//     try{
//                 const data = await response.json();
                
//                 // setDescription1(data.description)
//                 setLoading(false);
//                 console.log("sideeeee", data)
//                 if(data !== null){
//                   setPost2(data);
          
//                 } else {
//                   console.log("else", user)
               

//                 }
//                 // history.push(`/profile/${id}`)
//             } catch(err){
//               console.log("nope")
//                 setPost2({}); 
//                 setLoading(false);
//             }         
//         }


useEffect(() => {

  fetchBookings()

}, [user])

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);


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
                console.log("sidYYYYY1", parseInt(data[0].listing.userID))

                let counter = 0;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].status === 'Complete' && data[i].listing.userID === id) counter++;
                }
                setRentalCount(counter)
                console.log("OCCUR", counter);

                let counterTotal = 0;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].listing.userID === id) counterTotal++;
                }
                if(counterTotal !== 0) {
                  setRentalApproval((counter/counterTotal)/100)
                }

                 let counterPending = 0;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].listing.userID === id) counterPending++;
                }
                if(counterTotal !== 0) {
                  setRentalRate(((counterTotal-counterPending)/counterTotal)/100)
                }
                console.log("OCCUR", counter);


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
    if (booking.status === "Confirmed" && `${booking?.renter?.id}` === id) {
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
    if (booking.status === "Rejected" && `${booking?.renter?.id}` === id) {
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

try{

  const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${user.jwt}`
    },
    body: JSON.stringify({
      bio: description1,
      name,
      surname,
      borough,
      occupation:job,
      category:dropdown
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
    setOpen4(false)

  } catch(err){
    }

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

console.log("post3", post3)


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

    const showingTrans = () => {
    setShowTransactions(true)
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


const createTransaction2 = async () => {
  const data = {
      amount: Math.round(parseInt(coinsToTransfer)),
      InOrOut: "Outgoing",
      type:"Payout",
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
    console.log("clearCoins", coins)
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
           setCoins(confirm.coins)
           console.log("setCoin", coins)
           console.log("confirm", confirm)
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
          createTransaction2()
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
  console.log("join", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  setJoined(joined2.toLocaleDateString('en-EN', options))

}

const changeStartDate = (data) => {
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  setStart(joined2.toLocaleDateString('en-EN', options))

}

const changeEndDate = (data) => {
  console.log("start", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  setEnd(joined2.toLocaleDateString('en-EN', options))

}

const chageDate = (data) => {
  console.log("start", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const joined2 = new Date(joined1)
  return(joined2.toLocaleDateString('en-EN', options))

}

const chageDate1 = (data) => {
  console.log("start", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate())
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const joined2 = new Date(joined1)
  return(joined2.toLocaleDateString('en-EN', options))

}

// console.log("start", start)


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
          <h2 
          className={create === 'darkbg' ? "items-start text-white" : "items-start"}
            >Your R.E.N Credits</h2>
          <div className="flex mt-12">

            <div>
              <div className="flex items-center ">
                <div className="coin mr-2">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <h3
                  className={create === 'darkbg' ? "text-white" : ""}
                >{coins}</h3>
                {user && user.user.id.toString() === id.toString() &&
                <div 
                className={create === 'darkbg' ? "flex flex-col text-white" : "flex flex-col"}
                >
                  <Link to='/topup' style={{"padding": "0.3rem"}} className="cursor-pointer authBtn ml-10 mb-1">
                    Top up
                  </Link>
                  {/*<button onClick={confirmPayout} className=" cursor-pointer authBtn ml-10 mt-1">
                    Payouts 
                  </button>*/}
{/*                  <button onClick={clearCoins} className="authBtn ml-10 mt-1 onClick">
                    OUTTTT
                  </button>*/}
                </div>
              }
       
              </div>

{/*              <div className="flex mt-4">
                <div className="genBold">75</div>
                <div className="gen ml-2">earned in the past 30 days</div>
              </div>
              <div className="flex">
                <div className="genBold">30</div>
                <div className="gen ml-2">spent in the past 30 days</div>
              </div>*/}
        {bookingList.length > 0 
          ?
              <div className="flex mt-4">
                <div className="genBold orangeCol">{bookingList.length}</div>
                <div 
                className={create === 'darkbg' ? "text-white gen ml-2" : "gen ml-2"}
                > rental booking(s) have been confirmed</div>
              </div>
          : null
        }
        {bookingList1.length > 0 
          ?
              <div className="flex">
                <div className="genBold orangeCol">{bookingList.length}</div>
                <div 
                  className={create === 'darkbg' ? "text-white gen ml-2" : "gen ml-2"}
                > rental booking(s) have been rejected</div>
              </div>
          : null
        }

{/*      {user && user.user.id.toString() === id.toString() &&
        <div>
          <button onClick={showingTrans} className="orangeCol my-3 text-white block mt-4  cursor-pointer">
                  See your transactions 
          </button>
        </div>
      }*/}
      {showTransactions &&
          <Transactions />
        }

      {user && user.user.id.toString() === id.toString() &&
        <div>
     {/*   {activePayout &&
          <button onClick={showingPayout} className="orangeCol my-3 text-white block mt-4 underline cursor-pointer">
                  Set up your payment information
          </button>
        }*/}
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
            <div 
              className={create === 'darkbg' 
                ? "text-white darkbg inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" 
                : "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
              }
              style={{"width": "44em", "height": "17em"}}
            >
              <div style={{"width":"620px"}} className="mx-auto flex justify-center flex-col">
     
            <div>
              <div className="h3Bold mt-12 text-center">
              Payouts
              </div>
              <div className="genLight mt-4 text-center">
                Would you like to convert your credits to cash and payout or go to payout dashboard
              </div>
      

              <div className="flex mt-8 mx-12">
                <div 
                  className="orangeBg orangeBtn bulkTxt text-white cursor-pointer block mt-4 text-center pt-1"
                  onClick={()=> {
                    setOpen3(false)
                    setOpen5(true)
                  }}
                >
                  Payout
                </div>
                <div 
                  className={create === 'darkbg' ? "sendBtnDrk cursor-pointer bulkTxt block mt-4 text-center pt-1 ml-auto" : "sendBtn bulkTxt block mt-4 text-center pt-1 ml-auto"}
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

    <Transition.Root show={open5} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed z-10 inset-0 overflow-y-auto" 
        onClose={()=> {
          setOpen5(false)
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
            <div 
              className={create === 'darkbg' 
                ? "text-white darkbg inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" 
                : "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
              }
              style={{"width": "44em", "height": "17em"}}
            >
              <div style={{"width":"620px"}} className="mx-auto flex justify-center flex-col">
     
            <div>
              <div className="h3Bold mt-12 text-center">
              Payout Confirmation
              </div>
              <div className="genLight mt-4 text-center">
                You will be paid £{(Math.round(parseInt(coins) * 20 )/100).toFixed(2)}
              </div>
      

              <div className="flex mt-8 mx-12">
                <div 
                  className="orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1 cursor-pointer"
                  onClick={()=> {
                      setOpen5(false)
                      clearCoins()
                      setOpen6(true)}}
                >
                  Confirm Payout
                </div>
                <div 
                  className={create === 'darkbg' ? "sendBtnDrk bulkTxt block mt-4 text-center cursor-pointer pt-1 ml-auto" : "sendBtn cursor-pointer bulkTxt block mt-4 text-center pt-1 ml-auto"}
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

     <Transition.Root show={open6} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed z-10 inset-0 overflow-y-auto" 
        onClose={()=> {
          setOpen6(false)
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
            <div 
              className={create === 'darkbg' 
                ? "text-white darkbg inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" 
                : "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
              }
              style={{"width": "44em", "height": "17em"}}
            >
              <div style={{"width":"620px"}} className="mx-auto flex justify-center flex-col">
     
            <div>
              <div className="h3Bold mt-12 text-center">
              Payout Confirmed
              </div>
              <div className="genLight mt-4 text-center">
                You can go to your dashboard to manage the payout or click out to continue
      

              <div className="flex mt-8 mx-12">
               
                <div 
                  className={create === 'darkbg' ? "sendBtnDrk bulkTxt cursor-pointer block mt-4 text-center pt-1 mx-auto" : "sendBtn cursor-pointer bulkTxt block mt-4 text-center pt-1 mx-auto"}
                  onClick={goToDashboard}
                >
                 Dashboard
                </div>
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
  <div 
  className={create === 'darkbg' ? "text-white leftCol" : "leftCol"}>
  <div 
    className={create === 'darkbg' ? "text-white flex items-center" : "flex items-center"}
  >
    <h2 className="flex">
      <div className="capitalize">{first}.</div>
      <div className="capitalize">{letter}</div>
    </h2>


    {user && user.user.id.toString() === id.toString() 
      ?
      <button 
            onClick={() => {
              setOpen4(true)
              setBorough(simpleUser.borough)
              setJob(simpleUser.occupation)
              setCategory(simpleUser.category)
              setDrop(simpleUser.category)
              setName(simpleUser.name)
              setSurname(simpleUser.surname)
            }} 
            className={create === 'darkbg' ? "editBtnDrk bulkTxt ml-8 text-center" : "editBtn bulkTxt ml-8 text-center"}
          >
            Edit bio
          </button>
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
   
      <div className="mt-4 mr-4">
    {description1}
      </div>
                 
  {joined &&
    <div className="gen greyCol mb-7">
      Joined {joined}

    </div>
  }
{/*    {user && user.user.id.toString() === id.toString() &&
      <div className="orangeCol my-3 text-white block mt-4 underline cursor-pointer" onClick={() => setOpen2(true)}
      >
      Select availability
      </div>
    }*/}

  {/*  <div className="flex my-3 items-center">
      <h3>{rentalApproval}%</h3>
      <div className="gen">&nbsp;Rentals approved</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>{rentalRate}%</h3>
      <div className="gen">&nbsp;Response rate</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>{rentalCount}</h3>
      <div className="gen">&nbsp;Rentals</div>
    </div>*/}
    <div className="lineA mt-8"></div>


  </div>



  <div className="rightCol ml-12">

      <div
      className="mt-5 w-100">
        <div className="mr-3 w-full " >
           <div className={create === 'darkbg' ? "h3Bold borderbot border-white py-2 text-white" : "h3Bold borderbot border-black py-2"}>
           Rented
           </div>
{/*        { post2 && post2[0]
  ?   
           <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

         


 
           {post2.map((listing, i) => {
            if(listing.userID === id)
                     
                        return(
                  <div 
                  className={create === 'darkbg' ? "flex flex-col overflow-hidden thumbImgBxDrk text-white" : "flex flex-col overflow-hidden thumbImgBx"}
                  >
                    <div className="flex-shrink-0 relative flex justify-content mx-auto thumbImg">
                      <img className="object-cover rounded-3xl lg:rounded-2xl mx-auto" src={listing.image && listing.image.url} alt="playstation" />
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

                        <div className="gen pt-9">{chageDate(listing.created_at)}</div>
                    </div>
                  </div>
                  )})}
            </div>
        : null}
*/}


         <div className={create === 'darkbg' ? "mt-3 text-white" : "mt-3"}>

              { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

               
                
        

                 

                 
               


            </div>
            </>
: null}

       <div
          onClick={() => upSection ? setUp(false) : setUp(true)}
          className="relative"
        >
                    <div className="h3Bold mt-8 mb-4">Upcoming</div>
                    <div className="genLight my-4">View your upcoming rentals</div>
                    <div className="gryLine2 w-full my-10"></div>
                   {upSection &&
                     <ChevronUpIcon className="-mr-1 ml-auto h-10 w-10 absolute top-0 right-10" aria-hidden="true" />
                    }
                   {!upSection &&
                     <ChevronDownIcon className="-mr-1 ml-auto h-10 w-10 absolute top-0 right-10" aria-hidden="true" />
                    }
                </div>
{upSection &&
  <div className="mb-16"> 
      { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

               
             
                  {post3.map((booking, i) => {
                     if (booking.status === "Confirmed" && `${booking?.renter?.id}` === id) {
                        return(
                  <Link to={`/listing/${booking.item_group.id}`}
                    className={create === 'darkbg' ? "flex flex-col overflow-hidden thumbImgBxDrk text-white" : "flex flex-col overflow-hidden thumbImgBx"}
                    onClick={() => {
                        setPop(booking.item_group)
                        changeStartDate(booking.startDate)
                        changeEndDate(booking.endDate)
                        // getPopUser(booking.listing.userID)
                        setFullBooking(booking)
                        console.log("list", booking.listing)
                        // setOpen(true)
                        // setStatus("Complete")
                        // setLast("Congratulations, your order is complete! Your coins will be transferred to your account shortly.")
                      }}>
                    <div className="flex-shrink-0 relative flex justify-content mx-auto thumbImg">
                      <img className="object-contain rounded-3xl lg:rounded-2xl mx-auto" src={booking.item_group.mainImage && booking.item_group.mainImage.url}  alt="playstation" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.item_group.coins}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.item_group.name}</div>
                        </div>
                        <div className="flex flex-col item-center">
                          <div className="gen pt-9">{chageDate1(booking.startDate)},</div>
                          <div className="gen">{chageDate1(booking.endDate)}</div>
                        </div>
                    </div>
                  </Link>
                  )}})}

                 

                 
                  
               
{/*xxxxxxxx
*/}
            </div>
            </>
: null}

 </div>
 }

   <div
          onClick={() => allSection ? setAll(false) : setAll(true)}
          className="relative"
    >
                    <div className="h3Bold mt-8 mb-4">All rented bookings</div>
                    <div className="genLight my-4">View your previous rentals</div>
                    <div className="gryLine2 w-full my-10"></div>
                    {allSection &&
                     <ChevronUpIcon className="-mr-1 ml-auto h-10 w-10 absolute top-0 right-10" aria-hidden="true" />
                    }
                   {!allSection &&
                     <ChevronDownIcon className="-mr-1 ml-auto h-10 w-10 absolute top-0 right-10" aria-hidden="true" />
                    }
                </div>
{allSection &&
  <div className="mb-16">
      { post3 && post3[0]
              ?<>
                  <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">

               
                
                  {post3.map((booking, i) => {
                     if (booking.status === "Complete" && `${booking?.renter?.id}` === id) {
                        return(
                   <Link to={`/listing/${booking.item_group.id}`} 
                    className={create === 'darkbg' ? "flex flex-col overflow-hidden thumbImgBxDrk text-white" : "flex flex-col overflow-hidden thumbImgBx"}
                    onClick={() => {
                        setPop(booking.item_group)
                        changeStartDate(booking.startDate)
                        changeEndDate(booking.endDate)
                        // getPopUser(booking.listing.userID)
                        setFullBooking(booking)
                        console.log("list", booking.listing)
                        // setOpen(true)
                        // setStatus("Complete")
                        // setLast("Congratulations, your order is complete! Your coins will be transferred to your account shortly.")
                      }}>
                    <div className="flex-shrink-0 relative flex justify-content mx-auto thumbImg">
                      <img className="object-contain rounded-3xl lg:rounded-2xl mx-auto" src={booking.item_group.mainImage && booking.item_group.mainImage.url}  alt="booking" />
                    </div>
                    <div className="flex flex-row px-8">

                        <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                            <div className="flex items-center ">
                              <h3>{booking.item_group.coins}</h3>
                              <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                                <img className='w-100' alt='REN coin' src="../coin.png" />
                              </div>
                              <h3>/day</h3>
                            </div>
                            <div className="line mt-1 mb-3"></div>
                            <div className="gen">{booking.item_group.name}</div>
                            <div className="orangeCol pt-2">{booking.status}</div>
                        </div>

                       <div className="flex flex-col item-center">
                          <div className="gen pt-9">{chageDate1(booking.startDate)},</div>
                          <div className="gen">{chageDate1(booking.endDate)}</div>
                        </div>

                    </div>

                  </Link>
                  )}})}

                 

                     </div>
            </>
      : null} 
    
  </div>
  }
       
                  
               
{/*xxxxxxxx
*/}


               </div>
           




         </div>



     
         
     
      </div>
  </div>


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
                    {pop.description}
                  </div>
                  {/*{listingUser &&*/}
                  <div className="genLight mt-6">
{/*                    From {listingUser.name}
*/}                    From ???
                  </div>
                {/*}*/}
                  <div className="genLight mt-6">
                    The location will be confirmed and agreed upon confirmation.
                  </div>

                </div>
                
                <div className="flex-col flex w-3/12 justify-center items-center">
                   <div className="w-full flex ">
                      <img className="w-full" src={pop.image1.url} alt="eqiupment" />
                    </div>
                </div>
              </div>
              <div className="gryLine2 w-full my-10"></div>
{/*            {fullBooking &&
              <div className="flex items-center ">
                <h3>{pop.coins}</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <div className="genLight">x {fullBooking.rentalDays} days</div>
                <div className="genBold">&nbsp;({start} - {end})</div>
              </div>
            }*/}
{/*            {fullBooking &&
              <div className="flex items-center mt-4">
                <div className="genBold">Total:&nbsp;</div>
                <h3>{fullBooking.coins}</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
              </div>
            }*/}
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
          
               {listingUser && <a className="sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto" href={`mailto:${listingUser.email}`} target="_blank" rel="noopener noreferrer" > Contact Now</a>
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



    <Transition.Root show={open4} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen4}>
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
              style={{"width": "44em", "height": "45em"}}
            >
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Update your profile</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{/*              <div className="h3Sub my-4 ">Canon EOS M50 Black + EF-M 15-45mm IS STM Lens Black</div>
*/}              
               
       
    <div 
      className={create === 'darkbg' ? "darkbg text-white shareBox mx-auto" : "shareBox mx-auto"}
    >
      
      <div className="flex flex-row item-center">
      <div className ='flex flex-col'>
        <div className="genBold w-40">First Name</div>
       <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="First Name"
          className={create === 'darkbg' ? "text-white profileBoxDrk pl-4" : "profileBox pl-4"}
        />
         </div>

      <div className ='flex flex-col'>
        <div className="genBold ml-1 w-40 ">Last Name</div>
      <input
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          placeholder="Last Name"
          className={create === 'darkbg' ? "text-white profileBoxDrk pl-4 ml-1" : "profileBox pl-4 ml-1"}
        />
        </div>
      </div>

      <div className ='flex flex-col'>
        <div className="genBold w-40 mt-4">Bio</div>
{/*       <input
          value={description1}
          onChange={(event) => setDescription1(event.target.value)}
          placeholder="Enter user unqiue code"
          className="uniqueBox pl-4"
        />*/}
        <textarea
          value={description1}
          onChange={(event) => setDescription1(event.target.value)}
          placeholder="Enter user unqiue code"
          // className="uniqueBox pl-4"
          name="Description"
          id="description"
          className={create === 'darkbg' ? "uniqueDescDrk pl-4" : "uniqueDesc pl-4"}
          maxlength='240'
          onChange={(event) => setDescription1(event.target.value)}
        >
        </textarea>
        </div>

        <div className="genBold w-40 mt-4">Category</div>
        <div className="flex flex-col">
                    <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button 
                      className={create === 'darkbg' 
                                  ? "text-white uniqueBoxDrk genLight uniqueBox inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
                                  : "genLight uniqueBox inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"}
                      >
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
                                    // setCatError(false)
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
{/*                {catError &&
                            <div className="mt-3 genBold text-red-600"> Please select a category </div> 
                          }*/}
                         </div>

      <div className ='flex flex-col'>
        <div className="genBold w-40 mt-4">Your Job</div>
      <input
          value={job}
          placeholder="Occupation"
          className={create === 'darkbg' ? "text-white uniqueBoxDrk pl-4" : "uniqueBox pl-4"}
          onChange={(event) => {
            setJob(event.target.value)}}
        />
        </div>

      <div className ='flex flex-col'>
        <div className="genBold w-40 mt-4">Your Borough</div>
       <input
          value={borough}
          placeholder="e.g Islington"
          className={create === 'darkbg' ? "text-white uniqueBoxDrk pl-4" : "uniqueBox pl-4"}
          onChange={(event) => {
            setBorough(event.target.value)}}
        />
        </div>

      {/*<input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />
       <input
          value={firstName}
          placeholder="Enter user unqiue code"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setFirstName(event.target.value)}}
        />
      <input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />*/}


      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => {
              editBio()
            }}
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </div>
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

export default Profile;




























