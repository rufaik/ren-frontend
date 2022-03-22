import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {CartContext} from '../context/CartContext'
import {UserContext} from '../context/UserContext'
import {
  cartCoinTotal, 
  cartSubTotal, 
} from '../utils/cart'
import {formatPrice} from '../utils/format'
import {API_URL} from '../utils/urls'

const Card_Styles = {
	style: {
		base: {
			padding: '24px 12px',
			fontSize: '16px'
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
          className="uniqueBox mb-7 pl-4"
          onChange={(event) => setOnChange(event.target.value)}
        />
      </div>
    )
}

export default () =>{


  const stripe = useStripe();
  const elements = useElements();
  const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)

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
  const [shipping_postcode, setShipping_postcode] = useState('');
  
  const [coins, setCoins] = useState(null);


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
      users_permissions_user:user.user.id,
      cart
    }

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

          setCoins(Math.round(parseInt(user.user.coins) + parseInt(order.product_qty[0].qty)))

          setLoading(false)

          topUpCoins(order)

          clearCart()

          createTransaction(order)



    console.log("handleSubmit result", result)
    console.log("handleSubmit order", order)
    
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();
}


const createTransaction = async (order) => {
  const data = {
      amount: (Math.round(parseInt(order.product_qty[0].qty))),
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
      coins: Math.round(parseInt(simpleUser.coins) + parseInt(order.product_qty[0].qty))
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
       <div className="flex flex-row w-full">
        <div className="w-9/12">
	         <form onSubmit={handleSubmit}>
    
{/*      <div>
        <label>Name</label>
        <input 
          id="name"
          value={shipping_name}
          onChange={(event) => setShipping_name(event.target.value)}
        />
      </div>
      <div>
        <label>Address</label>
        <input 
          id="address"
          value={shipping_address}
          onChange={(event) => setShipping_address(event.target.value)}
        />
      </div>
      <div>
        <label>County</label>
        <input 
          id="county"
          value={shipping_county}
          onChange={(event) => setShipping_county(event.target.value)}
        />
      </div>
      <div>
        <label>Country</label>
        <input 
          id="country"
          value={shipping_country}
          onChange={(event) => setShipping_country(event.target.value)}
        />
      </div>
      <div>
        <label>Postcode</label>
        <input 
          id="postcode"
          value={shipping_postcode}
          onChange={(event) => setShipping_postcode(event.target.value)}
        />
      </div>*/}

            {generateInput('Name', shipping_name, setShipping_name)}
            {generateInput('Address', shipping_address, setShipping_address)}
            {generateInput('County', shipping_county, setShipping_county)}
            {generateInput('Country', shipping_country, setShipping_country)}
            {generateInput('Postcode', shipping_postcode, setShipping_postcode)}
            <div className="genBold w-36" >Card Details </div>
    	      <CardElement options={Card_Styles} />
    	      <button 
              // disabled={!stripe || !valid()}
              onClick={handleSubmit}
            >
              Submit
            </button>
    	      {/* Show error message to your customers */}
    	      {errorMessage && <div>{errorMessage}</div>}
	    </form>

      </div>
      <div className="w-3/12 flex flex-col h-40 blueBgBx pt-4 items-center">
        <div>
          <img className='w-100' alt='REN coin' src="../coin.png" />
        </div>
        <div className="genBold orangeCol">
        {cartCoinTotal(cart)}
        </div>
        <div className="h3Bold genBold mt-4">
        Total:{formatPrice(cartSubTotal(cart))}
        </div>
      </div>
  </div>
}

{success &&
  <h2>Your order was successfully processed!</h2>
}
	
	</div>
  )

}
