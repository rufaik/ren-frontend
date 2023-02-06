import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import 'tw-elements';
import Footer from '../components/Footer'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'





const Contact = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const company = '';
  const hear = '';
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState('');
  const [content, setContent] = useState(null)
  const [success, setSuccess] = useState(false)
  const { create, mainImages} = useContext(UserContext)

  useEffect(() => {

  getContent()

}, [])

const getContent = async (user) => {
    const response = await fetch(`${API_URL}/contacts`, {
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




  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("handling....")

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
              csemail: content[0].email
            })
          })

          const data = await response.json()
          console.log("Contact", data)
          setSuccess(true)
        
         

      } catch(err){
    console.log("Exception ", err)}

    }    







  return (
    <div 
      className={create === 'darkbg' ? "darkbg text-white" : "bg-white"}

    >

{ content &&

    <div className={create === 'darkbg' ?  " mt-16 -mb-20" : "bg-gray-100 mt-16 -mb-20"}>
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <h2 className="sr-only">Contact us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative overflow-hidden bg-indigo-700 py-10 px-6 sm:px-10 xl:p-12">
              <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={160}
                  height={678}
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Contact information</h3>
              <p className="mt-6 max-w-3xl text-base text-indigo-50">
                {content[0].introText}
              </p>
              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                {mainImages &&
                <dd className="flex text-base text-indigo-50">
                  <PhoneIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                  <span className="ml-3">+{mainImages[0].mainNumber}</span>
                </dd>
              }
                <dt>
                  <span className="sr-only">Email</span>
                </dt>
                {mainImages &&
                <dd className="flex text-base text-indigo-50">
                  <MailIcon className="h-6 w-6 flex-shrink-0 text-indigo-200" aria-hidden="true" />
                  <span className="ml-3">{mainImages[0].mainEmail}</span>
                </dd>
              }
              </dl>
              <ul  className="mt-8 flex space-x-12">
                <li>
                  {mainImages && 
                      <Link  to={{ pathname: `${mainImages[0].facebook }`}} target="_blank">
                        <div className="socialBx mr-4">
                              <img  alt='social' src={create === 'darkbg' ? "../faceD.png"  : "../faceL.png"} />
                          </div>
                      </Link>
                    }
                </li>
                <li>
                  {mainImages && 
                    <Link  to={{ pathname: `${mainImages[0].linkedin }`}} target="_blank">
                    <div className="socialBx mr-4">
                          <img  alt='social' src={create === 'darkbg' ? "../linkD.png"  : "../linkL.png"} />
                      </div>
                    </Link>
                  }
                </li>
                <li>
                  {mainImages && 
                    <Link  to={{ pathname: `${mainImages[0].instagram }`}} target="_blank">
                      <div className="socialBx mr-4">
                          <img  alt='social' src={create === 'darkbg' ? "../instaD.png"  : "../instaL.png"} />
                      </div>
                    </Link>
                  }
                </li>
              
              </ul>
            </div>

            {/* Contact form */}
            <div className={create === 'darkbg' ? "py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 grybg" : "py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12"}>
              <h3 className="text-lg font-medium text-gray-900">{content[0].mainTitle}</h3>
              <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                    {content[0].firstName}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value)}}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                    {content[0].lastName}
                  </label>
                  <div className="mt-1">
                    <input
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value)}}
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                   {content[0].emailTitle}
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)}}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                      {content[0].phoneTitle}
                    </label>
                    <span id="phone-optional" className="text-sm text-gray-500">
                      Optional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value)}}
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      aria-describedby="phone-optional"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                      {content[0].helpTitle}
                    </label>
                    <span id="message-max" className="text-sm text-gray-500">
                      Max. 500 characters
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      value={help}
                      onChange={(event) => {
                        setHelp(event.target.value)}}
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      aria-describedby="message-max"
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:flex sm:justify-end items-center">
                {success && <div className="genBold orangeCol mr-8">Thank you, we will be in touch</div>}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                  {content[0].buttonText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

}

















      <Footer />
    </div>
  )
}

export default Contact;

