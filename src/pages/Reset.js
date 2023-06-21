import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import {API_URL} from '../utils/urls'
import { useLocation } from "react-router-dom";


export default ({history}) =>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const [error, setError] = useState('')
const [same, setSame] = useState(false)


const {user, setUser, setSimpleUser, create} = useContext(UserContext)
// console.log('user', user)

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

const { search } = useLocation();
// console.log("search", search);
const searchParams = new URLSearchParams(search);
const param = searchParams.get("code");
// console.log("param", param);


const checkPasswords = async (event) => {
  event.preventDefault()

  if(password !== passwordConfirmation || password.length < 1) {
    // console.log("pass")
    setSame(true)
  } else {
    handleSubmit()
    setSame(false)
  }
}


useEffect(() => {
  if(user){
    history.push('/', { userData: user})
  }
}, [user])

const handleSubmit = async () => {

		
	try{
          const response = await fetch(`${API_URL}/auth/reset-password/`, {
      		method: 'POST',
      		headers: {
      		'Content-Type':'application/json'
      		},
      		body: JSON.stringify({
      		code: param,
      		password,
          passwordConfirmation
      		})
      	})
      
      	const data = await response.json()
      	// console.log("data", data) 

        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('simpleUser', JSON.stringify(data.user))
        // console.log("data login", data)
        setUser(data)
        setSimpleUser(data.user)



     } catch(err){
     	setError('Something went wrong' + err)
     }      

}



  return (
    <div className={create === 'darkbg' ? "Login darkbg text-white" : "Login"} >

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
            <h2 className= {create === 'darkbg' ? " text-white mt-6 text-center text-3xl font-extrabold" : "mt-6 text-center text-3xl font-extrabold text-gray-900" } 
            >Reset your password</h2>
{/*            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>*/}
          </div>
            <div className="ml-auto">
              <div className="shareBox mx-auto gen text-center mt-4 mb-7"> Enter a new password to reset it.</div>
              <form className="shareBox mx-auto" onSubmit={handleSubmit}>
              <input
                          value={password}
                          placeholder="New Password"
                          className={create === 'darkbg' ? "uniqueBoxDrk pl-4" : "uniqueBox pl-4"}
                          onChange={(event) => {
                              setError('')
                              setPassword(event.target.value)
                            }}
              />

              <input
                          value={passwordConfirmation}
                          placeholder="Confirm Password"
                          className={create === 'darkbg' ? "uniqueBoxDrk mt-7 pl-4" : "uniqueBox mt-7 pl-4"}
                          onChange={(event) => {
                              setError('')
                              setPasswordConfirmation(event.target.value)
                            }}
              />

              <button
                onClick={checkPasswords}
                className="group relative w-full mt-7 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white orangeBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
               Reset Password
              </button>

              {same &&
                <div className="orangeCol normalBold mt-6">
                Your passwords do not match
                </div>
              }

              </form>
            </div>
        </div>
      </div>





    </div>
  );
}