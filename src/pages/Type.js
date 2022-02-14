import React, {useState, useEffect, useContext} from 'react'

import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'


const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default () =>{

	const [userTypes, setUserTypes] = useState([])
	const [change1, setChage1] = useState('Creative')


	useEffect(() => {
	    const getUserTypes = async () => {
	      const response = await fetch('http://localhost:1337/identity-cards')
	      const data = await response.json()
	      console.log("data", data)
	      setUserTypes(data)
    }

    getUserTypes()
    console.log("userTypes", userTypes)

  }, [])

	return(

		<div>

			<div className='sectWidth mx-auto pt-16'>
				<h2 className='mb-8'> Get Inspired! </h2>
				<div className={change1 ? 'h3Bold' : 'h3Light'} >See how others are using Rent Equipment Now.</div>
				<div className='h3Light'>Get some new ideas.</div>
				{userTypes && userTypes[0] 
  				?
					<div className='flex flex-row mt-20'>
						{userTypes.map((type, i) => {
	                return(
	                	<div 
	                		onClick={() => { setChage1(type.title) }} 
	                		className={ change1 === type.title ? 'w-1/4 flex flex-row items-center border-b-4 borderIconB pb-2' : 'w-1/4 flex flex-row items-center border-b-4 borderIcon pb-2'}>
		                	<div className='mr-2'>
		                    	<img className='w-100' alt='icon' src={formatImageUrl(type.icon && type.icon.url)} />
		                  	</div>
		                  	<div className='h3Dark'>{type.title}</div>
		                </div>

	                	)})}
					</div>
				: null
			}

			<div className='pt-28'>
				<div className='flex flex-row '>
					<div className='flex flex-col w-1/2 mr-4'>
						<div class='titleBox p-12 h-72 flex flex-col items-center justify-center'>
							<h2 className='text-white text-center'> Express yourself!</h2>
							<div className='h3Dark text-center text-white'>Take your ideas to the next level without breaking the bank. Rent what you need.</div>
						</div>
					</div>
					<div className='flex flex-col w-1/2 ml-4'></div>
				</div>

			</div>



			</div>
			
		</div>

		)
}