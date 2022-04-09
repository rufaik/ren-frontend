import React, {useState, useEffect, useContext, Fragment} from 'react'
import {UserContext} from '../context/UserContext'
import {API_URL} from '../utils/urls'
import Footer from '../components/Footer'
import { Dialog, Transition } from '@headlessui/react'


export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [error, setError] = useState('')
 const [open, setOpen] = useState(true)


const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
console.log('user', user)



const handleSubmit = async (event) => {
  event.preventDefault()
    
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





  return (
    <div className="SignUp">
  	   

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
              <div className="h3Bold mt-12 text-center">Top up your R.E.N Coins</div>
              <div className="gryLine2 w-full mt-6 mb-10"></div>
{/*              <div className="h3Sub my-4 ">Canon EOS M50 Black + EF-M 15-45mm IS STM Lens Black</div>
*/}              
               
         
              
    <form className="shareBox mx-auto mt-8 " onSubmit={handleSubmit}>
      
      <div className="flex flex-row item-center">
       <input
          value={firstName}
          placeholder="Enter user unqiue code"
          className="profileBox pl-4"
          onChange={(event) => {
            setFirstName(event.target.value)}}
        />
      <input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="profileBox ml-1 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />
      </div>
       <input
          value={firstName}
          placeholder="Enter user unqiue code"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setFirstName(event.target.value)}}
        />
      <input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />
       <input
          value={firstName}
          placeholder="Enter user unqiue code"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setFirstName(event.target.value)}}
        />
      <input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />
       <input
          value={firstName}
          placeholder="Enter user unqiue code"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setFirstName(event.target.value)}}
        />
      <input
          value={lastName}
          placeholder="Number of R.E.N Coins"
          className="uniqueBox mt-2 pl-4"
          onChange={(event) => {
            setLastName(event.target.value)}}
        />

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
             
              
              

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


  	 









    </div>
  );
}