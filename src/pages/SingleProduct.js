import React, {useState, useEffect, useContext, Component} from 'react'
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

const {user, setUser, simpleUser, setSimpleUser, rangeF, rangeT} = useContext(UserContext)
const {addToCart} = useContext(CartContext)
console.log("user1", simpleUser)
console.log("setUser", setUser)
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


const diffDays = Math.round(Math.abs((rangeF - rangeT) / oneDay));

console.log("rangenF, ranSgeT", diffDays)
console.log("rangenF, ranSgeT1", rangeT - rangeF)
console.log("rangenF, ranSgeT2", rangeF - rangeT)


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
const [bookings, setBookings] = useState('')
const [blockedDates, setBlockedDates] = useState([])


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

const fetchProduct = async () => {
        const response = await fetch(`${API_URL}/listings/${id}`)
        try{
                const data = await response.json();
                setProduct(data);
                console.log("matchhhhhh", data)
                setLoading(false);
            } catch(err){
                setLoading(false);
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
    const rentalCost = Math.round(parseInt(product.rental) * (diffDays + 1))
    const data1 = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(rentalCost))
    }

    if(parseInt(simpleUser.coins) > parseInt(rentalCost)){
        try{
            const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
              method: 'PUT',
              headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${user.jwt}`,
              'Access-Control-Allow-Origin': '*'
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
    }

    }




const makeBooking = async () => {
    const rentalCost = Math.round(parseInt(product.rental) * (diffDays + 1))
 try{
     const response = await fetch(`${API_URL}/bookings`, {
         method: 'POST',
         headers: {
             'Authorization': `Bearer ${user.jwt}`,
             'Content-Type':'application/json',
             'Access-Control-Allow-Origin':'https://rent-equipment-now.netlify.app'
         },
         body: JSON.stringify({
             status: "Pending",
             rentalDays: diffDays + 1,
             listing: parseInt(product.id),
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


useEffect(() => {

  fetchBookings()

}, [user])


const createTransaction = async (data1) => {
    console.log("data1", data1)
const rentalCost = Math.round(parseInt(product.rental) * (diffDays + 1))
  const data = {
      amount: rentalCost,
      InOrOut: "Outgoing",
      type:"SecureBooking",
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


}  

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






const bookItem = async () => {

    console.log("bookItem")

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
    console.log("handleEditSubmit data", data)
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
            <div className="picBg items-center justify-center">
                <img className='w-full' alt='camera' src={formatImageUrl(product.image && product.image.url)} />
            </div>
            <div>
            <button
                className="orangeBg text-white h3Dark py-3 px-8 rounded-full"
                onClick={updateCurrent} 
                >
                Book Now
            </button>
            </div>
            {lowFunds &&
                <div className="normalBold mt-3">Unfortunately you dont have enough REN coins, please top up</div>
            } 

            <Availability show={true} noShow={blockedDates}/>

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
        </div>
        <div className="flex flex-col w-1/2">
            <h2>{product.name}</h2>
            <div className="flex items-center mt-8">
                <div className="h3Bold">{product.rental}</div>
                <div className="smallCoin flex mb-1 ml-0.5 mr-0">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <h3>/day</h3>
            </div>
            <div className="genLight mt-8">
                A modern classic, this 4K mirrorless camera is packed with innovative technologies with an EF-M 15-45mm lens
            </div>
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold ">Product Features</div>
            <div>
                <ul className="genLight mt-6 list-disc pl-6">
                   <li> Intuitive mirrorless with DSLR modern technology and EF-M 15-45mm lens</li> 
                    <li> 24.1 MP, APS-C sensor, 10 fps</li> 
                    <li> 4K, Wi-Fi, Bluetooth</li> 
                </ul>
            </div>
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold ">Rent from Jasmine</div>
            <div className="genLight mt-8">
                London based creative. Graphic artist by day, photographer by night. I also love trying out the latest tech.
            </div>
            <button 
                  className="sendBtn bulkTxt block mt-4 text-center pt-1"
                >
                Message Jasmine
            </button>
            <div className="gryLine2 w-full my-10"></div>
            <div className="h3Bold">Collection Location : Hackney</div>
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
    	
    </div>
    : null}
    </div>
  );
}