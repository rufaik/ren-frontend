import React, {useState, useEffect, useContext, Fragment} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import { Fade } from 'react-slideshow-image';
import { Dialog, Transition } from '@headlessui/react'
import {CartContext} from '../context/CartContext'



  const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`


export default () =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
 const [open, setOpen] = useState(true)
 const [topQty, setTopQty] = useState(null)
 const [basket, setBasket] = useState(false)
 const {cart, addToCart} = useContext(CartContext)
 const [setUpBegan, setSetUpBegan] = useState(null)
 const [isLoading, setIsLoading] = useState(true)


//   useEffect(() => {

//     getFields()

//   }, [])

// //   useEffect(() =>{
// //   const loadToken = async () => {
// //     setLoading(true)
// //     const response = await fetch('http://localhost:1337/orders/payment', {
// //       method: 'POST',
// //           headers: {
// //             'Content-Type':'application/json'
// //           },          
// //           body: JSON.stringify({
// //             cart
// //           })
// //     })

// //     const data = await response.json()
// //         console.log("loadToken data", data) 
// //         setToken(data.client_secret)
// //         setTotal(data.amount)
// //         setLoading(false)
// //   }

// //   loadToken()
// // }, [cart])

  // useEffect(() => {
  //   if( simpleUser && simpleUser.stripeStatus !== "Completed" ){
  //     // console.log("getFields")
  //     getFields()
  //   }

  // }, [simpleUser])


  // useEffect(() => {
  //   console.log("Payout")

  // }, [simpleUser])


const getFields = async () => {
 // const data1 = {
 //      verifyKey: identityAccessKey
 //    }
      try{
        const response = await fetch(`http://localhost:1337/payouts/payment`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({})
          })

          const confirm = await response.json()
          console.log("confirm", confirm)
          setSetUpBegan(confirm.id)
         

      } catch(err){
    console.log("Payment ", err)
      }

  }

   const updateCurrent = async (data) => {
    console.log("CLICKgg", setUpBegan )
    const data1 = {
      payoutID: setUpBegan,
      stripeStatus: "Incomplete"
    }

      try{
        const response = await fetch(`http://localhost:1337/users/${simpleUser.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data1)
          })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
          

      } catch(err){
    console.log("Exception ", err)}

    }



    const setUp = async () => {

      console.log("CLICK")
       try{
        const response = await fetch(`http://localhost:1337/payouts/paymentA`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ account: setUpBegan})
          })

          const confirm = await response.json()
          console.log("confirm1", confirm)
          window.location.href = `${confirm.url}`

      } catch(err){
    console.log("Payment ", err)
      }
    }


       const transferCoins = async () => {

      console.log("CLICK2")
       try{
        const response = await fetch(`http://localhost:1337/payouts/coinPay`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ account: setUpBegan})
          })

          const confirm = await response.json()
          console.log("confirm2", confirm)

      } catch(err){
    console.log("Payment ", err)
      }
    }

return(
  <div className="flex flex-col">


      <button className="authBtn" onClick={getFields}>Create</button> 

      <button className="authBtn" onClick={updateCurrent}>Begin Setup</button> 

      <button className="authBtn" onClick={setUp}>Transfer</button> 

  </div>



  )

}