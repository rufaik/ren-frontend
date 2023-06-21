import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {API_URL} from '../utils/urls'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import 'tw-elements';
import {Verify} from './Verify'
import { NewspaperIcon, PhoneIcon, SupportIcon } from '@heroicons/react/outline'
import Footer from '../components/Footer'



const formatImageUrl = (url) => `${API_URL}${url}`


/* This example requires Tailwind CSS v2.0+ */




export default function Example() {

  const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
  const [content, setContent] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [csemail, setCSEmail] = useState('');
  const [company, setCompany] = useState('partner');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState('');
  const [hear, setHear] = useState('');
  const [content1, setContent1] = useState(null)
  const [details, setDetails] = useState(false)
  const [complete, setComplete] = useState(false)

  useEffect(() => {

  getContent()

}, [])


  const handleSubmit1 = async (event) => {
    event.preventDefault()
    if(firstName === '' || email === '') {
      setDetails(true)
    }else {
      handleSubmit()
    }

  }

  const handleSubmit = async () => {

    // console.log("handlingc....")

      try{
        const response = await fetch(`${API_URL}/customer-emails`, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              company,
              phone,
              help,
              hear,
              csemail: content1[0].email
            })
          })

          const data = await response.json()
          // console.log("Contact", data) 
          setDetails(false)
          setComplete(true) 


      } catch(err){
    // console.log("Exception ", err)
  }

    }  

useEffect(() => {

  getContent1()

}, [])  

   const getContent1 = async (user) => {
    const response = await fetch(`${API_URL}/contacts`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                // console.log("sidet", data)
                setContent1(data);
                // history.push(`/profile/${id}`)
            } catch(err){
              // console.log("nope")
            }         
        }

 

// const getContent1 = async (user) => {
//     const response = await fetch(`${API_URL}/how-it-works`, {
//        method: 'GET',
//         headers: {
//           'Content-Type':'application/json',
//           // 'Authorization': `Bearer ${user.jwt}`
//         }
//     })
//     try{
//                 const data = await response.json();
//                 console.log("side", data)
//                 setContent(data);
//                 // history.push(`/profile/${id}`)
//             } catch(err){
//               console.log("nope")
//             }         
//         }

const getContent = async (user) => {
    const response = await fetch(`${API_URL}/partners`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                // console.log("side", data)
                setContent(data);
                // history.push(`/profile/${id}`)
            } catch(err){
              // console.log("nope")
            }         
        }




