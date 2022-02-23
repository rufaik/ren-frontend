import React, {useState, useEffect, useContext} from 'react'
import Post from '../components/Post'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
// import {addToCart} from '../utils/cart'
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';

const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default ({match, history}) =>{
const {id} = match.params
console.log("idd", id)
console.log("match", id)

const {user, setUser} = useContext(UserContext)
const {addToCart} = useContext(CartContext)
console.log("user1", user)
console.log("setUser", setUser)

// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
// 	return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);



const [qty, setQty] = useState(1)
const [post, setPost] = useState({})
const [product, setProduct] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description, setDescription] = useState('')

// const fetchProduct = async () => {
// 		const response = await fetch('http://localhost:1337/products')
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
        const response = await fetch(`http://localhost:1337/listings/${id}`)
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
	const response = await fetch(`http://localhost:1337/products/${id}`, {
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

	const response = await fetch(`http://localhost:1337/products/${id}`, {
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

const makeBooking = async () => {
 try{
     const response = await fetch('http://localhost:1337/bookings', {
         method: 'POST',
         headers: {
             'Authorization': `Bearer ${user.jwt}`,
             'Content-Type':'application/json',
         },
         body: JSON.stringify({
             status: "Pending",
             rentalDays:"5",
             listing: parseInt(product.id)
    
         })
     })
    bookItem() 
 } catch(err){
     console.log("Exception ", err)
 }
}


const bookItem = async () => {

    console.log("bookItem")

    const response = await fetch(`http://localhost:1337/listings/${id}`, {
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

// const handleLike = async () => {
// 	try{
// 		const response = await fetch('http://localhost:1337/likes', {
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
// 		const response = await fetch(`http://localhost:1337/likes/${id}`, {
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
                onClick={makeBooking} 
                >
                Book Now
            </button>
            </div>
{/*            <DateRange
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