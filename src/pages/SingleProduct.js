import React, {useState, useEffect, useContext, Fragment} from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Post from '../components/Post'
import Availability from '../components/Availability'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
import { extendMoment } from "moment-range";
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import {API_URL} from '../utils/urls'
import Footer from '../components/Footer'

// import Moment from "moment";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// // import {DateRangePicker} from ‘react-dates’;




const formatImageUrl = (url) => `${API_URL}${url}`

export default ({match, history}) =>{
const {id} = match.params
console.log("idd", id)
console.log("match", id)

const {user, setUser, simpleUser, setSimpleUser, rangeF, rangeT, create} = useContext(UserContext)
const {addToCart} = useContext(CartContext)
console.log("user1", simpleUser)
console.log("setUser", setUser)
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


const diffDays = Math.round(Math.abs((rangeF - rangeT) / oneDay));

const changeEndDate = (data) => {
  console.log("start", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  // setEnd(joined2.toLocaleDateString('en-EN', options))

}

const chageDate = (data) => {
  console.log("start", data)
  const date = new Date(data)
  const joined1 = date.setDate(date.getDate() - 1)
  const options = { month: 'long', day: 'numeric' };
  const joined2 = new Date(joined1)
  return(joined2.toLocaleDateString('en-EN', options))

}


console.log("rangenF, ranSgeT", diffDays)
console.log("rangenF, ranSgeT1", chageDate(rangeT) )
console.log("rangenF, ranSgeT2", rangeF )


// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
// 	return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

// const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: 'selection'
//     }
//   ]);



const [qty, setQty] = useState(1)
const [post, setPost] = useState({})
const [product, setProduct] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description, setDescription] = useState('')
const [coins, setCoins] = useState('')
const [lowFunds, setLowFunds] = useState(false)
const [open, setOpen] = useState(false)
const [open1, setOpen1] = useState(false)
const [bookings, setBookings] = useState('')
const [blockedDates, setBlockedDates] = useState([])
const [listingUser, setListingUser] = useState([])
const [showButtons, setShowButtons] = useState(true)




// const fetchProduct = async () => {
// 		const response = await fetch('${API_URL}/products')
// 		try{
//                 const data = await response.json();
//                 setProducts(data);
//                 console.log("product data", data)
//                 console.log("productta", products)
//                 // setDescription(data.description)
//                 // setLoading(false);
//             } catch(err){
//                 setProducts({}); 
//                 setLoading(false);
//             }         
//         }




const fetchBookings = async (user) => {
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
                console.log("bookings", data)

                data.map( async (booking, i) => {
                    if ( booking.listing && `${booking.listing.id}` === id && (booking.status === 'Pending' || 'Confirmed')) {
                        let date = new Date(booking.startDate)
                       const first = date.setDate(date.getDate() - 1)

                        let date1 = new Date(booking.endDate)
                       const first1 = date1.setDate(date1.getDate() + 1)

                    const block = {  after: new Date(first), before: new Date(first1)}

                    blockedDates.push(block)
                    console.log("blockedDates", blockedDates)
            
                }})
            
    } catch(err){
              console.log("nope")
            }         
        }

const [setter, setSetter] = useState([])
const [setter1, setSetter1] = useState([])
const [setter2, setSetter2] = useState([])
const [itemId, setItemId] = useState(null)

const checkAvail = async (user) => {
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
                console.log("bookings", data)
                const set1 = []


                data.map( async (booking, i) => {
                    if (booking.listing && booking.listing.item_group === 1) {
                        
                        let StartDate1 = new Date(booking.startDate)
                        let EndDate1 = new Date(booking.endDate)
                        let StartDate2 = new Date(rangeF)
                        let EndDate2 = new Date(rangeT)
                        

                    if((StartDate1 <= EndDate2) && (StartDate2 <= EndDate1)) {
                      setter.push(booking.listing.id)
                    } else {
                    console.log("YESssssSoverlapping dates")  
                    }
            
                } else {
                    console.log("noooo dates")  
                    }
                  })
                console.log("set1", setter)
                const skus = product.listings

                skus.map(async (sku, i) => {
                  if(setter.includes(sku.id)) {
                    setter1.push(sku.id)
                  } else {
                    setter2.push(sku.id)
                  }

                })
                console.log("setter1:", setter1)
                console.log("setter2:", setter2,"length", setter2.length)
                setItemId(setter2[0])
                setOpen(true)
                console.log("itemid:", itemId)
                if(setter2.length <= 0) {
                  setShowButtons(false)
                }

    } catch(err){
              console.log("nope")
            }         
        }

