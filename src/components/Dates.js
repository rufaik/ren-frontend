import React, {useState, useEffect, useContext, Fragment} from 'react'


import {UserContext} from '../context/UserContext'



export default ({rangeF, rangeT}) =>{

	 const [from, setFrom] = useState('')
	 const [from1, setFrom1] = useState('')
	 const [to, setTo] = useState('')
	 const [to1, setTo1] = useState('')



	return(
		<div>
		{rangeF && rangeT &&
			<div>
		 		<h3>from: {rangeF.toLocaleDateString()}</h3>
		 		<h3>to: {rangeT.toLocaleDateString()}</h3>
		 		<h3 onClick={() => {
		 				setFrom(rangeF.toLocaleDateString())
		 				setTo(rangeT.toLocaleDateString()) 
		 		}}>first
		 		</h3>
		 		<h3>{from}</h3>
		 		<h3>{to}</h3> 
		 		<h3 onClick={() => {
		 				setFrom1(rangeF.toLocaleDateString())
		 				setTo1(rangeT.toLocaleDateString()) 
		 		}}>first
		 		</h3>
		 		<h3>{from1}</h3>
		 		<h3>{to1}</h3>
		 		
		 	</div>
		}
		</div>
		)



}