const supportLinks = [
  {
    name: content && content[0].card1Title,
    href: '/signup',
    description:
     content && content[0].card1Text,
    icon: PhoneIcon,
    contact: content && content[0].card1LinkText,
  },
  {
    name: content && content[0].card2Title,
    href:  user && user.user ? `/profile/${user.user.id}` : '/signup',
    description:
      content && content[0].card2Text,
    icon: SupportIcon,
    contact: content && content[0].card2LinkText,
  },
  {
    name: content && content[0].card3Title,
    href: '/search',
    description:
      content && content[0].card3Text,
    icon: NewspaperIcon,
    contact: content && content[0].card3LinkText,
  },
]

  return (
    <div>
    {content &&
    <div 
      className={create === 'darkbg' ? "darkbg text-white pt-16" : "bg-white pt-16"}
    >
      {/* Header */}


      <div className='sectWidth mx-auto pt-24'>
        <div className="flex flex-row w-full">
          <div className="w-7/12">
            <h2 className="w-8/12">
              {content[0].header}
            </h2>
            <div className="h3Light mt-12 w-10/12 mb-24">
            {content[0].heroTxt}
            </div>
          </div>
          <div className="w-5/12 relative">
            <div className="absolute z-10">
             <img
            className="w-full rounded-md"
            src={content[0].heroImg.url}
            alt=""
          />
            </div>
          </div>
        </div>
      </div>
      <div className="h3Bold orangeBg w-full h-14 flex items-center mt-28">
        <div className='sectWidth mx-auto text-white flex pt-1'>
          {content[0].orangeBoxText}
        </div>
      </div>

      <div className="relative">
      <div className="absolute top-80 -left-6 rotateArrow z-10"> 
        <img
            className="w-full"
            src="../partnerline.png" 
            alt=""
          />
        </div>
      
      <div className="blueBg1">
        <div className='sectWidth mx-auto py-20'>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <div className="partnerHeader text-white">
              {content[0].blueBx1Header}
              </div>
              <div className="h3Bold w-10/12 mt-8 text-white opacity-80">
              {content[0].blueBx1Txt}
              </div>
            </div>
            <div className="w-1/2">
            <div className="flex flex-col items-center justify-center text">
            <div className="outlineText">
             {content[0].blueBx1Stat}
            </div>
            <div className="h3Light text-white">
            {content[0].blueBx1AStatDesc}
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blueBg2 relative z-10">
        <div className='sectWidth mx-auto py-20'>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <div className="partnerHeader text-white">
              {content[0].blueBx2Header}
              </div>
              <div className="h3Bold w-10/12 mt-8 text-white opacity-80">
              {content[0].blueBx2Txt}
              </div>
            </div>
            <div className="w-1/2">
            <div className="flex flex-col items-center justify-center text">
            <div className="outlineText">
             {content[0].blueBx2Stat}
            </div>
            <div className="h3Light text-white">
            {content[0].blueBx2StatDesc}
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blueBg3">
        <div className='sectWidth mx-auto py-20'>
          <div className="flex flex-row w-full">
            <div className="w-1/2">
              <div className="partnerHeader text-white">
              {content[0].blueBx3Header}
              </div>
              <div className="h3Bold w-10/12 mt-8 text-white opacity-80">
              {content[0].blueBx3Txt}
              </div>
            </div>
            <div className="w-1/2">
            <div className="flex flex-col items-center justify-center text">
            <div className="outlineText">
             {content[0].blueBx3Stat}
            </div>
            <div className="h3Light text-white">
            {content[0].blueBx3StatDesc}
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-row -mb-20">
    <div className="w-8/12 pl-48 pt-24">
      <div className="partnerHeader">
        {content[0].formTitle}
      </div>
      <div className="h3Light mt-12 w-1/2">
      {content[0].formDesc}
      </div>

      <div className="genBold mt-16 flex flex-row">
        <div>Name</div>
        <div className="-mt-2">*</div>
      </div>
       <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={firstName}
                  onChange={(event) => {
                        setFirstName(event.target.value)}}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className={create === 'darkbg' ? "uniqueBox mt-4 pl-4 text-black" : "uniqueBox mt-4 pl-4 text-black"}
                  

                />
              </div>
            </div>
      <div className="genBold mt-4 flex flex-row">
        <div>Email</div>
        <div className="-mt-2">*</div>
      </div>
       <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={email}
                  onChange={(event) => {
                        setEmail(event.target.value)}}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className={create === 'darkbg' ? "uniqueBox mt-4 pl-4 text-black" : "uniqueBox mt-4 pl-4 text-black"}
                 

                />
              </div>
            </div>
      <div className="genBold mt-4 flex flex-row">Message</div>
       <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
               {/* <input
             
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                  onChange={(event) => {
                    // setError('')
                    // setLastName(event.target.value)
                  }}

                />*/}
                 <textarea
                      value={help}
                      onChange={(event) => {
                        setHelp(event.target.value)}}
                      id="message"
                      name="message"
                      rows={4}
                      className="uniqueBoxDesc mt-4 pl-4 text-black"
                      aria-describedby="message-max"
                      defaultValue={''}
                    />
              </div>
            </div>

              <button 
              onClick={handleSubmit1}
              href="/contact"  
              className="orangeBg text-white h3Dark py-5 w-60 text-center h3Bold rounded cursor-pointer mt-8">
              Get in touch!
              </button>
              { details &&
                <div className="genBold orangeCol mt-4">Please make sure your name and email have been added</div>
              }
              { complete &&
                <div className="genBold orangeCol mt-4">Thank you!</div>
              }

    </div>
    <div className="w-4/12">
    <div className="w-full"> 
        <img
            className=""
            style={{'maxWidth': '130%'}}
            src={content[0].formImg[0].url}
            alt=""
          />
        </div>
    </div>    
    </div>


  <Footer />

    </div>
  }
  </div>
  )
}