// const StartDate1 = new Date(2017, 11, 24)
// const EndDate1 = new Date(2017, 11, 26)

// const StartDate2 = new Date(2017, 11, 21)
// const EndDate2 = new Date(2017, 11, 25)

// if((StartDate1 <= EndDate2) && (StartDate2 <= EndDate1)) {
//     console.log("YESSoverlapping dates")
// } else {
//   console.log("NOToverlapping dates")
// }

// useEffect(() => {

//   fetchBookings()

// }, [user])



const fetchProduct = async () => {
      console.log("yyyyyyyy777")
        const response = await fetch(`${API_URL}/item-groups/${id}`)
        try{
                const data = await response.json();
                setProduct(data);
                console.log("matchhhhhh", data)
                setLoading(false);
                fetchUser(data.userID)
            } catch(err){
                setLoading(false);
                console.log("yyyyyyyy888")
            }         
        }


const fetchUser = async (productUser) => {
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




const handleDelete = async () => {
	const response = await fetch(`${API_URL}/products/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${user.jwt}`
		},
	})
	const data = await response.json();
	history.push('/')
}

const handleEditSubmit = async (event) => {
	event.preventDefault()
	console.log("handleEditSubmit")

	const response = await fetch(`${API_URL}/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type':'application/json',
			'Authorization': `Bearer ${user.jwt}`
		},
		body: JSON.stringify({
			description
		})
	})
	const data = await response.json();
	fetchProduct()
	console.log("handleEditSubmit data", data)
}

const updateCurrent = async (data) => {
    console.log("simpleUser.coins", simpleUser.coins)
    console.log("product.rental", product.rental)
    const rentalCost = Math.round(parseInt(product.coins) * (diffDays + 1))
    const data1 = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(rentalCost))
    }
    console.log("data1", data1)

    if(parseInt(simpleUser.coins) > parseInt(rentalCost)){
        try{
            const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
              method: 'PUT',
              headers: {
              'Content-Type':'application/json',
              // 'Authorization': `Bearer ${user.jwt}`,
              // 'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify(data1)
            })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
          makeBooking()

        } catch(err){
        console.log("Exception ", err)}
    } else {
        setLowFunds(true)
        setShowButtons(false)
    }

    }




const makeBooking = async () => {
    const rentalCost = Math.round(parseInt(product.coins) * (diffDays + 1))
 try{
     const response = await fetch(`${API_URL}/bookings`, {
         method: 'POST',
         headers: {
             'Authorization': `Bearer ${user.jwt}`,
             'Content-Type':'application/json',
             // 'Access-Control-Allow-Origin':'https://rent-equipment-now.netlify.app'
         },
         body: JSON.stringify({
             status: "Confirmed",
             rentalDays: diffDays + 1,
             listing: parseInt(itemId[0]),
             coins: rentalCost,
             startDate: rangeF,
             endDate:rangeT, 
             item: product

         })
     })
     const data1 = await response.json();
     console.log("data11", data1)
    bookItem()
    createTransaction(data1) 
 } catch(err){
     console.log("Exception ", err)
 }
}




const bookItem = async () => {

    console.log("bookItem")
try {
    const response = await fetch(`${API_URL}/listings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
        },
        body: JSON.stringify({
            booked: true
        })
    })
    const data = await response.json();
    fetchProduct()
    setOpen(false)
    setOpen1(true)
    console.log("handleEditSubmit data", data)
  } catch(err){
     console.log("Exception ", err)
 }
}


const createTransaction = async (data1) => {
    console.log("data1", data1)
const rentalCost = Math.round(parseInt(product.coins) * (diffDays + 1))
  const data = {
      amount: rentalCost,
      InOrOut: "Outgoing",
      type: "SecureBooking",
      booking: parseInt(data1.id),
      userID: simpleUser.id
    }
  const response = await fetch(`${API_URL}/transactions`, {
       method: 'POST',
          headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(data)
        })
  const newData = await response.json();
  console.log("trans", newData)

}  








// const newBookings =  () => {
//     // pop.bookings.map( async (booking, i) => {
//     //   if(booking.status ==='Pending'){
//     //     const original = booking.id
//     //     console.log("original", original)

//   bookings.map((booking, i) => {
//     if (booking.status === "Confirmed" || "Pending" && `${booking.listing.id}` === id) {
//         const response = await fetch(`${API_URL}/bookings/date`, {
//             method: 'POST',
//             headers: {
//             'Content-Type':'application/json',
//             },
//             body: JSON.stringify({
//                 fromDateSearch:rangeF, toDateSearch, fromDateBooking, toDateBooking , id})
//           })

