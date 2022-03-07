import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import 'tw-elements';
import {Verify} from './Verify'


  const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`


export default ({description, likes, url}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const [userTypes, setUserTypes] = useState([])
 const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
 const [q1, setQ1] = useState(true)
 const [q2, setQ2] = useState(false)
 const [q3, setQ3] = useState(false)
 const [darkMode, setDarkMode] = useState(true)
const [verify, setVerify] = useState(true)
const [status, setStatus] = useState(null)


  useEffect(() => {
   {simpleUser &&
      getStripeStatus()
  }

  }, [simpleUser])

    const getStripeStatus = async () => {
      console.log("get")
      try{
        const response = await fetch(`http://localhost:1337/payouts/retrieveStatus`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({stripeID: simpleUser.payoutID})
          })

          const confirm = await response.json()
          console.log("confirm", confirm)
          if(confirm.charges_enabled === true){
            // setStatus("Completed")
            updateCurrent()
          } else {
            setStatus("Incomplete")
            window.location.href = "http://localhost:3000/profile/38"
          }
          

      } catch(err){
    console.log("Payment ", err)
      }

  }

   const updateCurrent = async () => {
    console.log("updateCurrent")
    const data1 = {
      stripeStatus: "Completed"
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
            window.location.href = "http://localhost:3000/profile/38"

      } catch(err){
    console.log("Exception ", err)}

    }



  return (
    <div className={create === 'darkbg' ? 'darkbg' : null}>


            </div>


  );
}




