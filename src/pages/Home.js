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
            <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
              <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
                style={{'width': '20%', 'marginLeft':'0px', 'marginRight': '0px'}}
              ></button>
              <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to="1"
                aria-label="Slide 1"
                style={{'width': '20%', 'marginLeft':'0px', 'marginRight': '0px'}}
              ></button>
              <button
                data-bs-target="#carouselDarkVariant"
                data-bs-slide-to="2"
                aria-label="Slide 1"
                style={{'width': '20%', 'marginLeft':'0px', 'marginRight': '0px'}}
              ></button>
            </div>

            <div className="carousel-inner relative w-full  ">
                <div className={create === 'darkbg' ? "carousel-item active relative float-left w-full darkbg" : "carousel-item active relative float-left w-full "} 
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
                      {mainImages && <img className='w-100 ml-auto' alt='camera' src={mainImages[0].mainimage.url} /> }
                      <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                      <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Canon EOS M50 Black + EF-M 15-45mm IS STM </div>
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Lens Black</div>
                      </div>
                    </div>

                  </div>

                </div>


                <div 
                  style={{'height':'90vh'}}
                  className={create === 'darkbg' ? "carousel-item relative float-left w-full darkbg" : "carousel-item relative float-left w-full "} 
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
                      <img className='w-100 ml-auto' alt='camera' src="../renHomeStereo.png" />
                      <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                      <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                        <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>SOUNDBOKS</div>
                        <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>(GEN. 3)</div>
                      </div>
                    </div>
                  </div>

              </div>



                <div 
                  style={{'height':'90vh'}}
                  className={create === 'darkbg' ? "carousel-item relative float-left w-full darkbg" : "carousel-item relative float-left w-full "} 
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
                        <img className='w-100 ml-auto' alt='camera' src="../renHomeDrone.png" />
                        <div className={create === 'darkbg' ? "absolute rectangle1" : "absolute rectangle"}></div>
                        <div className="topLine ml-auto mr-4 mt-16 pt-3 w-1/3">
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>DJI Mavic 2 Pro with</div>
                          <div className={create === 'darkbg' ? "miniText text-white" : "miniText" }>Hasselblad Camera</div>
                        </div>
                      </div>
                  </div>
                </div>

                <button
                  class="carousel-control-prev absolute top-auto bottom-4 left-auto right-16 h-8 w-9 flex items-center justify-center p-0  border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline "
                  type="button"
                  data-bs-target="#carouselDarkVariant"
                  data-bs-slide="prev"
                >
                  <span class={create === 'darkbg' ? " carousel-control-prev-icon carousel-control-prev-iconD inline-block bg-no-repeat" : "carousel-control-prev-icon inline-block bg-no-repeat"} aria-hidden="true"></span>
                </button>
                <button
                  class="carousel-control-next absolute top-auto bottom-4 left-auto right-5 h-8 flex items-center justify-end p-0 border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                  type="button"
                  data-bs-target="#carouselDarkVariant"
                  data-bs-slide="next"
                >
                  <span class={create === 'darkbg' ? "carousel-control-next-icon carousel-control-next-iconD inline-block bg-no-repeat" :"carousel-control-next-icon inline-block bg-no-repeat" } aria-hidden="true"></span>
                </button>
              </div>

            </div>


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
  <Footer />
            </div>


  );
}