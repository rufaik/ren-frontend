import React, {useState, useEffect, useContext} from 'react'
import {API_URL} from '../utils/urls'
import {UserContext} from '../context/UserContext'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'




/* This example requires Tailwind CSS v2.0+ */
export default function Example() {

  const [content, setContent] = useState(null)
  const { create} = useContext(UserContext)


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
    <>
    { content &&

    <div 
      className={create === 'darkbg' ? "darkbg text-white relative" : "bg-white relative"}
    >
    <div  className=" absolute left-0 -top-32 -z-10">
         <img 
          src="../dotcurve.png"
          alt="curve" 
        />    
    </div> 
    <div className='sectWidth mx-auto pt-32 pb-16'>

    <h2 className={create === 'darkbg' ? "text-white" : ""}> {content[0].header}</h2>

    <div className="flex flex-row w-full">

    <div  className=" flex justify-center items-center imgBx rounded-t-full rounded-b-lg z-10 relative">
 
         <img 
          src={content[0].heroImg.url}
          className="rounded-t-full rounded-b-lg w-full h-full object-cover" 
          alt="ren" 
          width="66%" 
        />
       
      <div className="genBold absolute -bottom-8  right-0">Founder of R.E.N</div>    
    </div> 
    <div className="w-8/12 pr-10 pl-36">
    <h3 className="text-left blueTxt mb-8 aboutHeader">{content[0].firstSubHeading}</h3>
    <div className="aboutGen">
      <ReactMarkdown children={content[0].introTxt} remarkPlugins={[remarkGfm]} />

    </div>
    </div>
    </div> 
    </div> 

    <div className="h-20 orangeBg flex items-center  ">
      <div className="sectWidth mx-auto px-4 flex items-center flex-row justify-between">
        <div>
          <img className="w-32" alt="sponsor" src={content[0].orangeBxImage1 && content[0].orangeBxImage1.url} />
        </div>
        <div>
          <img className="w-32" alt="sponsor" src={content[0].orangeBxImage2 && content[0].orangeBxImage2.url} />
        </div>
        <div>
          <img className="w-32" alt="sponsor" src={content[0].orangeBxImage3 && content[0].orangeBxImage3.url} />
        </div>
        <div>
          <img className="w-32" alt="sponsor" src={content[0].orangeBxImage4 && content[0].orangeBxImage4.url} />
        </div>
      </div>
    </div>

    <div className="sectWidth mx-auto mt-20 relative">
     <div  className=" absolute -right-48 top-0 -z-10">
         <img 
          src="../dotcurve1.png"
          alt="curve" 
        />    
    </div> 
    <h3 className="text-left blueTxt mb-8 aboutHeader">{content[0].secondSubHeading}</h3>
    <div className="w-1/2 aboutGen mb-20">
    <div>

  <ReactMarkdown children={content[0].aboutRenTxt} remarkPlugins={[remarkGfm]} />

  
</div> 
    </div>
    </div>

<div className="sectWidth mx-auto flex items-center flex-row justify-between items-center">

<div style={{"width": "31rem", height: "21rem"}} className="p-8 aboutgrad">
<div>
  <img 
    src="../orgSmile.png"
    alt="smile" 
  />
  <div className="h3Bold text-white my-6"> {content[0].purpleBxHeader}</div>
  <div className="genLight text-white">{content[0].purpleBxTxt}</div>
  <button href="/contact" style={{"fontSize": "18px"}} className="orangeBg text-white py-2 w-64 text-center h3Bold rounded cursor-pointer mt-8">Get in touch!</button>
  
</div>
 
  
</div>
<div style={{"width": "44rem"}} className="z-10">
  <img 
    src={content[0].purpleBxImg.url}
    alt="contact" 
  />
  
</div>

</div>


 <Footer />
   
    </div>
  }
  </>
  )
}




