import React, { useContext} from 'react'
import { Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'

export default () =>{

  const { create, mainImages} = useContext(UserContext)


  return (

  	<div className={create === 'darkbg' ? 'grybg mt-20' : 'bluebg  mt-20'}>
  		<div className="sectWidth mx-auto pt-32">
  			<div className="w-full flex flex-row">
  				<div className="w-1/5">
  					<Link  to='/home'>
						<div className="logoBox">
                    {mainImages && <img  alt='REN logo' src={create === 'darkbg' ? mainImages[0]?.lightlogo?.url :  mainImages[0]?.darklogo?.url} /> }

				        </div>
			        </Link>
  				</div>
  				<div className="w-1/5 flex flex-col">
  					<Link to='/home'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Home</Link>
  					<Link to='/about'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>About</Link>
{/*  					<Link to='/howitworks'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>How it works</Link>
*/}  					<Link to='/contact'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Contact</Link>
  				</div>
  				{/*<div className="w-1/5 flex flex-col">
  				{user &&	<Link to={`/profile/${user.user.id}`}  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Profile</Link> }
  					<Link to='/newlisting'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Add Listing</Link>
  				</div>*/}
  				<div className="w-1/5 flex flex-col">
  					<Link to='/privacy'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Privacy Policy</Link>
  					<Link to='/terms'  className={create === 'darkbg' ? "mb-6 genLight " : "mb-6  genLight text-white"}>Terms & Conditions</Link>
  				</div>
  				<div className="w-1/5 flex flex-row justify-end">
            {mainImages && 
    					<Link  to={{ pathname: `${mainImages[0]?.facebook }`}} target="_blank">
  						  <div className="socialBx mr-4">
  				            <img  alt='social' src={create === 'darkbg' ? "../faceD.png"  : "../faceL.png"} />
  				        </div>
			        </Link>
            }
            {mainImages && 
              <Link  to={{ pathname: `${mainImages[0]?.linkedin }`}} target="_blank">
  						<div className="socialBx mr-4">
				            <img  alt='social' src={create === 'darkbg' ? "../linkD.png"  : "../linkL.png"} />
				        </div>
			        </Link>
            }
            {mainImages && 
              <Link  to={{ pathname: `${mainImages[0]?.instagram }`}} target="_blank">
  						  <div className="socialBx mr-4">
				            <img  alt='social' src={create === 'darkbg' ? "../instaD.png"  : "../instaL.png"} />
				        </div>
			        </Link>
            }
  				</div>
  			</div>
  			<div className={create === 'darkbg' ? "pb-8 pt-32 mx-auto text-center copy" : "pb-8 pt-32 mx-auto text-center copy text-white"}>
  				Copyright © 2023 Rent Equipment Now | All Rights Reserved
  			</div>
  		</div>
  	</div>

  	)

}