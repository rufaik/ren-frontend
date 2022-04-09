import React, {useState, useEffect, useCallback, useContext, Fragment} from 'react'
import {
	cartSubTotal,
	cartCoinTotal, 
	cartTotal, 
	shouldPayShipping, 
	SHIPPING_RATE
} from '../utils/cart'
import {formatPrice} from '../utils/format'
import {API_URL} from '../utils/urls'
import Checkout from '../components/Checkout'
import {CartContext} from '../context/CartContext'
import {UserContext} from '../context/UserContext'
import { Dialog, Transition } from '@headlessui/react'




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
 	const [open, setOpen] = useState(true)
 	const [showCart, setShowCart] = useState(true)


	return (
		<div className="Create">
			

		   <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => window.location.href = `/profile/${user.user.id}`}>
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
        
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "45em"}}>
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Your Basket</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{showCart 
        	?<>
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
			   {cart.map((cartItem) =>{
			   	if(cartItem.promotion === false) {
			   		return(

			   	<tr>
			   		<td className="flex flex-row items-center">
					   	<img className="PostImage" src={cartItem.thumbnail.url} />
						<span className="normalBold ml-2"> R.E.N Coins</span>
					</td>
					<td className="genLight">
						{formatPrice(cartItem.price_in_cent)}
					</td>	
					<td className="pl-8">
					<div className="flex flex-row items-center genLight">
						<div 
							className="orangeCol"
							onClick={() => {
								addToCart(cartItem, -1)
								forceUpdate()	
						}}> - </div><div className="w-10 text-center">
						{cartItem.qty}
						</div>
						<div 
							className="orangeCol"
							onClick={() => { 
								addToCart(cartItem, 1)
								forceUpdate()

						}}> + </div>
					</div>
					</td>	
			   	</tr>
			   )}
			   		else {
			   			return(

			   	<tr>
			   		<td className="flex flex-row items-center">

					   	<img className="PostImage" src={cartItem.thumbnail.url} />
						<span className="normalBold ml-2">{cartItem.name} R.E.N Offer</span>
					</td>
					<td className="genLight">
						{formatPrice(cartItem.price_in_cent)}
					</td>	
					<td className="pl-8">
					<div className="flex flex-row items-center genLight">
						<div 
							className="orangeCol"
							onClick={() => {
								addToCart(cartItem, -1)
								forceUpdate()
						}}> - </div><div className="w-10 text-center">
						{cartItem.qty}
						</div>
						<div 
							className="orangeCol"
							onClick={() => { 
								addToCart(cartItem, 1)
								forceUpdate()

						}}> + </div>
					</div>
					</td>	
			   	</tr>
			   )
			   		}
			   	})}
			   	
			   </tbody>
        

{/*
			   <tbody>
			  

			   	<tr>
			   		<td className="flex flex-row items-center">
					   	<div className="genLight">Coins</div>
					</td>

					<td>
						
					</td>	

					<td className="pl-8">
					   	<div className="genBold">{cartCoinTotal(cart)}</div>
					</td>	
			   	</tr>
			   	<tr>
			   		<td className="flex flex-row items-center">
					   	<div className="genLight">Total</div>
					</td>

					<td>
						
					</td>	

					<td className="pl-8">
					   	<div className="genBold">{formatPrice(cartSubTotal(cart))}</div>
					</td>	
			   	</tr>
			   	
			   </tbody>*/}


		   </table>

           

              <div className=" flex flex-row items-baseline">
              	<div className="genBold orangeCol w-28 mt-4">R.E.N Coins:</div>
              	<div className="genBold">{cartCoinTotal(cart)}</div>
              </div>
              <div className=" flex flex-row items-baseline mt-4">
              	<div className="genBold orangeCol w-28">Total to pay:</div>
              	<div className="genBold">{formatPrice(cartSubTotal(cart))}</div>
              </div>
          

              <div 
                  className="orangeBg text-white normalBold text-center w-fit rounded-full py-2 px-12 mt-8"
                  style={{"width":"fit-content"}}
                  onClick={() => {
                    setShowCheckout(true)
                    setShowCart(false)
                }}
                >
                Checkout
              </div>
          

{/*              <h3>Coin Total: {cartCoinTotal(cart)}</h3>
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
		   }*/}
            
         </>
              : null }  

             {showCheckout &&
		   	<Checkout cart={cart}/>
		   }  

              </div>
            </div>

   
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

		</div>
	);
}