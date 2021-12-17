import React, {useState, useEffect, useCallback, useContext} from 'react'
import {
	cartSubTotal, 
	cartTotal, 
	shouldPayShipping, 
	SHIPPING_RATE
} from '../utils/cart'
import {formatPrice} from '../utils/format'
import Checkout from '../components/Checkout'
import {CartContext} from '../context/CartContext'
import {UserContext} from '../context/UserContext'



const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default () =>{


  const {user, setUser} = useContext(UserContext)

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), [])
	const[showCheckout, setShowCheckout] = useState(false)
	const {cart, addToCart} = useContext(CartContext)
	console.log("context cart", cart)
	console.log("context addToCart", addToCart)
	console.log("context user", user)


	return (
		<div className="Create">
			<h2> Cart </h2>
			<table>
				<thead>
					<tr>
						<th>
							Product
						</th>
						<th>
							Price
						</th>
						<th>
							Quanity
						</th>
					</tr>
				</thead>
				<tbody>
			   {cart.map(cartItem => (
			   	<tr>
			   		<td>
					   	<img className="PostImage" src={formatImageUrl(cartItem.thumbnail.url)} />
						<span>{cartItem.name}</span>
					</td>
					<td>
						{cartItem.price_in_cent}
					</td>	
					<td>
						<span onClick={() => {
							addToCart(cartItem, -1)
							forceUpdate()
						}}> - </span>
						{cartItem.qty}
						<span onClick={() => { 
							addToCart(cartItem, 1)
							forceUpdate()

						}}> + </span>
					</td>	
			   	</tr>
			   	))}
			   </tbody>
		   </table>
		   <h3>Subtotal: {formatPrice(cartSubTotal(cart))}</h3>
		   {shouldPayShipping(cart) && 
		   	<h3>Shipping:{formatPrice(SHIPPING_RATE)} </h3>
		   }
		   {!shouldPayShipping(cart) && 
		   	<h3>Shipping is free! </h3>
		   }


		   <h3>Total: {formatPrice(cartTotal(cart))}</h3>
		   <div>
		   {cart && cart.length > 0 &&
			   	<button onClick={() => setShowCheckout(true)}>
			   		Initiate Checkout
			   	</button>
		   }
		   </div>
		   {showCheckout &&
		   	<Checkout cart={cart}/>
		   }
		</div>
	);
}