//           const confirm = await response.json()
//           console.log("con", confirm)

//       let updatedItems = bookingList;
//       updatedItems.push(booking.id);
//       setBookingList(updatedItems);
//       console.log("updatedItems", updatedItems)
//   }
// })}


// const handleLike = async () => {
// 	try{
// 		const response = await fetch('${API_URL}/likes', {
// 			method: 'POST',
// 			headers: {
// 				'Authorization': `Bearer ${user.jwt}`,
// 				'Content-Type':'application/json',
// 			},
// 			body: JSON.stringify({
// 				post: parseInt(id)
// 			})
// 		})
// 		fetchPost()
// 		reloader()
// 	} catch(err){
// 		console.log("Exception ", err)
// 	}
// }

// const handleRemoveLike = async () => {
// 	try{
// 		const response = await fetch(`${API_URL}/likes/${id}`, {
// 			method: 'DELETE',
// 			headers: {
// 				'Authorization': `Bearer ${user.jwt}`
// 			}
// 		})
// 		fetchPost()
// 		reloader()
// 	} catch(err){
// 		console.log("Exception ", err)
// 	}
// }


useEffect(() => {
	
	fetchProduct()
}, [])

console.log("itemidnn:", itemId)


const [state, setState] = useState({
  selection1: {
    startDate: addDays(new Date(), 1),
    endDate: null,
    key: 'selection1'
  },
  selection2: {
    startDate: addDays(new Date(), 4),
    endDate: addDays(new Date(), 8),
    key: 'selection2'
  },
  selection3: {
    startDate: addDays(new Date(), 8),
    endDate: addDays(new Date(), 10),
    key: 'selection3',
    autoFocus: false
  },
  selection4: {
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 12),
    key: 'selection4',
  }
});

<DateRangePicker
  onChange={item => setState({ ...state, ...item })}
  ranges={[state.selection1, state.selection2, state.selection3]}
/>;



  return (
    <div className="SinglePost">
    { product && product.name
    ?
    <div>
    <div className="flex flex-row sectWidth mx-auto pt-16">
        <div className="flex flex-col w-1/2 ">
            <div 
              className={create === 'darkbg' ? "picDrkBg  flex items-center justify-center" : "picBg flex items-center justify-center "}
            >
              <div className="flex justify-center items-center w-5/6 h-5/6 mx-auto imgBx1 p-2 object-cover">
                <img className=' h-full object-cover' alt='camera' src={product.mainImage && product.mainImage.url} />
              </div>
            </div>
            <div>
          
            <div
              className={create === 'darkbg' ? "text-white h3Bold mt-8 mb-8" : "h3Bold mt-8 mb-8"}
            >Check Availability</div>
            </div>
            

            <Availability 
              show={true} 
              noShow={blockedDates} 
              color={create === 'darkbg' ? "white " : "#495461"}
              monthColor={create === 'darkbg' ? "white " : "#0B1A2C"}
              
            />

{/*            <DateRangePicker
  onChange={item => setState({ ...state, ...item })}
  ranges={[state.selection1, state.selection2, state.selection3]}
/>;*/}

 {/*          <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
  months={2}
  direction="horizontal"
  rangeColors="red"
  className="h3Bold"
/>*/}
 {/*           <DateRangePicker
              onChange={item => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
                />;*/}
              <div>
            <button
                className="orangeBg text-white h3Dark py-3 px-8 rounded-full"
                onClick={checkAvail} 
                >
                Book Now
            </button>
            </div>


        </div>
        <div 
          className={create === 'darkbg' ? "text-white flex flex-col w-1/2" : "flex flex-col w-1/2"}
        >
            <h2>{product.name}</h2>
            <div className="flex items-center mt-8">
                <div className="h3Bold">{product.coins}</div>
                <div className="smallCoin flex mb-1 ml-0.5 mr-0">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <h3>/day</h3>
            </div>
            <div className="genLight mt-8">
                {product.description}
            </div>
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold ">Product Features</div>
            <div className="genLight mt-6 list-disc pl-6">
           
                  {product.feature1 && product.feature1.length > 0 ? <li>{product.feature1}</li> : null}
                  {product.feature2 && product.feature2.length > 0 ? <li>{product.feature2}</li> : null }
                  {product.feature3 && product.feature3.length > 0 ? <li>{product.feature3}</li> : null }
            
            </div>
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold ">Retail Price : </div>
            <a 
              className=""
              className={create === 'darkbg' ? "sendBtnDrk bulkTxt block mt-4 text-center pt-1" : "sendBtn bulkTxt block mt-4 text-center pt-1"}
              href="/" 
              target="_blank" 
              rel="noopener noreferrer" > BUY NOW</a>
            <a className="genLight mt-8">
             Purchase this product today and get 10% off!
                
            </a>
            <a className="genLight  mt-8">
            This product is not currently available for purchase but you can still rent it out today!
                
            </a>
            

           
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold">Brand : </div>
            <div className="genLight mt-8">
                This item is located within this range but is subject to change when booked with the original owner. The location will be confirmed and agreed upon confirmation.            </div>
        </div>
    </div>


{/*    {!products &&


    	<h1>yooooo</h1>
    }
*/}
{/*    {products.length > 0 &&
    		
    	<>
    	{products.map((product, i) => {
        if (product.slug === id) {
          return (
            <div>
                <Post 
              description={product.description}
              likes={product.price_in_cent}
              url={product.thumbnail && product.thumbnail.url}
            />
            <input 
                type='number' 
                value={qty}
                onChange={(event) => setQty(event.target.value)} 
            />
            <button
            onClick={() => {
                console.log("product", product)
                addToCart(product, qty)}}
            >Add To Cart</button>
            </div>

        )}})}
 		</>
 	}*/}

}




    	
    </div>
    : null}

