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

  useEffect(() => {

  getContent()

}, [])

const getContent = async (user) => {
    const response = await fetch(`${API_URL}/how-it-works`, {
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
    <div 
      className={create === 'darkbg' ? "darkbg text-white pt-16" : "bg-white pt-16"}
    >
      {/* Header */}
      {content &&
      <div>
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={content[0].mainImage.url}
            alt=""
          />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">{content[0].Title}</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
           {content[0].mainText}
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section
        className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <h2 className="sr-only" id="contact-heading">
          Contact us
        </h2>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {supportLinks.map((link) => (
            <div 
                key={link.name} 
                className={create === 'darkbg' ? "flex flex-col darkbg rounded-2xl shadow-xl" : "flex flex-col bg-white rounded-2xl shadow-xl" }
              >
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                <div 
                  className="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2"
                  style={{"backgroundColor": content[0].colour}}
                >
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 
                  className={create === 'darkbg' ? "text-xl font-medium text-white" : "text-xl font-medium text-gray-900"}
                >{link.name}</h3>
                <p className="mt-4 text-base text-gray-500">{link.description}</p>
              </div>
              <div 
                className={create === 'darkbg' ? "p-6 darkBx rounded-bl-2xl rounded-br-2xl md:px-8" : "p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8" }
              >
                <a 
                  href={link.href} 
                  className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                  style={{"color": content[0].colour}}
                >
                  {link.contact}<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  }
    </div>
  )
}





