import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import Footer from '../components/Footer'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import 'tw-elements';
import {Verify} from './Verify'
import { SearchIcon } from '@heroicons/react/outline'
import {API_URL} from '../utils/urls'

import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const Me =  ({history}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const [userTypes, setUserTypes] = useState([])
 const {user, setUser, simpleUser, setSimpleUser, create, mainImages} = useContext(UserContext)
 const [q1, setQ1] = useState(true)
 const [q2, setQ2] = useState(false)
 const [q3, setQ3] = useState(false)
 const [first1, setFirst1] = useState(1)
 const [darkMode, setDarkMode] = useState(true)
const [verify, setVerify] = useState(false)
  const [searchWord, setSearchWord] = useState('')


  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${API_URL}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    getPosts()

  }, [])


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      // console.log("data", data[0].id)
      setProducts(data)
    }

    getProducts()
    // console.log("products", products)

  }, [])




    useEffect(() => {
    const getUserTypes = async () => {
      const response = await fetch(`${API_URL}/identity-cards`)
      const data = await response.json()
      // console.log("data", data)
      setUserTypes(data)
    }

    getUserTypes()
    // console.log("userTypes", userTypes)

  }, [])

  // console.log("home", simpleUser)






  const fadeImages = [
  './bigCam.png',
  './renHomeStereo.png',
  './renHomeDrone.png'
];
 
