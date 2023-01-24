import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

 const stripePromise = loadStripe(`pk_live_8dhdfkRedEZZ0Y0XWPmWoapy004KqsjtgC`);



export default () =>{


  return (
    <div className="Create">
  	    <Elements stripe={stripePromise}>
      		<CheckoutForm />
    	</Elements>
    </div>
  );
}