import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {API_URL} from '../utils/urls'
import Footer from '../components/Footer'
import ImageUploading from "react-images-uploading";


export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [error, setError] = useState('')
const [alreadyUser, setAlreadyUser] = useState(false)


const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
console.log('user', user)


// useEffect(() => {
//   if(user){
    
//     window.location.href = '/home'
//   }
// }, [user])

const checkUser = (event) => {
  event.preventDefault()

    if(user) {
    setAlreadyUser(true)
  }else {
    handleSubmit()
}
}

const handleSubmit = async () => {
  
  try{
          const response = await fetch(`${API_URL}/auth/local/register`, {
          method: 'POST',
          headers: {
          'Content-Type':'application/json'
          },
          body: JSON.stringify({
          email,
          password,
          username: email,
          name: firstName,
          surname: lastName
          })
        })
      
        const data = await response.json()
        console.log("data", data) 
      
        if(data.message){
          setError(data.message[0].messages[0].message)
      
          return //Stop execution
        } 
        saveImage(data)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        localStorage.setItem('simpleUser', JSON.stringify(data.user))
        setSimpleUser(data.user)
        createUsername(data)




     } catch(err){
      setError('Something went wrong', err)
     }      

}


   const createUsername = async (data) => {
    console.log()
    const username1 = data.user.name + "-" + data.user.surname.charAt(0) + "-" + getRndInteger(100, 1000) + data.user.id

      console.log("username", username1.toLowerCase())
    const data2 = {
      username: username1.toLowerCase()      
    }

      try{
        const response = await fetch(`${API_URL}/users/${data.user.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${data.jwt}`
            },
            body: JSON.stringify(data2)
          })

          const shared = await response.json()
          console.log(shared)
         localStorage.setItem('simpleUser', JSON.stringify(shared))
         

      } catch(err){
    console.log("Exception ", err)}

    }  


  useEffect(() => {
     if( simpleUser ){
      const username = simpleUser.name + "-" + simpleUser.surname.charAt(0) + "-" + getRndInteger(100, 1000) + simpleUser.id

      console.log("username", username.toLowerCase())
     }

    // console.log("products", products)

  }, [simpleUser])

  const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}


const formatImageUrl = (url) => `${API_URL}${url}`



  const [image, setImages] = React.useState([]);
  const [image1, setImages1] = React.useState([]);
  const [showSave, setShowSave] = useState(true)
  console.log("image", image)
  console.log("image1", image1)

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("iiiiii", imageList, addUpdateIndex);
    setImages(imageList);
    console.log("imageList", imageList)
  };  

    const onChange1 = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("pppppp",imageList, addUpdateIndex);
    setImages1(imageList);
    console.log("imageList2", imageList)
  };

  const saveImage = async (info) => {

    console.log('handling1')


    const formData = new FormData()
    formData.append('data', JSON.stringify({ status: "submitted", users_permissions_user: parseInt(info.user.id)}))
    formData.append('files.image', image[0].file)
    formData.append('files.image1', image1[0].file)
    
  try{
        const response = await fetch(`${API_URL}/verifies`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY2ODE5OTkzMCwiZXhwIjoxNjcwNzkxOTMwfQ.ftfPfYfLx0FmQcnu6jebuyXmEsPsp9twHFA_aHKMcs4`
          },          
          body: formData
        })


  
        const data = await response.json()
       
        console.log("dataK1", data) 
        window.location.href = '/home'

      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }




  return (
    <div 
      className={create === 'darkbg' ? "SignUp text-white" : "SignUp"}
    >
  	   

  	   

    <form className="shareBox mx-auto mt-8 " onSubmit={handleSubmit}>
      <div className=" ">

  

        <div className="py-4  space-y-6  sm:space-y-5">
            <h2 
              className="mt-1 text-center text-3xl font-extrabold text-gray-900"
              className={create === 'darkbg' ? "mt-1 text-center text-3xl font-extrabold text-white" : "mt-1 text-center text-3xl font-extrabold text-gray-900"}
            >Sign Up!</h2>
            <div className="shareBox mx-auto gen text-center mt-4 mb-7">Already have an accout? <a href="/login" className="orangeTxt">Log in </a></div>



          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start ">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="First Name"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                  onChange={(event) => {
                    setError('')
                    setFirstName(event.target.value)
                  }}

                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                  onChange={(event) => {
                    setError('')
                    setLastName(event.target.value)
                  }}

                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="Email address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => {
                    setError('')
                    setEmail(event.target.value)
                  }}
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(event) => {
                    setError('')
                    setPassword(event.target.value)
                  }}                  
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="Confirm Password"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="off"
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-4 pl-4" : "uniqueBox mt-4 pl-4"}
                />
              </div>
            </div>


   
          </div>
        </div>

        
      </div>
      <div 
        className="genBold pt-2">
        ID Verification
      </div>      
      <div 
        className="gen">
        Please upload your ID and utility bill, it will take 2-3 days to verify your identity
      </div>

      <div className="flex justify-center mt-4">
              
               
                    <ImageUploading
                        multiple={false}
                        value={image}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper relative">
                          {console.log(imageList)}
                            <div
                              style={isDragging ? { color: "red" } : null}
                              className="imgBx2 mr-2 rounded-t-lg border border-black-100 cursor-pointer rounded-b-lg flex justify-center items-center"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                             
                                 <img className="w-100" src="../camsketch.png" />

                               
                              {simpleUser && simpleUser.image === null
                                ? <img className="absolute uploadSketch" src="../upload.png" /> 
                                : null
                              }
                              
                              {imageList.map((image, index) => (
                              <div key={index} className=" flex justify-center items-center imgBx2 rounded-t-lg rounded-b-lg absolute top-0 left-0">
                                <img src={image.data_url} className="rounded-t-lg rounded-b-lg w-full h-full object-cover" alt="" width="66%" />
                                
                              </div>
                            ))}

                            </div>
                      
                          </div>
                        )}
                    </ImageUploading>
                    <ImageUploading
                        multiple={false}
                        value={image1}
                        onChange={onChange1}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper relative">
                          {console.log(imageList)}
                            <div
                              style={isDragging ? { color: "red" } : null}
                              className="imgBx2 ml-2 overflow-hidden rounded-t-lg border border-black-100 cursor-pointer rounded-b-lg flex justify-center items-center"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                             
                                 <img className="w-100" src="../camsketch.png" />

                               
                              {simpleUser && simpleUser.image === null
                                ? <img className="absolute uploadSketch" src="../upload.png" /> 
                                : null
                              }
                              
                              {imageList.map((image1, index) => (
                              <div key={index} className=" flex justify-center items-center imgBx2 rounded-t-lg rounded-b-lg absolute top-0 left-0">
                                <img src={image1.data_url} className="rounded-t-lg rounded-b-lg w-full h-full object-cover" alt="" width="66%" />
                                
                              </div>
                            ))}

                            </div>
                        
                          </div>
                        )}
                    </ImageUploading>


             
                  </div>

      <div className="pt-5">
        <div className="flex justify-center ">
          <button
            // type="submit"
            onClick={checkUser}
           // onClick={(event) => handleSubmit(event)} 
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
         
        </div>
      </div>
       {alreadyUser &&
            <div className="orangeTxt mx-auto text-center mt-4">
            Please logout before you sign up
            </div>
          }
    </form>

{error && <p>{error}</p>}






  <Footer />


    </div>
  );
}