import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

 const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);



export default () =>{


  return (
    <div className="Create">
  	    <Elements stripe={stripePromise}>
      		<CheckoutForm />
    	</Elements>
    </div>
  );
}