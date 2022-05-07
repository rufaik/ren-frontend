import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import 'tw-elements';
import {Verify} from './Verify'
import Footer from '../components/Footer'



const formatImageUrl = (url) => `${API_URL}${url}`


export default () =>{

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [csemail, setCSEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState('');
  const [hear, setHear] = useState('');
  const [content, setContent] = useState(null)

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




  const handleSubmit = async (receiverID, amount) => {

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
              csemail
            })
          })

          const data = await response.json()
          console.log("Contact", data)
        
         

      } catch(err){
    console.log("Exception ", err)}

    }    







  return (
    <div className="bg-white">
      { content &&
      <div className="relative -mb-20">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            src={content[0].mainImage.url}
            alt=""
          />
        </div>
      </div>
      <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 sectWidth xl:ml-12 xl:mt-24 lg:mx-auto lg:py-32 lg:grid lg:grid-cols-2">
        <div className="lg:pr-8">
          <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{content[0].mainTitle}</h2>
            <p className="mt-4 text-lg text-gray-500 sm:mt-3">
              {content[0].introText}
            </p>
            <form action="#" method="POST" className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  {content[0].firstName}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value)}}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  {content[0].lastName}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value)}}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {content[0].emailTitle}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)}}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  {content[0].companyTitle}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={company}
                    onChange={(event) => {
                      setCompany(event.target.value)}}
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {content[0].phoneTitle}
                  </label>
                  <span id="phone-description" className="text-sm text-gray-500">
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value)}}
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    aria-describedby="phone-description"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label htmlFor="how-can-we-help" className="block text-sm font-medium text-gray-700">
                    {content[0].helpTitle}
                  </label>
                  <span id="how-can-we-help-description" className="text-sm text-gray-500">
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    id="how-can-we-help"
                    value={help}
                    onChange={(event) => {
                      setHelp(event.target.value)}}
                    name="how-can-we-help"
                    aria-describedby="how-can-we-help-description"
                    rows={4}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
{/*              <fieldset className="sm:col-span-2">
                <legend className="block text-sm font-medium text-gray-700">Expected budget</legend>
                <div className="mt-4 grid grid-cols-1 gap-y-4">
                  <div className="flex items-center">
                    <input
                      id="budget-under-25k"
                      name="budget"
                      defaultValue="under_25k"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="budget-under-25k" className="ml-3">
                      <span className="block text-sm text-gray-700">Less than $25K</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget-25k-50k"
                      name="budget"
                      defaultValue="25k-50k"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="budget-25k-50k" className="ml-3">
                      <span className="block text-sm text-gray-700">$25K – $50K</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget-50k-100k"
                      name="budget"
                      defaultValue="50k-100k"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="budget-50k-100k" className="ml-3">
                      <span className="block text-sm text-gray-700">$50K – $100K</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget-over-100k"
                      name="budget"
                      defaultValue="over_100k"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="budget-over-100k" className="ml-3">
                      <span className="block text-sm text-gray-700">$100K+</span>
                    </label>
                  </div>
                </div>
              </fieldset>
*/}              <div className="sm:col-span-2">
                <label htmlFor="how-did-you-hear-about-us" className="block text-sm font-medium text-gray-700">
                  {content[0].hearTitle}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={hear}
                    onChange={(event) => {
                      setHear(event.target.value)}}
                    name="how-did-you-hear-about-us"
                    id="how-did-you-hear-about-us"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="text-right sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  {content[0].buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    }
      <Footer />
    </div>
  )
}



