import React, {useState, useEffect, useContext} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {CartContext} from '../context/CartContext'
import { Switch } from '@headlessui/react';

export default () =>{

  const {user, setUser, create, setCreate, simpleUser, setSimpleUser} = useContext(UserContext)
  const {cart} = useContext(CartContext)
  const [enabled, setEnabled] = useState(true);
  const [vector, setVector] = useState("../sun.png");
  console.log("Nav", cart)
  console.log("Navvy", simpleUser)

  return (
    <div className="Nav sectWidth flex items-center mt-8 mx-auto">
        <div className="logoBox ">
            <img className='w-100' alt='REN logo' src={create === 'darkbg' ? "../whiteLogo.png" :"../logo3.png"} />
        </div>
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
          {enabled ? ( document.body.classList.remove('darkbg'), setCreate('light')) :( document.body.classList.add('darkbg'), setCreate('darkbg'))}
        </div>
    <div className="Nav flex ml-auto">

      <div className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>About</div>
      <div className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>How it works</div>
      <div className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>Add Listing</div>
      <div className={create === 'darkbg' ? "mx-4 menuItem text-white" : "mx-4 menuItem"}>Contact</div>
  	   <NavLink to="/" exact className="mx-4 menuItem"> Home </NavLink>
  	   {user &&
        <>
  	   		<NavLink to="/create" exact className="mx-4 menuItem"> Create </NavLink>
          <button className="authBtn" onClick={() => {
            setUser(null)
            localStorage.removeItem('user') 
            }}>
            Log Out
          </button>
          {simpleUser &&
            <div className="mx-4 menuItem">{simpleUser.coins}</div>
          }
         {cart && cart.length > 0 &&
          <Link to='/cart'>
          <div>
          🛒
          <span>
          {cart.reduce((counter, product) => {
            return counter + product.qty
          }, 0)}
          </span>
          </div>
          </Link>
        }
        </>
  	   	}
  	   {!user &&
  	   	<>
	  	   <NavLink className="mx-4 menuItem" to="/login" exact> Login </NavLink>
	  	   <NavLink className="mx-4 menuItem" to="/signup" exact> Signup </NavLink>
	  	</>
  		}
    </div>

    </div>
  );
}