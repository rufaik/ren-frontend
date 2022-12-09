import React, {useState, useEffect, useContext} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {ModeContext} from '../context/ModeContext'
import {CartContext} from '../context/CartContext'
import { Switch } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/outline'
// import { ShoppingCartIcon } from '@heroicons/react/solid'
import {
  cartCoinTotal, 

} from '../utils/cart'


export default () =>{

  const {user, setUser, create, setCreate, simpleUser, setSimpleUser, mainImages, setImages, lightMode, setLight} = useContext(UserContext)
  const {cart} = useContext(CartContext)
  const {mode} = useContext(ModeContext)
  const [enabled, setEnabled] = useState(mode);
  const [vector, setVector] = useState("../sun.png");
  console.log("mode", mode)
  console.log("Navvy121", create)


    useEffect(() => {
      if(mode === null){
        setEnabled(true)
        }
    }, [])


  return (
    <div className="Nav sectWidth flex items-center mt-8 mx-auto">
        <Link className="logoBox" to='/home'>
           {mainImages && <img className='w-100' alt='REN logo' src={create === 'darkbg' ? mainImages[0].lightlogo.url :  mainImages[0].darklogo.url} /> }
        </Link>
        <div className="ml-20">
          <Switch.Group
            as="div"
            className="flex text-gray-600 justify-center space-x-4 mx-auto text-2xl sm:text-4xl lg:text-xl items-center"
          >
            <Switch.Label className="norm text-xl">
          {create === 'light' && <img className='w-100 vector' alt='REN logo' src="../sun.png"/>}
          {create === 'darkbg' &&  <img className='w-100 vector' alt='REN logo' src="../moon.png"/> }
            </Switch.Label>
            <Switch
              as="button"
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-white' : 'bg-white'
              } relative inline-flex flex-shrink-0 tog duration-200 ease-in-out border-2 border-solid border-black rounded-full cursor-pointer focus:outline-none focus:shadow-outline`}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? 'translate-x-3' : '-translate-x-1'
                  } inline-block togBtn transition duration-200 ease-in-out transform  border-solid  border-black border-2 rounded-full`}
                />
              )}

            </Switch>
          </Switch.Group>
      
          {enabled ? ( document.body.classList.remove('darkbg'),localStorage.setItem('lightMode', true), setCreate('light'))   :( document.body.classList.add('darkbg'), localStorage.setItem('lightMode', false), setCreate('darkbg'))}
        </div>
    <div className="Nav flex ml-auto">

      <Link to='/search'  className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>Browse</Link>

      <Link to='/credits'  className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>R.E.N Credits</Link>

      <Link to='/about'  className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>About us</Link>
      
      <Link to='/howitworks'  className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>Partner with us</Link>
      
{/*      {user && 
        <Link to='/newlisting' className={create === 'darkbg' ? "mx-6 menuItem text-white" : "mx-6 menuItem"}>Add Listing</Link>
      }*/}
      <Link to='/contact'  className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>Contact</Link>
  	   {user &&
        <>
  	   		<div onClick={() => window.location.href = `/profile/${user.user.id}`} className= {create === 'darkbg' ? "ml-4 mr-6 text-white menuItem cursor-pointer" : "ml-4 mr-6 menuItem cursor-pointer"}> My Profile </div>
          <Link to='/home' className={create === 'darkbg' ? "authBtn text-white" : "authBtn"} style={{"padding":"0.3rem"}} onClick={() => {
            setUser(null)
            setSimpleUser(null)
            localStorage.removeItem('user') 
            localStorage.removeItem('simpleUser') 

            }}>
            Log Out
          </Link>
          {simpleUser &&
            <div className="flex flex-row items-center mx-4">
              <div className="w-6 -mt-1 mr-1">
                <img src='../coin.png' alt="coin" />
              </div>
              <div className={create === 'darkbg' ? "menuItem text-white" : " menuItem"}>{simpleUser.coins}</div>
            </div>
          }
         {cart && cart.length > 0 &&
          <Link to='/cart'>
          <div className="flex flex-row items-center">
          <ShoppingCartIcon className={create === 'darkbg' ? "h-6 w-6 text-white" : "h-6 w-6 text-black"} aria-hidden="true" />
       
          <div className={create === 'darkbg' ? "pt-1 menuItem text-white" : "pt-1 menuItem"}>
          {cartCoinTotal(cart)}

          </div>
          </div>
          </Link>
        }
        </>
  	   	}
  	   {!user &&
  	   	<>
	  	   <NavLink className={create === 'darkbg' ? "text-white mx-4 menuItem" : "mx-4 menuItem"} to="/login" exact> Login </NavLink>
	  	   <NavLink className={create === 'darkbg' ? "text-white mx-4 menuItem" : "mx-4 menuItem"} to="/signup" exact> Signup </NavLink>
	  	</>
  		}
    </div>

    </div>
  );
}