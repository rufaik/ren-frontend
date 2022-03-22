import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import {API_URL} from '../utils/urls'


export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')


const {user, setUser} = useContext(UserContext)
console.log('user', user)

  useEffect(() => {
  if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
    }
}, [user])


useEffect(() => {
	if(user){
		history.push('/')
	}
}, [user])



const handleSubmit = async (event) => {
	event.preventDefault()
		
	try{
          const response = await fetch(`${API_URL}/auth/local/`, {
      		method: 'POST',
      		headers: {
      		'Content-Type':'application/json'
      		},
      		body: JSON.stringify({
      		identifier: email,
      		password
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
     	setError('Something went wrong' + err)
     }      

}



  return (
    <div className="Login">

{/*  	   <form onSubmit={handleSubmit}>
  	   		<input 
  	   			type ="email"
  	   			value={email}
    	   			onChange={(event) => {
    	   				setError('')
    	   				setEmail(event.target.value)
    	   			}}

    	   		/>
    	   		<input 
    	   			type ="password"
    	   			value={password}
    	   			onChange={(event) => {
    	   				setError('')
    	   				setPassword(event.target.value)
    	   			}}

    	   		/>
    	   		<button>Login</button>
    	   </form>
*/}
{/*  	   {error && <p>{error}</p>}
*/}

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
{/*            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>*/}
          </div>

          <div className="ml-auto">
              <div className="shareBox mx-auto gen mt-4 mb-7"> Simply enter your email address, you will recieve a link in your mailbox to reset your password.</div>
              <form className="shareBox mx-auto" onSubmit={handleSubmit}>
              <input
                          value={email}
                          placeholder="Email address"
                          className="uniqueBox pl-4"
                          onChange={(event) => {
                              setError('')
                              setEmail(event.target.value)
                            }}
                        />

              <button
                type="submit"
                className="group relative w-full mt-7 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
               Send
              </button>

              </form>
            </div>
        </div>
      </div>





    </div>
  );
}