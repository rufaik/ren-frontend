import React, {useState, useEffect, useContext, Fragment} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import { Fade } from 'react-slideshow-image';
import { Dialog, Transition } from '@headlessui/react'
import {CartContext} from '../context/CartContext'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/outline'




const formatImageUrl = (url) => `${API_URL}${url}`

  const fadeImages = [
   'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp',
   'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp',
   'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp'
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
}

export default ({description, likes, url}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
 const [open, setOpen] = useState(true)
 const [topQty, setTopQty] = useState(null)
 const [basket, setBasket] = useState(false)
 const {cart, addToCart} = useContext(CartContext)


  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await fetch(`${API_URL}7/posts`)
  //     const data = await response.json()
  //     setPosts(data)
  //   }

  //   getPosts()

  // }, [])


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${API_URL}/transactions`)
      const data = await response.json()
      console.log("data", data)
      setProducts(data)
    }

    getProducts()
    console.log("products", products)

  }, [])

  console.log("home", simpleUser)








  return (
    <div className="Home">
{/*	    {posts.map(post => (
      <Link to={`/${post.id}`}>
  	    <Post 
  	      description={post.description}
  	      likes={post.likes}
  	      url={post.image && post.image.url}
  	    />
      </Link>
      ))}

      <h1>Products</h1>

    {products.map(product => (
      <Link 
          style={{
            color:'black',
            textDecoration: 'none'
          }}
          to={fromProductSlugToUrl(product.slug)}
        >
        <Post 
          description={product.description}
          likes={formatPrice(product.price_in_cent)}
          url={product.thumbnail && product.thumbnail.url}
        />
      </Link>
      ))}*/}








    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6" style={{"width": "44em", "height": "45em"}}>
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Transactions</div>

              <div className="gryLine2 w-full my-10"></div>
              <div className="flex flex-row">
          
             
              </div>
              <div className="flex flex-row items-center mt-3 w-10/12 mx-auto">
                <div className="">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <div className="genBold ml-16">Amount</div>
                <div className="genBold ml-16">In/Out</div>
                <div className="genBold ml-16">Type of Transaction</div>
                
                
              
                
              </div>
     
              <div className="w-10/12 mx-auto h-96 overflow-y-scroll">
              {products.map((product) => {
                if(parseInt(product.userID) === parseInt(simpleUser.id)) {

                  return(
              <div className="flex flex-row items-center mt-3">
                <div>
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <div className="gen w-10 ml-20">{product.amount}</div>
               {product.InOrOut === "Ingoing" ? <ArrowLeftIcon className="h-6 w-6 orangeCol ml-12" aria-hidden="true" /> : <ArrowRightIcon className="h-6  ml-12 w-6 orangeCol" aria-hidden="true" />}
                <div className="gen w-10 ml-4">{product.InOrOut}</div>
                <div className="gen w-10 ml-24">{product.type === "SecureBooking" ? "Secure Booking" : product.type}</div>
                
                
             
                
              </div>
)}})}
              </div>
               <div className="gryLine2 w-full mt-3"></div>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>






</div>






  


  );
}