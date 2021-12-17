import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'


export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [error, setError] = useState('')


const {user, setUser} = useContext(UserContext)
console.log('user', user)


useEffect(() => {
  if(user){
    history.push('/')
  }
}, [user])

const handleSubmit = async (event) => {
  event.preventDefault()
    
  try{
          const response = await fetch('http://localhost:1337/auth/local/register', {
          method: 'POST',
          headers: {
          'Content-Type':'application/json'
          },
          body: JSON.stringify({
          username: email,
          email,
          password,
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


     } catch(err){
      setError('Something went wrong', err)
     }      

}




  return (
    <div className="SignUp">
  	   

  	   

    <form className="space-y-8 divide-y divide-gray-200 shareBox mx-auto mt-8 " onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

  

        <div className="py-4  space-y-6  sm:space-y-5">
            <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Sign Up!</h2>
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
                  className="uniqueBox mt-4 pl-4"
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
                  className="uniqueBox mt-4 pl-4"
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
                  className="uniqueBox mt-4 pl-4"
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
                  className="uniqueBox mt-4 pl-4"
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
                  className="uniqueBox mt-4 pl-4"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  placeholder="Username"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="off"
                  className="uniqueBox mt-4 pl-4"
                  onChange={(event) => {
                    setError('')
                    setUsername(event.target.value)
                  }}

                />
              </div>
            </div>

   
          </div>
        </div>

        
      </div>

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

{error && <p>{error}</p>}









    </div>
  );
}