{product && product.name &&  
<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" 
      onClose={() => {
        setOpen(false)
        window.location.reload()
      }}
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

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "44em"}}>
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Review Item Rental</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{/*              <div className="h3Sub my-4 ">Canon EOS M50 Black + EF-M 15-45mm IS STM Lens Black</div>
*/}              <div className="h3Sub my-4 ">{product.name}</div>
              <div className="flex flex-row">
                <div className="flex-col flex w-9/12">
                  <div className="genLight mt-6">
                    {product.description}
                  </div>
                  {listingUser &&
                  <div className="genLight mt-6">
                    From {listingUser.name}
                  </div>
                }
                  <div className="genLight mt-6">
                    The location will be confirmed and agreed upon confirmation.
                  </div>

                </div>
                
                <div className="flex-col flex w-3/12 justify-center items-center">
                   <div className="w-full flex ">
                      <img className="w-full" src={product.mainImage.url} alt="eqiupment" />
                    </div>
                </div>
              </div>
              <div className="gryLine2 w-full my-10"></div>
           
              <div className="flex items-center ">
                <h3>{product.coins}</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <div className="genLight">x {diffDays + 1} days</div>
                <div className="genBold">&nbsp;({chageDate(rangeF)} - {chageDate(rangeT)})</div>
              </div>

              
              <div className="flex items-center mt-4">
                <div className="genBold">Total:&nbsp;</div>
                <h3>{Math.round(parseInt(product.coins) * (diffDays + 1))}</h3>
                <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
              </div>
               { itemId === null || itemId === undefined ?
                <div className="normalBold mt-7 mb-3">Unfortunately this item is not available on your chosen dates, please pick again</div>
            : null
            }
              {lowFunds ?
                <div className="normalBold mt-7 mb-3">Unfortunately you dont have enough REN credits, please top up</div>
            :
              <div className="gryLine2 w-full mt-10 mb-3"></div>
            }
           
            { showButtons ?
              <div className="flex">
                <div 
                  className="orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1"
                  onClick={updateCurrent}
                >
                 Confirm and Book
                </div>
                <div 
                  className="sendBtn bulkTxt block mt-4 text-center pt-1 ml-auto"
                  onClick={() => setOpen(false)}
                >
                 Edit Booking
                </div>
              </div>
              : null
            }
              </div>
            </div>
          
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
}

<Transition.Root show={open1} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed z-10 inset-0 overflow-y-auto" 
        onClose={()=> {
          setOpen1(false)
          
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
        {/*      <div className="h3Bold mt-12 text-center">
              Congratulations, this item has been submitted to lender for approval you will get a notification once they approve!
              </div>*/}
              <div className="h3Bold mt-12 text-center">
              Congratulations, you have booked this item!
              </div>

    
              <div className="flex flex-col justify-center items-center pt-">
          
               <div 
                className="sendBtn bulkTxt block mt-4 text-center pt-1 mx-auto" 
                onClick={() => window.location.reload()}
                > 
                  Got it
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

    <Footer />
    </div>
  );
}