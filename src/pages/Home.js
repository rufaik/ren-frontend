import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import Post from '../components/Post'
import Footer from '../components/Footer'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {UserContext} from '../context/UserContext'
import VerifyButton from "@passbase/button/react";
import Marquee from "react-fast-marquee";
import 'tw-elements';
import {Verify} from './Verify'
import { SearchIcon } from '@heroicons/react/outline'
import {API_URL} from '../utils/urls'
import 'animate.css'




const formatImageUrl = (url) => `${API_URL}${url}`

// const cardDets = [
//   {
//     imagesrc: "",
//     title:"I am a creative",
//     text:"Calling all creatives! The freelancers the dream chasers and everyone in-between, get inspired by how other creatives are using Rent Equipment Now to get closer to their goals..."
//   },
//   {
//     imagesrc: "I am a University",
//     title:"",
//     text:"Make sure your students and Graduates have a competitive edge by giving them access to the best technology available. Rent Equipment Now can help you to help them. Here’s how..."
//   },
//   {
//     imagesrc: "",
//     title:"",
//     text:""
//   },
//   {
//     imagesrc: "",
//     title:"",
//     text:""
//   },

// ]



export default ({history}) =>{


 const [posts, setPosts] = useState([])
 const [products, setProducts] = useState([])
 const [userTypes, setUserTypes] = useState([])
 const {user, setUser, simpleUser, setSimpleUser, create, mainImages} = useContext(UserContext)
 const [q1, setQ1] = useState(true)
 const [q2, setQ2] = useState(false)
 const [q3, setQ3] = useState(false)
 const [q4, setQ4] = useState(false)
 const [q5, setQ5] = useState(false)
 const [first1, setFirst1] = useState(1)
 const [darkMode, setDarkMode] = useState(true)
 const [verify, setVerify] = useState(false)
 const [searchWord, setSearchWord] = useState('')
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
                console.log("side", data)
                setContent(data);
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
            }         
        }


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
      console.log("data", data[0].id)
      setProducts(data)
    }

    getProducts()
    // console.log("products", products)

  }, [])




    useEffect(() => {
    const getUserTypes = async () => {
      const response = await fetch(`${API_URL}/identity-cards`)
      const data = await response.json()
      console.log("data", data)
      setUserTypes(data)
    }

    getUserTypes()
    console.log("userTypes", userTypes)

  }, [])

  console.log("home", simpleUser)






  return (
    <div className={create === 'darkbg' ? 'darkbg' : null}>
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
        {verify &&
          <Verify />
          }
        <div
          id="carouselDarkVariant"
          // className="carousel slide carousel-fade carousel-dark relative sectWidth mx-auto mt-10"
          className="carousel slide carousel-fade carousel-dark relative sectWidth mx-auto mt-10 "
          data-bs-ride="carousel"
        >

            <div className="carousel-inner relative w-full  ">
                <div className={create === 'darkbg' ? "carousel-item active relative float-left w-full darkbg " : "carousel-item active relative float-left w-full "} 
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
                      <h2 className={create === 'darkbg' ? "heroFont mt-16 text-white" : "heroFont mt-16 "}>A PLATFORM THAT</h2>
                      <h2 className={create === 'darkbg' ? "heroFont text-white" : "heroFont orangeCol"}>POWERS POTENTIAL</h2>
                      <div className="w-10/12">
                        <div className={create === 'darkbg' ? "h3Light mt-6 text-white" : "h3Light mt-6 "}>Rent the kit you need from the brands you love all in one place.</div>
                      </div>
                      <div className="searchBxHome mt-12 items-center flex flex-row">
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
                                    console.log('do validate');
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
                      {mainImages &&<div className='flex justify-center ml-8 -mr-8 -mt-12 animate__animated animate__zoomIn' > <img className='w-100 ml-auto' alt='camera' src="../newMain.png"/></div> }
{/*                      <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
*/}                   {/*   <div className="topLine h-10  bottom-0 right-0 ml-auto mr-4 mt-16 pt-3 w-1/3">
{                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Canon EOS M50 Black + EF-M 15-45mm IS STM </div>
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Lens Black</div>
}                      </div>*/}
                    </div>

                  </div>

                </div>

            
              </div>

            </div>

           
            <Marquee
              className="grybg text-white moving genBold py-2 h-12"
              gradient={false}
              speed={60}
              style={{"fontSize": "19px"}}
            >
            Access a wide range of tech - Use it sustainably - No long term commitments - No hassle.
              </Marquee>
              <div className={create === 'darkbg' ? '' : 'lightGrBg'}>

                <div className='sectWidth mx-auto pt-32 pb-28'>
                  <h2 className={create === 'darkbg' ? 'text-white' : 'text-black'}> RENTERS LOVE US! </h2>
                <div className="flex flex-row ">

                <div className="w-60 h-96 relative mr-4 ">
                  <div className="bg-black h-24 w-24 rounded-full absolute top-4 left-0 right-0 mx-auto z-10">
                    <img className='w-full' alt='ren' src="../r3.png" />
                  </div>
                  <div className={create === 'darkbg' ? 'darkBx h-80 w-full rounded bottom-0 absolute reviewShadow1 text-white' : 'bg-white h-80 w-full rounded bottom-0 absolute reviewShadow text-black'} >
                  <div className="flex flex-row justify-center items-center pt-16">
                    <div className="genBold mr-2">  Ayokunle A</div>
                    <img className='w-1 h-1 rounded-full' alt='dot' src="../dot1.png" />
                    <div className="genLight ml-2"> Videographer</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center mt-2">
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    
                  </div>
                  <div className="reviewTxt text-center px-4 pt-4">
Straightforward and easy process. Hawa was very flexible and made the whole process so much easier. Also an extremely nice team which always helps. Defo recommend and i'll be back myself!                  
                  </div>

                  </div>
                </div>
                <div className="w-60 h-96 relative mr-4 ">
                  <div className="bg-black h-24 w-24 rounded-full absolute top-4 left-0 right-0 mx-auto z-10">
                    <img className='w-full' alt='ren' src="../r1.png" /></div>
                  <div className={create === 'darkbg' ? 'darkBx h-80 w-full rounded bottom-0 absolute reviewShadow1 text-white' : 'bg-white h-80 w-full rounded bottom-0 absolute reviewShadow text-black'} >
                  <div className="flex flex-row justify-center items-center pt-16">
                    <div className="genBold mr-2">  Lara C</div>
                    <img className='w-1 h-1 rounded-full' alt='dot' src="../dot1.png" />
                    <div className="genLight ml-2"> Entrepreneur</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center mt-2">
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    
                  </div>
                  <div className="reviewTxt text-center px-4 pt-4">
                    Amazing! Such a good speaker, excellent communication from R.E.N throughout and they made sure the speakers were fully charged and ready for us to use! 😍👏
                  </div>

                  </div>
                </div>
                <div className="w-60 h-96 relative mr-4 ">
                  <div className="bg-black h-24 w-24 rounded-full absolute top-4 left-0 right-0 mx-auto z-10">
                    <img className='w-full' alt='ren' src="../r2.png" /></div>
                  <div className={create === 'darkbg' ? 'darkBx h-80 w-full rounded bottom-0 absolute reviewShadow1 text-white' : 'bg-white h-80 w-full rounded bottom-0 absolute reviewShadow text-black'} >
                  <div className="flex flex-row justify-center items-center pt-16">
                    <div className="genBold mr-2"> Godiah V</div>
                    <img className='w-1 h-1 rounded-full' alt='dot' src="../dot1.png" />
                    <div className="genLight ml-2">  Insurance Adjuster</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center mt-2">
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    
                  </div>
                  <div className="reviewTxt text-center px-4 pt-4">
Such a lovely team, very patient and understanding! communication was 10/10! Kit was amazing! 100% recommend!                  
                  </div>

                  </div>
                </div>
                <div className="w-60 h-96 relative mr-4 ">
                  <div className="bg-black h-24 w-24 rounded-full absolute top-4 left-0 right-0 mx-auto z-10">
                    <img className='w-full' alt='ren' src="../r5.png" /></div>
                  <div className={create === 'darkbg' ? 'darkBx h-80 w-full rounded bottom-0 absolute reviewShadow1 text-white' : 'bg-white h-80 w-full rounded bottom-0 absolute reviewShadow text-black'} >
                  <div className="flex flex-row justify-center items-center pt-16">
                    <div className="genBold mr-2"> Viktor G</div>
                    <img className='w-1 h-1 rounded-full' alt='dot' src="../dot1.png" />
                    <div className="genLight ml-2"> Photographer</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center mt-2">
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    
                  </div>
                  <div className="reviewTxt text-center px-4 pt-4">
Great service, would recommend to anyone looking for high quality equipment                  
                  </div>

                  </div>
                </div>
                <div className="w-60 h-96 relative ">
                  <div className="bg-black h-24 w-24 rounded-full absolute top-4 left-0 right-0 mx-auto z-10">
                    <img className='w-full' alt='ren' src="../r4.png" /></div>
                  <div className={create === 'darkbg' ? 'darkBx h-80 w-full rounded bottom-0 absolute reviewShadow1 text-white' : 'bg-white h-80 w-full rounded bottom-0 absolute reviewShadow text-black'} >
                  <div className="flex flex-row justify-center items-center pt-16">
                    <div className="genBold mr-2"> Daniella</div>
                    <img className='w-1 h-1 rounded-full' alt='dot' src="../dot1.png" />
                    <div className="genLight ml-2">  Event Manager</div>
                  </div>
                  <div className="flex flex-row mx-auto justify-center mt-2">
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    <div className='w-6 px-0.5'>
                      <img className='w-full' alt='star' src="../star1.png" />
                    </div>
                    
                  </div>
                  <div className="reviewTxt text-center px-4 pt-4">
R.E.N is such an amazing and friendly service, the speakers were fantastic! Thank you so much, we really appreciate it.                 
                  </div>

                  </div>
                </div>
              </div>


            </div>

              </div>
              
              


{ content &&
              <div className='pb-56'>
                <div className={create === 'darkbg' ? 'sectWidth mx-auto pt-32 text-white' : 'sectWidth mx-auto pt-32 text-black'}>
                <h2> HOW IT WORKS</h2>
                <div className="h3Light mt-12">
                R.E.N makes it easy for you to access the kit you need from the brands you love, without breaking the bank. Our managed rental service means no more awkward pick-ups from strangers. All our items are QA tested, insured and delivered to your door in just a few days.
                </div>
                </div>
                <div>
                <div className="mt-10 flex flex-row px-12 justify-center relative">
                <div  className="sectWidth absolute top-16 z-10">
                          <img
                            className="w-full"
                            src="../homedot.svg"
                          />
                        </div>
                  <div className=" relative mr-48 z-20">

                      <div className={create === 'darkbg' ? "outlineText1Drk" : "outlineText1"}>
                      1
                      </div>
                      <div className="blueBg4 py-10 px-8 w-60 h-96 absolute rounded top-36 left-20">
                        <div  className="w-12">
                          <img
                            className="w-full"
                            src="../calH.png"
                          />
                        </div>
                        <div className="h3Bold text-white mt-4">
                        {content && content[0].card1Title}
                        </div>
                        <div className="genLight text-white mt-4">
                        {content && content[0].card1Text}
                        </div>
                      </div>
                  </div>
                  <div className=" relative mr-48 z-20">

                      <div className={create === 'darkbg' ? "outlineText1Drk" : "outlineText1"}>
                      2
                      </div>
                      <div className="blueBg1 py-10 px-8 w-60 h-96 absolute rounded top-36 left-20">
                        <div  className="w-12">
                          <img
                            className="w-full"
                            src="../camH.png"
                          />
                        </div>
                        <div className="h3Bold text-white mt-4">
                        {content && content[0].card2Title}
                        </div>
                        <div className="genLight text-white mt-4">
                        {content && content[0].card2Text}
                        </div>
                      </div>
                  </div>                
                  <div className=" relative mr-48 z-20">

                      <div className={create === 'darkbg' ? "outlineText1Drk" : "outlineText1"}>
                      3
                      </div>
                      <div className="blueBg2 py-10 px-8 w-60 h-96 absolute rounded top-36 left-20">
                        <div  className="w-12">
                          <img
                            className="w-full"
                            src="../vec1.png"
                          />
                        </div>
                        <div className="h3Bold text-white mt-4">
                        {content && content[0].card3Title}
                        </div>
                        <div className="genLight text-white mt-4">
                        {content && content[0].card3Text}
                        </div>
                      </div>
                  </div>                
                  <div className=" relative mr-48 z-20">

                      <div className={create === 'darkbg' ? "outlineText1Drk" : "outlineText1"}>
                      4
                      </div>
                      <div className="blueBg3 py-10 px-8 w-60 h-96 absolute rounded top-36 left-20">
                        <div  className="w-12">
                          <img
                            className="w-full"
                            src="../chat.png"
                          />
                        </div>
                        <div className="h3Bold text-white mt-4">
                        {content && content[0].card4Title}
                        </div>
                        <div className="genLight text-white mt-4">
                        {content && content[0].card4Text}
                        </div>
                      </div>
                  </div>                

                  </div>
                </div>
              </div>

}


{/*
            <div className={create === 'darkbg' ? 'grybg pb-8' : 'bluebg pb-8'}>
              <div className='sectWidth mx-auto pt-32'>
                <h2 className={create === 'darkbg' ? 'text-black' : 'text-white'}> Powered by R.E.N Credits </h2>
                <div className={create === 'darkbg' ? 'h3Light text-black mt-4' : 'h3Light text-white mt-4'}> At Rent Equipment Now, our currency is R.E.N Credits.</div>
                <div className={create === 'darkbg' ? 'h3Light text-black mt-1' : 'h3Light text-white mt-1'}>Buy them. Earn them. Share them! </div>
                <Link to='/howitworks'> <button  className={create === 'darkbg' ? "findDrkBtn findTxt text-center text-black mt-10" : "findBtn findTxt text-center text-white mt-10"}>Find out more</button></Link>

               {!q1 && 
                  <div
                    onClick={() => { setQ1(true); setQ2(false); setQ3(false) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold my-8 cursor-pointer' : 'questionTxt h3Bold my-8 cursor-pointer'}
                    >What can I do with my R.E.N Credits?
                    </div> 
              }

                {q1 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-16 pl-16 mt-12' : 'answerBox w-full py-16 pl-16 mt-12'}>
                  <div className='h3Bold text-white'>What can I do with my R.E.N Credits?</div>
                  <div className='flex flex-row'>
                      <div className='flex flex-col pt-12 w-48  mr-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='mac' src="../mac.png" />
                        </div>
                        <div className='genBold text-center text-white mt-10'>
                          Rent all equipment on the platform
                        </div>
                      </div>


                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='relative h-16'>
                          <div className='absolute top-0 left-10'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                          <div className='absolute -top-8 right-9'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                        </div>
                          <div className='genBold text-center text-white mt-10'>
                            Rent all equipment on the platform
                          </div>                        
                      </div>
                  </div>
                </div>
                }


               {!q2 && 
                  <div 
                  onClick={() => { setQ1(false); setQ2(true); setQ3(false) }} 
                  className={create === 'darkbg' ? 'unSelectedTxt h3Bold my-8 cursor-pointer' : 'questionTxt h3Bold my-8 cursor-pointer'}
                  >How do I get R.E.N Credits?
                  </div> 
              }
                
                {q2 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-16 pl-16 mt-12' : 'answerBox w-full py-16 pl-16 mt-12'}>
                  <div className='h3Bold text-white'>How do I get R.E.N Credits?</div>
                  <div className='flex flex-row'>
                      <div className='flex flex-col pt-12 w-48 mr-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='credit' src="../credit.png" />
                        </div>
                        <div className='genBold text-center text-white mt-10'>
                          Top up your R.E.N credit balance with cash
                        </div>
                      </div>

                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='relative h-16'>
                          <div className='absolute top-0 left-10'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                          <div className='absolute -top-8 right-9'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                        </div>
                          <div className='genBold text-center text-white mt-10'>
                            Be gifted R.E.N Credits from your friends or your university
                          </div>                     
                      </div>



                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='mac' src="../mac.png" />
                        </div>
                        <div className='genBold text-center text-white mt-10'>
                          Earn R.E.N Credit rewards when you engaging with R.E.N
                        </div>
                      </div>





                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='money' src="../money.png" />
                        </div>
                        <div className='genBold text-center text-white mt-10'>
                          Earn R.E.N Credits by listing your equipment, then convert your R.E.N Credits to cash!
                        </div>
                      </div>




                  </div>

                </div>

              }


               {!q3 && 
                  <div 
                    onClick={() => { setQ1(false); setQ2(false); setQ3(true) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold my-8 cursor-pointer' : 'questionTxt h3Bold my-8 cursor-pointer'}
                    >What is the Pound to R.E.N Credit conversion rate?
                    </div>
              }
                
                {q3 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-16 pl-16 mt-12 pb-10' : 'answerBox w-full py-16 pl-16 mt-12 pb-10'}>
                  <div className='h3Bold text-white'>What is the Pound to R.E.N Credit conversion rate?</div>
                  <div className='flex flex-row relative'>
                      <div className='flex flex-col pt-12 w-48 mr-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='money' src="../money.png" />
                        </div>
                         <input
                          value={first1}
                          placeholder="£"
                          className="conversionBox bg-white text-black mt-10 genBold py-1 pl-2 w-8/12 mx-auto"
                          onChange={(event) => {
                            setFirst1(event.target.value)}}
                        />
                        <div className='genBold text-center text-white mt-6'>
                         Pound Sterling
                        </div>
                      </div>

                      <div className='absolute top-20 left-52'>
                       <img className='w-100 mx-auto' alt='arrow' src="../orgArrow.png" />
                      </div>

                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='relative h-16'>
                          <div className='absolute top-0 left-10'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                          <div className='absolute -top-8 right-9'>
                           <img className='w-100 mx-auto' alt='coin' src="../bigCoin.png" />
                          </div>
                        </div>
                         <div className="conversionBox bg-white text-black mt-10 genBold py-1 pl-2 w-8/12 mx-auto"> {first1 * 5}
                        </div>
                          <div className='genBold text-center text-white mt-6'>
                            R.E.N Credit
                          </div>
                        
                      </div>
                  </div>

                </div>
              }


              </div>
            </div>
*/}
             <Marquee
              className="orangeBg text-sm text-white moving normalBold py-2 h-12"
              gradient={false}
              speed={60}
              style={{"fontSize": "19px"}}
            >
            <div className="flex flex-row items-center h-12">
                <div className="mr-8 flex h-6"> <img className='h-full ' alt='camera' src="../armaWhite.png" /> </div>
                <div>We provide award winning protection in partnership with Arma Karma </div>
            </div>
              </Marquee>

{userTypes && userTypes[0] 
  ?         <div className="relative">
              <div className={create === 'darkbg' ? "backgroundDrkShape w-5/12 h-full top-0 right-0 -z-10" : "backgroundShape w-5/12 h-full top-0 right-0 -z-10"}></div>
              <div className='sectWidth mx-auto pt-36 pb-16  '>
                
                <h2 className={create === 'darkbg' ? 'text-white pb-16' : 'pb-16'}>Explore R.E.N whoever you are</h2>
                <div className='flex flex-row'>
                {userTypes.map((type, i) => {
                return(

                <Link 
                   to={{
                      pathname: '/type',
                      state: {
                        card: type.title
                      }
                    }}
                   
                  className={create === 'darkbg' ? 'identityCardDrk p-8 pt-12 mr-8 relative' : 'identityCard p-8 pt-12 mr-8 relative'}
                  >
                  <div className=''>
                    <img className='w-100' alt='icon' src={type.icon && type.icon.url} />
                  </div>
                  <div className={create === 'darkbg' ? 'text-white h3Bold my-4' : 'h3Bold my-4'}>{type.cardTitle}</div>
                  <div className={create === 'darkbg' ? 'text-white genLight' : 'genLight'}>{type.description}</div>
                  <div className='absolute bottom-4 right-6'>
                  <img className='w-100 ml-auto' alt='arrow' src="../arrow.png" />
                  </div>
                </Link >
              )})}
              </div>
              </div>
            </div>
    : null
}


<div className={create === 'darkbg' ? 'mt-20  pb-8' : 'mt-20 lightGrBg pb-8'}>
              <div className='sectWidth mx-auto pt-32'>
               <h2 className={create === 'darkbg' ? 'text-white' : 'text-black'}> FREQUENTLY ASKED QUESTIONS </h2>
               <div className={create === 'darkbg' ? 'text-white h3Light my-6' : 'h3Light my-6'}>The questions we get asked the most about our rental process.</div>
                



{/*                <Link to='/howitworks'> <button  className={create === 'darkbg' ? "findDrkBtn findTxt text-center text-black mt-10" : "findBtn findTxt text-center text-white mt-10"}>Find out more</button></Link>
*/}
               {!q1 && 
                  <div
                    onClick={() => { setQ1(true); setQ2(false); setQ3(false); setQ4(false); setQ5(false); }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold py-8 px-8 mt-12 cursor-pointer  flex flex-row items-center justify-between' : 'questionTxt h3Bold py-8 px-8 mt-12 cursor-pointer flex flex-row items-center justify-between'}
                    >
                    <div> What about insurance?</div>
                      <div className="w-8">
                        <img alt="arrow" src="../down.png" />
                      </div>
                    </div> 
              }

                {q1 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-8 px-8 mb-4' : 'answerBox w-full py-8 px-8 mt-12 mb-4'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className='h3Bold text-white'>What about insurance?</div>
                    <div className="h-8">
                          <img alt="arrow" className="h-full" src="../right.png" />
                    </div>
                  </div>
                 <div className='text-white genLight mt-6 pr-16'>
                 Yes! All of the equipment is insured with our partners at Arma Karma when you rent through R.E.N.
                 </div>

                </div>
                }


               {!q2 && 
                  <div 
                  onClick={() => { setQ1(false); setQ2(true); setQ3(false); setQ4(false); setQ5(false); }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold py-8 px-8 mt-12 cursor-pointer  flex flex-row items-center justify-between' : 'questionTxt h3Bold py-8 px-8 mt-12 cursor-pointer flex flex-row items-center justify-between'}
                  >
                    <div> How long is a rental day?</div>
                      <div className="w-8">
                        <img alt="arrow" src="../down.png" />
                      </div>
                  </div> 
              }
                
                {q2 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-8 px-8 mt-12 ' : 'answerBox w-full py-8 px-8 mt-12'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className='h3Bold text-white'>How long is a rental day?</div>
                    <div className="h-8">
                          <img alt="arrow" className="h-full" src="../right.png" />
                    </div>
                  </div>
                    <div className='text-white genLight mt-6 pr-16'>
                      Can I extend a hire? Sometimes plans change and you need the kit for longer than you thought you would, if this happens, feel free to give us a call and we’d be more than happy to help.                 
                    </div>

                </div>

              }


               {!q3 && 
                  <div 
                    onClick={() => { setQ1(false); setQ2(false); setQ3(true); setQ4(false); setQ5(false); }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold py-8 px-8 mt-12 cursor-pointer  flex flex-row items-center justify-between' : 'questionTxt h3Bold py-8 px-8 mt-12 cursor-pointer flex flex-row items-center justify-between'}
                    >
                    <div> How do I verify my ID?</div>
                      <div className="w-8">
                        <img alt="arrow" src="../down.png" />
                      </div>
                    </div>
              }
                
                {q3 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-8 px-8 mt-12' : 'answerBox w-full py-8 px-8 mt-12'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className='h3Bold text-white'>How do I verify my ID?</div>
                    <div className="h-8">
                          <img alt="arrow" className="h-full" src="../right.png" />
                    </div>
                  </div>
                    <div className='text-white genLight mt-6 pr-16'>
                 It’s simple, when creating your account you will be guided through the ID verification steps. It's quick and easy!

                    </div>

                </div>
              }

               {!q4 && 
                  <div 
                    onClick={() => { setQ1(false); setQ2(false); setQ3(false); setQ5(false); setQ4(true) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold py-8 px-8 mt-12 cursor-pointer  flex flex-row items-center justify-between' : 'questionTxt h3Bold py-8 px-8 mt-12 cursor-pointer flex flex-row items-center justify-between'}
                    >
                    <div> Do you deliver?</div>
                      <div className="w-8">
                        <img alt="arrow" src="../down.png" />
                      </div> 
                    </div>
              }
                
                {q4 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-8 px-8 mt-12' : 'answerBox w-full py-8 px-8 mt-12 pb-10'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className='h3Bold text-white'>Do you deliver? </div>
                    <div className="h-8">
                          <img alt="arrow" className="h-full" src="../right.png" />
                    </div>
                  </div>
                    <div className='text-white genLight mt-6 pr-16'>
                 We currently don't deliver but collection and drop off is easy, if you have any questions at all, just contact us. 
                    </div>

                </div>
              }

               {!q5 && 
                  <div 
                    onClick={() => { setQ1(false); setQ2(false); setQ3(false); setQ4(false); setQ5(true) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt h3Bold py-8 px-8 mt-12 cursor-pointer  flex flex-row items-center justify-between' : 'questionTxt h3Bold py-8 px-8 mt-12 cursor-pointer flex flex-row items-center justify-between'}
                    >
                    <div> How do I buy R.E.N Credits?</div>
                      <div className="w-8">
                        <img alt="arrow" src="../down.png" />
                      </div> 
                    </div>
              }
                
                {q5 &&
                <div className={create === 'darkbg' ? 'answerDrkBox w-full py-8 px-8 mt-12' : 'answerBox w-full py-8 px-8 mt-12'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className='h3Bold text-white'>How do I buy R.E.N Credits? </div>
                    <div className="h-8">
                          <img alt="arrow" className="h-full" src="../right.png" />
                    </div>
                  </div>
                    <div className='text-white genLight mt-6 pr-16'>
                 Simply top-up via your account and then you’re ready to rent! Find out more about R.E.N credits <span> <a href="/credits" className="underline"> here</a></span>.
                    </div>

                </div>
              }


              </div>
            </div>
  <Footer />
            </div>


  );
}