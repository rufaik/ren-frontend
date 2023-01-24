import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

 const stripePromise = loadStripe(`pk_test_fDo68NkoSb7iXCCJZNB7Mopc000fs4FwLq`);



export default () =>{


  return (
    <div className="Create">
  	    <Elements stripe={stripePromise}>
      		<CheckoutForm />
    	</Elements>
    </div>
  );
}