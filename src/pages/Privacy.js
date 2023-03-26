import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown'



const formatImageUrl = (url) => `${API_URL}${url}`


/* This example requires Tailwind CSS v2.0+ */
export default function Example() {

  const [content, setContent] = useState(null)
  const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)


  useEffect(() => {

  getContent()

}, [])

const getContent = async (user) => {
    const response = await fetch(`${API_URL}/privacies`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                console.log("side", data)
                setContent(data);
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
            }         
        }



  return (
    <div 
      className={create === 'darkbg' ? "darkbg text-white" : "bg-white"}
    >
    {content &&
      <div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="">
            <h2 
              className={create === 'darkbg' ? " text-center text-base font-semibold text-white tracking-wide uppercase" : "text-center text-base font-semibold text-indigo-600 tracking-wide uppercase"}
            >{content[0].smallTitle}</h2>
            <p 
            className={create === 'darkbg' ? "text-center mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl" : "text-center mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"}
            >
              {content[0].largeTitle}
            </p>
          
            <div 
            className={create === 'darkbg' ? "text-justify mt-8 mx-auto text-xl text-white" : "text-justify mt-8 mx-auto text-xl text-gray-500"}
            >
            <ReactMarkdown>
              {content[0].mainBody}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }
    </div>
  )
}




