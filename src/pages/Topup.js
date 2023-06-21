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
import {API_URL} from '../utils/urls'





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
    // console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
}

export default ({description, likes, url}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
 const [open, setOpen] = useState(true)
 const [topQty, setTopQty] = useState(null)
 const [basket, setBasket] = useState(false)
 const {cart, addToCart} = useContext(CartContext)


  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await fetch(`${API_URL}/posts`)
  //     const data = await response.json()
  //     setPosts(data)
  //   }

  //   getPosts()

  // }, [])


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      // console.log("data", data)
      setProducts(data)
    }

    getProducts()
    // console.log("products", products)

  }, [])

  // console.log("home", simpleUser)








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








    <div className="bg-white">

    </div>





    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => window.location.href = `/profile/${user.user.id}`}>
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
            <div 
              className={create === 'darkbg'
                          ? "darkbg text-white inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
                          : "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6"
                        }
              style={{"width": "44em", "height": "45em"}}
            >
              <div style={{"width":"620px"}} className="mx-auto">
              <div className="h3Bold mt-12 text-center">Top up your R.E.N Credits</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{/*              <div className="h3Sub my-4 ">Canon EOS M50 Black + EF-M 15-45mm IS STM Lens Black</div>
*/}              <div className="h3Sub my-4 ">Top up any amount</div>
                 <div className="flex flex-row items-baseline" >
                   <input
                              placeholder="Max 40 characters"
                              type="text"
                              name="top-up"
                              id="top-up"
                              className="uniqueBox mt-4 pl-4"
                              onChange={(event) => {
                                setTopQty(event.target.value)
                              }}

                            />
                    <div className="genLight ml-6">Cost: {formatPrice(topQty*100)}</div>
                </div>
          {products.map((product) => {
            if(product.name === "1"){
              return(
                <div 
                  className="orangeBg text-white normalBold text-center w-fit rounded-full py-2 px-4 mt-4"
                  style={{"width":"fit-content"}}
                  onClick={() => {
                    // console.log("product", product)
                    addToCart(product, topQty)}}
                >
                Add to basket
                </div>
              )}})}
              <div className="gryLine2 w-full my-10"></div>
              <div className="flex flex-row">
                <div className="h3Sub mb-4">R.E.N Offers</div>
             
              </div>
              {products.map((product) => {
                if(product.name !== "1"){
                  return(
              <div className="flex flex-row items-center mt-3">
                <div>
                  <img className='w-100' alt='REN coin' src={(product.thumbnail && product.thumbnail.url)} />
                </div>
                <div className="genBold w-10 ml-4">{product.name}</div>
                <div 
                  className="orangeBg text-white normalBold text-center w-28  rounded-full pb-1 pt-2 px-4 ml-4"
                  onClick={() => {
                    // console.log("product", product)
                    
                    addToCart(product, 1)}}
                >
                  {formatPrice(product.price_in_cent)}
                </div>
                <div className="genLight w-32 ml-4">{product.description}</div>
               {cart.map((cartItem) => {
                  if(cartItem.name === product.name && cartItem.qty > 0) {
                   
                    return(
                      <div 
                        className="genLight w-40 ml-4"
                        style={{"fontStyle":"italic"}}
                      >
                        {cartItem.qty} x added to basket
                      </div>
                      )
                  }
                })}
                
              </div>
)}})}
               {cart && cart[0] ?
                <Link
                  to='/cart' 
                  className="orangeCol ml-auto text-white block text-right underline"
                >
                  Go to Basket
                </Link>
              : null}

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>






</div>






  


  );
}