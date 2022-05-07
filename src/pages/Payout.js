import React, {useState, useEffect, useContext, Fragment} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import {API_URL} from '../utils/urls'
import { Fade } from 'react-slideshow-image';
import { Dialog, Transition } from '@headlessui/react'
import {CartContext} from '../context/CartContext'




const formatImageUrl = (url) => `${API_URL}${url}`


export default () =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
 const [open, setOpen] = useState(true)
 const [topQty, setTopQty] = useState(null)
 const [basket, setBasket] = useState(false)
 const {cart, addToCart} = useContext(CartContext)
 const [setUpBegan, setSetUpBegan] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const [begin, setBegin] = useState(false)
 const [create1, setCreate] = useState(true)
 const [transfer, setTransfer] = useState(false)


//   useEffect(() => {

//     getFields()

//   }, [])

// //   useEffect(() =>{
// //   const loadToken = async () => {
// //     setLoading(true)
// //     const response = await fetch('${API_URL}/orders/payment', {
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
        const response = await fetch(`${API_URL}/payouts/payment`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({})
          })

          const confirm = await response.json()
          console.log("confirm", confirm)
          setSetUpBegan(confirm.id)
          setCreate(false)
          setBegin(true)
         

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
        const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
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
          setBegin(false)
          setTransfer(true)

      } catch(err){
    console.log("Exception ", err)}

    }



    const setUp = async () => {

      console.log("CLICK")
       try{
        const response = await fetch(`${API_URL}/payouts/paymentA`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ account: setUpBegan, url: 'https://rent-equipment-now.netlify.app'})
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
        const response = await fetch(`${API_URL}/payouts/coinPay`, {
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


  

      <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed z-10 inset-0 overflow-y-auto" 
        // className={create === 'darkbg' ? "darkbg text-white fixed z-10 inset-0 overflow-y-auto" : "fixed z-10 inset-0 overflow-y-auto"}
        onClose={()=> {
          setOpen(false)
          window.location.reload()
        }}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "17em"}}>
              <div style={{"width":"620px"}} className="mx-auto flex justify-center flex-col">
          {create1 &&
            <div>
              <div className="genBold mt-12 text-center">
               Get your payout ID
              </div>
              {simpleUser && <div className="orangeCol my-4 text-center"></div> }
               <div className="genLight text-center">
                Your payout ID is what we will use to identify your account to pay you correctly
              </div>

{/*      <button className="authBtn" onClick={updateCurrent}>Begin Setup</button> 

      <button className="authBtn" onClick={setUp}>Transfer</button> */}

    
              <div className="flex flex-col justify-center items-center pt-">
          
                <a className="sendBtn bulkTxt block mt-8 text-center pt-1 mx-auto" onClick={getFields}>Create</a>
              </div>
            </div>
            }
          {begin &&
            <div>
             {simpleUser &&
               <div className="genBold mt-16 text-center">
               Your payout ID is: {setUpBegan}
              </div> }
               <div className="genLight mt-4 text-center">
                You can keep this for your own records
              </div>
    
              <div className="flex flex-col justify-center items-center ">
          
                <a className="sendBtn bulkTxt block mt-8 text-center pt-1 mx-auto" onClick={updateCurrent}>Begin</a>
              </div>
            </div>
            }

          {transfer &&
            <div>
              <div className="genBold mt-12 text-center">
               R.E.N uses Stripe to manage and authenicate all payout transactions</div>
              <div className="genLight mt-4 text-center">
                If you have already have an account you can link it to that email address
              </div>
            

{/*      <button className="authBtn" onClick={updateCurrent}>Begin Setup</button> 

      <button className="authBtn" onClick={setUp}>Transfer</button> */}

    
              <div className="flex flex-col justify-center items-center pt-">
          
                <a className="sendBtn bulkTxt block mt-8 text-center pt-1 mx-auto" onClick={setUp}>Continue</a>
              </div>
            </div>
            }

               {/* <div 
                  className="orangeCol mb-8 text-white block mt-4 text-center orangeBtm pb-0.5"
                >
                 I made a mistake
                </div>*/}
              </div>
              </div>
           
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  </div>



  )

}