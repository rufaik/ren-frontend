import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {CartContext} from '../context/CartContext'
import {UserContext} from '../context/UserContext'
import {
  cartCoinTotal, 
  cartSubTotal,
  cartTotal 
} from '../utils/cart'
import {formatPrice} from '../utils/format'
import {API_URL} from '../utils/urls'
import { Link} from 'react-router-dom'


const Card_Styles = {
	style: {
		base: {
	
      width: "100%",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      border: "none !important",
      borderRadius: "0.25rem",
      color: "rgba(55, 65, 81, 1)",
      backgroundColor: "red",
      boxShadow: "1px 1px 4px 0px #1b31421c"

		}
	}
}

const generateInput = (label, value, setOnChange) => {
  return(
      <div >
        <div className="genBold w-36" >{label} </div>
        <input 
          id={label}
          value={value}
          className="w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox"
          onChange={(event) => setOnChange(event.target.value)}
          value={value}
        />
      </div>
    )
}

export default () =>{


  const stripe = useStripe();
  const elements = useElements();
  const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)

  const {cart, clearCart} = useContext(CartContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [total, setTotal] = useState('loading');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [shipping_name, setShipping_name] = useState('');
  const [shipping_address, setShipping_address] = useState('');
  const [shipping_county, setShipping_county] = useState('');
  const [shipping_country, setShipping_country] = useState('');
  const [shipping_city, setShipping_city] = useState('');
  const [shipping_postcode, setShipping_postcode] = useState('');
  
  const [coins, setCoins] = useState(null);

  console.log("money", cartCoinTotal(cart))


  const Card_Styles = {
  style: {
    base: {
      color: "#32325d",
      height: "38px",
      width: "359px",
      borderRadius: "10px",
      border: "0.5px solid #BBBFC5",
      boxShadow: "1px 1px 4px 0px #1b31421c",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

  const valid = () => {
    if(!shipping_name || !shipping_address || !shipping_county || !shipping_country || !shipping_postcode){
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
  	event.preventDefault();
	setLoading(true)
  	console.log("handleSubmit", event)
  	const result = await stripe.confirmCardPayment(token,{
  		payment_method:{
  			card: elements.getElement(CardElement)
  		}
  		
  	})

    const data = {
      paymentIntent: result.paymentIntent,
      shipping_name,
      shipping_address,
      shipping_county,
      shipping_country,
      shipping_postcode,
      coins: cartCoinTotal(cart),
      users_permissions_user:user.user.id,
      cart
    }

     try{

          const response = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(data)
        })

          const order = await response.json()

          setSuccess(true)

          setCoins(Math.round(parseInt(user.user.coins) + parseInt(order.coins)))

          setLoading(false)

          topUpCoins(order)

          clearCart()

          createTransaction(order)



    console.log("handleSubmit result", result)
    console.log("handleSubmit order", order)
    
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();

    } catch(err){
      setSuccess(false)
              console.log("nope")
            }  
}


const createTransaction = async (order) => {
  const data = {
      amount: (Math.round(parseInt(order.coins))),
      InOrOut: "Ingoing",
      type:"TopUp",
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

  const topUpCoins = async (order) => {
    console.log("coins", coins)
    const data = {
      coins: Math.round(parseInt(simpleUser.coins) + parseInt(order.coins))
    }

          const response = await fetch(`${API_URL}/users/${user.user.id}`, {
          method: 'PUT',
          headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(data)
        })

          const confirm = await response.json()
          setSimpleUser(confirm)
          localStorage.setItem('simpleUser', JSON.stringify(confirm))



    console.log(" response", response)
    console.log("confirm", confirm)
    
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();
  }

useEffect(() =>{
	const loadToken = async () => {
    console.log("latch", cart)
		setLoading(true)
		const response = await fetch(`${API_URL}/orders/payment`, {
			method: 'POST',
        	headers: {
        		'Content-Type':'application/json'
	        },          
	        body: JSON.stringify({
	      		cart
      		})
		})

		const data = await response.json()
      	console.log("loadToken data", data) 
      	setToken(data.client_secret)
      	setTotal(data.amount)
      	setLoading(false)
	}

	loadToken()
}, [cart])

console.log("checkout", user)
console.log("coins", coins)
  return (
  	<div>
{!success &&
<div >
  <form class="max-w-xl mx-auto px-10 ">
    <div class="">
      <label class="block text-sm genBold text-gray-600" for="cus_name">Name</label>
      <input
      onChange={(event) => setShipping_name(event.target.value)}
      value={shipping_name} 
      class="w-full px-5 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" 
      className={create === 'darkbg' ? "w-full px-5 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBoxDrk"  : "w-full px-5 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" }
      id="cus_name" name="cus_name" type="text" required="" placeholder="Your Name" aria-label="Name"/>
    </div>
{/*    <div class="mt-2">
      <label class="block text-sm genBold text-gray-600 mt-4" for="cus_email">Email</label>
      <input 
      onChange={(event) => setOnChange(event.target.value)}
      value={value}
      class="w-full px-5 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" id="cus_email" name="cus_email" type="text" required="" placeholder="Your Email" aria-label="Email"/>
    </div>*/}
    <div class="mt-2">
      <label class=" block text-sm genBold text-gray-600 mt-4" for="cus_email">Address</label>
      <input  
      onChange={(event) => setShipping_address(event.target.value)}
      value={shipping_address}
      className={create === 'darkbg' ? "w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBoxDrk"  :"w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" }
      id="cus_email" name="cus_email" type="text" required="" placeholder="Street" aria-label="Email"/>
    </div>
    <div class="mt-2">
      <label class="hidden text-sm block genBold text-gray-600 mt-4" for="cus_email">City</label>
      <input  
      onChange={(event) => setShipping_city(event.target.value)}
      value={shipping_city}
      className={create === 'darkbg' ? "w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBoxDrk"  :"w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" }
      id="cus_email" name="cus_email" type="text" required="" placeholder="City" aria-label="Email"/>
    </div>
    <div class="inline-block mt-2 w-1/2 pr-1">
      <label class="hidden block text-sm genBold text-gray-600 mt-4" for="cus_email">Country</label>
      <input  
      onChange={(event) => setShipping_country(event.target.value)}
      value={shipping_country}
      className={create === 'darkbg' ? "w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBoxDrk"  :"w-full px-2 py-3 border-none text-gray-700 bg-gray-100 rounded paymentBox" }
      id="cus_email" name="cus_email" type="text" required="" placeholder="Country" aria-label="Email"/>
    </div>
    <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
      <label class="hidden block text-sm genBold text-gray-600 mt-4 " for="cus_email">Zip</label>
      <input  
      onChange={(event) => setShipping_postcode(event.target.value)}
      value={shipping_postcode}
      className={create === 'darkbg' ? "w-full px-2 py-3 ml-1 border-none text-gray-700 bg-gray-100 rounded paymentBoxDrk"  : "w-full px-2 py-3 ml-1 border-none text-gray-700 bg-gray-100 rounded paymentBox" }
      id="cus_email"  name="cus_email" type="text" required="" placeholder="Zip" aria-label="Email"/>
    </div>
    <div class="">
      <label class="block text-sm genBold text-gray-600 mt-4" for="cus_name">Card</label>
      <CardElement options={Card_Styles} />
    </div>
    <div class="mt-4 flex justify-center mt-4">
      <button 
        // class="px-4 py-1 text-white font-light tracking-wider genBold orangeBg rounded" 
        className="orangeBg text-white normalBold text-center w-fit rounded-full py-2 px-12" 
        onClick={handleSubmit} type="submit">{formatPrice(cartTotal(cart))}</button>
    </div>
    {errorMessage && <div>{errorMessage}</div>}
  </form>
</div>
}
{success &&
<div>

 <div className="h3Bold mt-12 mx-4 text-center">
     Your order was successfully processed. Click below to view in profile.
      </div>


      <div className="flex flex-col justify-center items-center pt-">
  {user &&
        <Link 
          to={`/profile/${user.user.id}`} 
          className={create === 'darkbg' ? "sendBtnDrk text-white bulkTxt block mt-12 text-center pt-1 mx-auto"  : "sendBtn bulkTxt block mt-12 text-center pt-1 mx-auto" }
        > 
          Got it
        </Link>
    }
      </div>
      </div>
}

   
	</div>
  )

}
