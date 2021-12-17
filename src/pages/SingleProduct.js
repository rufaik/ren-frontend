import React, {useState, useEffect, useContext} from 'react'
import Post from '../components/Post'

import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
// import {addToCart} from '../utils/cart'

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

const [qty, setQty] = useState(1)
const [post, setPost] = useState({})
const [products, setProducts] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description, setDescription] = useState('')

const fetchProduct = async () => {
		const response = await fetch('http://localhost:1337/products')
		try{
                const data = await response.json();
                setProducts(data);
                console.log("product data", data)
                console.log("productta", products)
                // setDescription(data.description)
                // setLoading(false);
            } catch(err){
                setProducts({}); 
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

    {!products &&


    	<h1>yooooo</h1>
    }

    {products.length > 0 &&
    		
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
 	}
    	
    </div>
  );
}