const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition`);
  }
}


  return (
  	<div   className = "bg-transparent">
{/*   <br></br>
<div  className = "w-48 J gown p-12 bg-transparent">
    HerBasics <br></br><div className='f7 f4-ns mt2 mt0-ns frontfont'>Equipping girls with 3 basic elements 
    <br></br>so that they can build their lives on healthy foundations
    <br></br>Her Bra
    <br></br> Her Self-Esteem
    <br></br> Her Period
    <br></br>
      <br ></br>
    <Link to="/Home" ><button type="button" className="btn mt2 mt0-ns f7 f5-ns btn-outline-warning">Check out Our Curriculum >>></button></Link>
    </div>
   
   


  </div>
*/}

 

    <div className="slide-container mt-8 z-10 relative w-full" >
      <Fade {...fadeProperties}>
      {/*  <h2></h2>
          <div className="image-container">
            <img src={fadeImages[0]} />
          </div>*/}


          <div className={create === 'darkbg' ? "relative w-full darkbg each-fade" : "relative float-left w-full each-fade"} 
                  style={{'height':'90vh'}}>
        {/*      <div class="carousel-caption hidden md:block absolute text-center">
                <h5 class="text-xl">First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp"
                class="block w-1/2"
                alt="Motorbike Smoke"
              />*/}
                  <div className={create === 'darkbg' ? "flex w-100  h-5/6" : "flex w-100  h-5/6 "}>

                    <div className={create === 'darkbg' ? 'w-1/2 flex flex-col darkbg' : 'w-1/2 flex flex-col '}>
                      <h2 className={create === 'darkbg' ? "heroFont mt-16 text-white" : "heroFont mt-16 "}>Access better technology.</h2>
                      <h2 className={create === 'darkbg' ? "heroFont  text-white" : "heroFont "}>Get better results.</h2>
                      <div className="w-10/12">
                        <div className={create === 'darkbg' ? "h3Light mt-6 text-white" : "h3Light mt-6 "}>We’re making it affordable to action your ideas and get better results.</div>
                      </div>
                      <div className="searchBxHome mt-12 ml-auto items-center flex flex-row">
                        <input
                                  id="searchWord"
                                  name="searchWord"
                                  type="text"
                                  required
                                  className="border-0 noRing bg-transparent w-11/12 ml-7 genBold text-white py-2"
                                  placeholder="Cameras, laptops, speakers, drones..."
                                  value={searchWord}
                                  onChange={(event) => {
                                    setSearchWord(event.target.value)
                                  }}
                                  onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                    // console.log('do validate');
                                    history.push({ 
                                       pathname: '/search',
                                       state: searchWord
                                      });

                                  }
                                  }}
                                />
                          <div 
                            className="w-10 h-10 rounded-full flex justify-center items-center ml-auto mr-2" 
                            style={{"backgroundColor": "#0B1A2C"}}
                            onClick={() => {
                              history.push({ 
                                         pathname: '/search',
                                         state: searchWord
                                        });
                            }}

                            >
                            <SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                      </div>

                    </div>

                    <div className='w-1/2 relative' >
                      {mainImages &&<div className='flex justify-center ml-8 -mr-8' > <img className='w-100 ml-auto' alt='camera' src={mainImages[0].mainimage.url} /></div> }
                      <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                      <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Canon EOS M50 Black + EF-M 15-45mm IS STM </div>
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Lens Black</div>
                      </div>
                    </div>

                  </div>

                </div>
          
      
        <div className="each-fade">
         {/*<h2></h2>
          <div className="image-container">
            <img src={fadeImages[1]} />
          </div>*/}


           <div 
                  style={{'height':'90vh'}}
                  className={create === 'darkbg' ? "relative w-full darkbg" : "relative w-full "} 
                >
        {/*      <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp"
                class="block w-full"
                alt="Mountaintop"
              />
              <div class="carousel-caption hidden md:block absolute text-center">
                <h5 class="text-xl">Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>

        */}
                  <div className={create === 'darkbg' ? "flex w-100  h-5/6" : "flex w-100  h-5/6 "}>
                    <div className={create === 'darkbg' ? 'w-1/2 flex flex-col darkbg' : 'w-1/2 flex flex-col '}>
                      <h2 className={create === 'darkbg' ? "heroFont mt-16 text-white" : "heroFont mt-16 "}>Use technology sustainably.</h2>
                      <h2 className={create === 'darkbg' ? "heroFont  text-white" : "heroFont "}>Reduce digital waste.</h2>
                      <div className="w-10/12">
                        <div className={create === 'darkbg' ? "h3Light mt-6 text-white" : "h3Light mt-6 "}>Do your bit for the environment by lending and renting equipment.</div>
                      </div>
                        <div className="searchBxHome mt-12 ml-auto items-center flex flex-row">
                        <input
                                  id="searchWord"
                                  name="searchWord"
                                  type="text"
                                  required
                                  className="border-0 noRing bg-transparent w-11/12 ml-7 genBold text-white py-2"
                                  placeholder="Cameras, laptops, speakers, drones..."
                                  value={searchWord}
                                  onChange={(event) => {
                                    setSearchWord(event.target.value)
                                  }}
                                  onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                    // console.log('do validate');
                                    history.push({ 
                                       pathname: '/search',
                                       state: searchWord
                                      });

                                  }
                                  }}
                                />
                          <div 
                            className="w-10 h-10 rounded-full flex justify-center items-center ml-auto mr-2" 
                            style={{"backgroundColor": "#0B1A2C"}}
                            onClick={() => {
                              history.push({ 
                                         pathname: '/search',
                                         state: searchWord
                                        });
                            }}

                            >
                            <SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                      </div>
                    </div>

                    <div className='w-1/2 relative' >
                      <img className='w-100 ml-28' alt='camera' src="../renHomeStereo.png" />
                      <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                      <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                        <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>SOUNDBOKS</div>
                        <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>(GEN. 3)</div>
                      </div>
                    </div>
                  </div>

              </div>
         
        </div>
        <div className="each-fade">
        <div 
                  style={{'height':'90vh'}}
                  className={create === 'darkbg' ? "relative w-full darkbg" : "relative w-full "} 
                >
                  <div className={create === 'darkbg' ? "flex w-100  h-5/6" : "flex w-100  h-5/6 "}>
                      <div className={create === 'darkbg' ? 'w-1/2 flex flex-col darkbg' : 'w-1/2 flex flex-col '}>
                        <h2 className={create === 'darkbg' ? "heroFont mt-16 text-white" : "heroFont mt-16 "}>No long-term commitments.</h2>
                        <h2 className={create === 'darkbg' ? "heroFont  text-white" : "heroFont "}>Always use the latest gear.</h2>
                        <div className="w-10/12">
                          <div className={create === 'darkbg' ? "h3Light mt-6 text-white" : "h3Light mt-6 "}>Use the newest technology, never fall behind.</div>
                        </div>
                          <div className="searchBxHome mt-12 ml-auto items-center flex flex-row">
                        <input
                                  id="searchWord"
                                  name="searchWord"
                                  type="text"
                                  required
                                  className="border-0 noRing bg-transparent w-11/12 ml-7 genBold text-white py-2"
                                  placeholder="Cameras, laptops, speakers, drones..."
                                  value={searchWord}
                                  onChange={(event) => {
                                    setSearchWord(event.target.value)
                                  }}
                                  onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                    // console.log('do validate');
                                    history.push({ 
                                       pathname: '/search',
                                       state: searchWord
                                      });

                                  }
                                  }}
                                />
                          <div 
                            className="w-10 h-10 rounded-full flex justify-center items-center ml-auto mr-2" 
                            style={{"backgroundColor": "#0B1A2C"}}
                            onClick={() => {
                              history.push({ 
                                         pathname: '/search',
                                         state: searchWord
                                        });
                            }}

                            >
                            <SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                      </div>
                      </div>

                      <div className='w-1/2 relative' >
                        <img className='w-100 ml-auto' alt='camera' src="../renHomeDrone.png" />
                        <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                        <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>DJI Mavic 2 Pro with</div>
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Hasselblad Camera</div>
                        </div>
                      </div>
                  </div>
                </div>
          
        </div>
      </Fade>
    </div>
    </div>
  )
}











export default Me;