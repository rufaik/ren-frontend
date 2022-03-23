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
  // console.log("Nav", cart)
  console.log("Navvy", simpleUser)

  return (
    <div className="Nav sectWidth flex items-center mt-8 mx-auto">
        <Link className="logoBox" to='/home'>
            <img className='w-100' alt='REN logo' src={create === 'darkbg' ? "../whiteLogo.png" :"../logo3.png"} />
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
          {enabled ? ( document.body.classList.remove('darkbg'), setCreate('light')) :( document.body.classList.add('darkbg'), setCreate('darkbg'))}
        </div>
    <div className="Nav flex ml-auto">

      <Link to='/about'  className={create === 'darkbg' ? "mx-6 menuItem text-white" : "mx-6 menuItem"}>About</Link>
      {user &&
        <Link to='/howitworks'  className={create === 'darkbg' ? "mx-6 menuItem text-white" : "mx-6 menuItem"}>How it works</Link>
      }
      <Link to='/newlisting' className={create === 'darkbg' ? "mx-6 menuItem text-white" : "mx-6 menuItem"}>Add Listing</Link>
      <Link to='/contact'  className={create === 'darkbg' ? "mx-6 menuItem text-white" : "mx-6 menuItem"}>Contact</Link>
  	   {user &&
        <>
  	   		<Link to={`/profile/${user.user.id}`} exact className= {create === 'darkbg' ? "ml-4 mr-6 text-white menuItem" : "ml-4 mr-6 menuItem"}> My Profile </Link>
          <Link to='/home' className="authBtn" style={{"padding":"0.3rem"}} onClick={() => {
            setUser(null)
            setSimpleUser(null)
            localStorage.removeItem('user') 
            localStorage.removeItem('simpleUser') 

            }}>
            Log Out
          </Link>
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
	  	   <NavLink className={create === 'darkbg' ? "text-white mx-4 menuItem" : "mx-4 menuItem"} to="/login" exact> Login </NavLink>
	  	   <NavLink className={create === 'darkbg' ? "text-white mx-4 menuItem" : "mx-4 menuItem"} to="/signup" exact> Signup </NavLink>
	  	</>
  		}
    </div>

    </div>
  );
}