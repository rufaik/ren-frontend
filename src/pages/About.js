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


/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
          <p className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Take control of your team.
          </p>
          <p className="max-w-xl mt-8 mx-auto text-xl text-gray-500">
            Start building for free, then add a site plan to go live. Account plans unlock additional features.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}




