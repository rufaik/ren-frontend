import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import {API_URL} from '../utils/urls'
import Footer from '../components/Footer'

export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')


const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
console.log('user', user)

  useEffect(() => {
  if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
    }
}, [user])


useEffect(() => {
	if(user){
		history.push('/', { userData: user})
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
        localStorage.setItem('simpleUser', JSON.stringify(data.user))
        console.log("data login", data)
      	setUser(data)
        setSimpleUser(data.user)
        console.log("login", simpleUser)


     } catch(err){
     	setError('Something went wrong' + err)
     }      

}

console.log("login", simpleUser)


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
            <h2 
            className={create === 'darkbg' ? "mt-6 text-center text-3xl font-extrabold text-white" : "mt-6 text-center text-3xl font-extrabold text-gray-900"}
            >Log in to your account</h2>
{/*            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>*/}
          </div>
          <form className="mt-8 space-y-6 shareBox mx-auto" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px">
              <div>
      
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-7 pl-4" : "uniqueBox mt-7 pl-4"}
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => {
                    setError('')
                    setEmail(event.target.value)
                  }}

                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={create === 'darkbg' ? "uniqueBoxDrk mt-7 pl-4" : "uniqueBox mt-7 pl-4"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setError('')
                    setPassword(event.target.value)
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor="remember-me" 
                  className={create === 'darkbg' ? "ml-2 block text-sm text-white" : "ml-2 block text-sm text-gray-900"}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot" className="font-medium orangeTxt">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>



      <Footer />

    </div>
  );
}