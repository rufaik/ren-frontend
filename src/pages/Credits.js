import React, {useState, useEffect, useContext} from 'react'
import Footer from '../components/Footer'
import {UserContext} from '../context/UserContext'
import 'tw-elements';
import {API_URL} from '../utils/urls'
import 'animate.css'





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



const Credits = ({history}) => {


 const [userTypes, setUserTypes] = useState([])
 const {simpleUser, create} = useContext(UserContext)
 const [q1, setQ1] = useState(true)
 const [q2, setQ2] = useState(false)
 const [q3, setQ3] = useState(false)
 const [first1, setFirst1] = useState(1)



  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${API_URL}/posts`)
    
    }

    getPosts()

  }, [])


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      console.log("data", data[0].id)
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

      

            <div className={create === 'darkbg' ? 'mt-20 pb-8 -mb-20' : 'mt-20  pb-8 -mb-20'}>
              <div className='sectWidth mx-auto pt-32'>
                <h2 className={create === 'darkbg' ? 'text-white' : 'text-black'}> Powered by R.E.N Credits </h2>
                <div className={create === 'darkbg' ? 'h3Light text-white mt-4' : 'h3Light text-black mt-4'}> 
                At Rent Equipment Now, our currency is R.E.N Credits, buy them, spend them and best of all, share them! The R.E.N platform exists to increase access to the most innovative consumer technology on the market, we created R.E.N Credits to help us do just that.                
                </div>
                <div className={create === 'darkbg' ? 'h3Light text-white mt-4' : 'h3Light text-black mt-4'}> 
                All you need is the unique ID of the user/s you want to share credits with (this can be found in your account)...It’s really that simple!’
                </div>

















{/*                <Link to='/howitworks'> <button  className={create === 'darkbg' ? "findDrkBtn findTxt text-center text-black mt-10" : "findBtn findTxt text-center text-white mt-10"}>Find out more</button></Link>
*/}
               {!q1 && 
                  <div
                    onClick={() => { setQ1(true); setQ2(false); setQ3(false) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt1 h3Bold my-8 cursor-pointer' : 'questionTxt1 h3Bold my-8 cursor-pointer'}
                    >What can I do with my R.E.N Credits?
                    </div> 
              }

                {q1 &&
                <div className={create === 'darkbg' ? 'answerDrkBox1 w-full py-16 pl-16 mt-12 text-white' : 'answerBox1 bg-white w-full py-16 pl-16 mt-12 text-black'}>
                  <div className='h3Bold '>What can I do with my R.E.N Credits?</div>
                  <div className='flex flex-row'>
                      <div className='flex flex-col pt-12 w-48  mr-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='mac' src="../mac.png" />
                        </div>
                        <div className='genBold text-center mt-10'>
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
                          <div className='genBold text-center mt-10'>
                            Share R.E.N Credits with other registered users
                          </div>                        
                      </div>
                  </div>
                </div>
                }


               {!q2 && 
                  <div 
                  onClick={() => { setQ1(false); setQ2(true); setQ3(false) }} 
                  className={create === 'darkbg' ? 'unSelectedTxt1 h3Bold my-8 cursor-pointer' : 'questionTxt1 h3Bold my-8 cursor-pointer'}
                  >How do I get R.E.N Credits?
                  </div> 
              }
                
                {q2 &&
                <div className={create === 'darkbg' ? 'answerDrkBox1 w-full py-16 pl-16 mt-12 text-white' : 'answerBox1 w-full py-16 pl-16 mt-12 text-black'}>
                  <div className='h3Bold '>How do I get R.E.N Credits?</div>
                  <div className='flex flex-row'>
                      <div className='flex flex-col pt-12 w-48 mr-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='credit' src="../credit.png" />
                        </div>
                        <div className='genBold text-center  mt-10'>
                          Top up your R.E.N Credit balance with cash
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
                          <div className='genBold text-center mt-10'>
                            Be gifted R.E.N Credits from your friends or your university
                          </div>                     
                      </div>



                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='mac' src="../mac.png" />
                        </div>
                        <div className='genBold text-center mt-10'>
                          Be rewarded with R.E.N Credits for engaging with R.E.N!
                        </div>
                      </div>




{/*
                      <div className='flex flex-col pt-12 w-48 mx-10'>
                        <div className='h-16'>
                         <img className='w-100 mx-auto' alt='money' src="../money.png" />
                        </div>
                        <div className='genBold text-center text-white mt-10'>
                          Earn R.E.N Credits by listing your equipment, then convert your R.E.N Credits to cash!
                        </div>
                      </div>
*/}



                  </div>

                </div>

              }


               {!q3 && 
                  <div 
                    onClick={() => { setQ1(false); setQ2(false); setQ3(true) }} 
                    className={create === 'darkbg' ? 'unSelectedTxt1 h3Bold my-8 cursor-pointer' : 'questionTxt1 h3Bold my-8 cursor-pointer'}
                    >What is the Pound to R.E.N Credit conversion rate?
                    </div>
              }
                
                {q3 &&
                <div className={create === 'darkbg' ? 'answerDrkBox1 w-full py-16 pl-16 mt-12 pb-10 text-white' : 'answerBox1 w-full py-16 pl-16 mt-12 pb-10 text-black'}>
                  <div className='h3Bold'>What is the Pound to R.E.N Credit conversion rate?</div>
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
                        <div className='genBold text-center  mt-6'>
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
                         <div className="conversionBox bg-white text-black mt-10 genBold py-1 pl-2 w-8/12 mx-auto"> {first1 * 1}
                        </div>
                          <div className='genBold text-center mt-6'>
                            R.E.N Credit
                          </div>
                        
                      </div>
                  </div>

                </div>
              }


              </div>
            </div>

           <div className="-mt-16"> 
  <Footer />
  </div>
            </div>


  );
}


export default Credits;

