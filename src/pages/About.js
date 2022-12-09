import React, {useState, useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl} from '../utils/products'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import Footer from '../components/Footer'



const formatImageUrl = (url) => `${API_URL}${url}`


/* This example requires Tailwind CSS v2.0+ */
export default function Example() {

  const [content, setContent] = useState(null)
  const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)


  useEffect(() => {

  getContent()

}, [])

const getContent = async (user) => {
    const response = await fetch(`${API_URL}/abouts`, {
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
      className={create === 'darkbg' ? "darkbg text-white relative" : "bg-white relative"}
    >
    <div  className=" absolute left-0 -top-32 -z-10">
         <img 
          src="../dotcurve.png"
          alt="" 
        />    
    </div> 
    <div className='sectWidth mx-auto pt-32 pb-16'>

    <h2 className={create === 'darkbg' ? "text-white" : ""}> ABOUT US</h2>

    <div className="flex flex-row w-full">

    <div  className=" flex justify-center items-center imgBx rounded-t-full rounded-b-lg w-2/5 z-10 relative">
      {simpleUser && simpleUser.image &&
         <img 
          src="../aboutpic.png"
          className="rounded-t-full rounded-b-lg w-full h-full object-cover" 
          alt="" 
          width="66%" 
        />
      }  
      <div className="genBold absolute -bottom-8  right-0">Founder of R.E.N</div>    
    </div> 
    <div className="w-3/5 pl-36">
    <h3 className="text-left blueTxt mb-8 aboutHeader">Hey, I’m Hawa!</h3>
    <div className="aboutGen">

      I’m a Technical Product Manager who cares deeply about social equity, sustainability and democratising access to consumer technology. 

 

      <div className="mt-3 aboutGen"> 
      Growing up in South-East London, I was always surrounded by creativity, diversity and a phenomenal amount of talent. A lot of us grew up hearing the phrase ‘you have so much potential’ over and over again…Eventually, I came to understand that having potential is not enough. You need to have access to the right resources to actually execute on your potential. I Founded Rent Equipment Now (R.E.N) to be a platform that powers potential.
      </div>
       
      <div className="mt-3 aboutGen"> 
      R.E.N is the first managed rental service platform to use R.E.N Credits, an innovative new approach to increase access to consumer technology and level the playing field!
       </div>     

    </div>
    </div>
    </div> 
    </div> 

    <div className="h-20 orangeBg flex items-center  ">
      <div className="sectWidth mx-auto px-4 flex items-center flex-row justify-between">
        <div>
          <img className="w-32" src="../micro.png" />
        </div>
        <div>
          <img className="w-32 " src="../micro.png" />
        </div>
        <div>
          <img className="w-32" src="../micro.png" />
        </div>
        <div>
          <img className="w-32" src="../micro.png" />
        </div>
      </div>
    </div>

    <div className="sectWidth mx-auto mt-20 relative">
     <div  className=" absolute -right-48 top-0 -z-10">
         <img 
          src="../dotcurve1.png"
          alt="" 
        />    
    </div> 
    <h3 className="text-left blueTxt mb-8 aboutHeader">What we stand for</h3>
    <div className="w-1/2 aboutGen">
    <div>

      I’m a Technical Product Manager who cares deeply about social equity, sustainability and democratising access to consumer technology. 
 

      <div className="mt-3"> 
<div className="genBold"> Access</div>

Everyone should have access to the practical tools they need to thrive. Spending excessive amounts of money should not be a prerequisite for being able to learn a new skill, produce your best work to pursue your passion, at R.E.N, we ensure that itʼs not.

</div>    
<div className="mt-3"> 
<div className="genBold">Innovation</div>

We value innovation and know how important it is to keep moving forward. R.E.N empowers renters to stay at the forefront of technical innovation.

</div>    
<div className="mt-3"> 
<div className="genBold">Sustainability</div>

Digital waste is a prevalent problem globally, R.E.N empowers renters and brand partners to consciously step into the sharing economy and use technology more sustainably.         
</div> 
</div> 
    </div>
    </div>

<div className="sectWidth mx-auto flex items-center flex-row justify-between items-center">

<div style={{"width": "31rem", height: "21rem"}} className="p-8 aboutgrad">
<div>
  <img 
    src="../orgSmile.png"
    alt="w-full" 
  />
  <div className="h3Bold text-white my-6"> Join the community</div>
  <div className="genLight text-white">Gain access to a wide variety of equipment and hardware from trusted brands</div>
  <button href="/contact" style={{"fontSize": "18px"}} className="orangeBg text-white py-2 w-64 text-center h3Bold rounded cursor-pointer mt-8">Get in touch!</button>
  
</div>
 
  
</div>
<div style={{"width": "44rem"}} className="z-10">
  <img 
    src="../aboutcon.png"
    alt="w-full" 
  />
  
</div>

</div>



    {content &&
      <div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              className={create === 'darkbg' ? "text-base font-semibold text-white tracking-wide uppercase" : "text-base font-semibold text-indigo-600 tracking-wide uppercase"}
            >{content[0].smallTitle}</h2>
            <p 
            className={create === 'darkbg' ? "mt-6 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl" : "mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"}
            >
              {content[0].largeTitle}
            </p>
            <p 
            className={create === 'darkbg' ? "max-w-xl mt-8 mx-auto text-xl text-white" : "max-w-xl mt-8 mx-auto text-xl text-gray-500"}
            >
              {content[0].mainBody}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    }
   
    </div>
  )
}




