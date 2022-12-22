import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'



export default ({rangeF1, rangeT1, show}) =>{

	 // const [from, setFrom] = useState('')
	 // const [from1, setFrom1] = useState('')
	 // const [to, setTo] = useState('')
	 // const [to1, setTo1] = useState('')
	 const [HS1, setHS1] = useState('Start Date')
	 const [HS2, setHS2] = useState('Start Date')
	 const [HS3, setHS3] = useState('Start Date')
	 const [HS4, setHS4] = useState('Start Date')
	 const [HS5, setHS5] = useState('Start Date')
	 const [HT1, setHT1] = useState('End Date')
	 const [HT2, setHT2] = useState('End Date')
	 const [HT3, setHT3] = useState('End Date')
	 const [HT4, setHT4] = useState('End Date')
	 const [HT5, setHT5] = useState('End Date')
	 const [showDates, setShowDates] = useState(show)
	 const { create, rangeF, setRangeF, rangeT, setRangeT} = useContext(UserContext)

	 useEffect(() => {

		{rangeF1 && rangeT1 &&

			setRangeF(rangeF1)
			setRangeT(rangeT1)
		}

	}, [rangeT1, rangeF1])



	return(
		<div>
		{rangeF && rangeT &&
			<div>
			{!showDates &&
			<div className="mx-auto">

		 		{/*<h3>from: {rangeF1.toLocaleDateString()}</h3>
		 		<h3>to: {rangeT1.toLocaleDateString()}</h3>
		 		<h3 onClick={() => {
		 				setFrom(rangeF1.toLocaleDateString())
		 				setTo(rangeT1.toLocaleDateString()) 
		 				setFrom(rangeF1.toLocaleDateString())
		 				setTo(rangeT1.toLocaleDateString()) 
		 		}}>first
		 		</h3>*/}
		 		<div className="flex flex-row items-baseline justify-center">
		 			<div className="genBold"> Holiday 1 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HS1}
	                 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HT1}
	                 </div>
	                 <button  
		                 onClick={() => {
		                 	setHS1(rangeF1.toLocaleDateString()) 
		                 	setHT1(rangeT1.toLocaleDateString()) 
		                 }} 
		                 className="authBtn ml-10 mt-2 onClick"
		                 >
	                    Set Dates
	                 </button>
               
               </div>
			 		<div className="flex flex-row items-baseline justify-center">
		 			<div className="genBold"> Holiday 2 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HS2}
	                 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HT2}
	                 </div>
	                 <button  
		                 onClick={() => {
		                 	setHS2(rangeF1.toLocaleDateString()) 
		                 	setHT2(rangeT1.toLocaleDateString()) 
		                 }} 
		                 className="authBtn ml-10 mt-2 onClick"
		                 >
	                    Set Dates
	                 </button>
               
               </div>
			 		<div className="flex flex-row items-baseline justify-center">
		 			<div className="genBold"> Holiday 3 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HS3}
	                 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HT3}
	                 </div>
	                 <button  
		                 onClick={() => {
		                 	setHS3(rangeF1.toLocaleDateString()) 
		                 	setHT3(rangeT1.toLocaleDateString()) 
		                 }} 
		                 className="authBtn ml-10 mt-2 onClick"
		                 >
	                    Set Dates
	                 </button>
               
               </div>
			 		<div className="flex flex-row items-baseline justify-center">
		 			<div className="genBold"> Holiday 4 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HS4}
	                 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HT4}
	                 </div>
	                 <button  
		                 onClick={() => {
		                 	setHS4(rangeF1.toLocaleDateString()) 
		                 	setHT4(rangeT1.toLocaleDateString()) 
		                 }} 
		                 className="authBtn ml-10 mt-2 onClick"
		                 >
	                    Set Dates
	                 </button>
               
               </div>
			 		<div className="flex flex-row items-baseline justify-center">
		 			<div className="genBold"> Holiday 5 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HS5}
	                 </div>
			 		<div
	                  className="dateBox mt-2 ml-4 text-center genLight">
	                 {HT5}
	                 </div>
	                 <button  
		                 onClick={() => {
		                 	setHS5(rangeF1.toLocaleDateString()) 
		                 	setHT5(rangeT1.toLocaleDateString()) 
		                 }} 
		                 className="authBtn ml-10 mt-2 onClick"
		                 >
	                    Set Dates
	                 </button>
               
               </div>
                <button  
		                 // onClick={() => {
		                 // 	setHS5(rangeF1.toLocaleDateString()) 
		                 // 	setHT5(rangeT1.toLocaleDateString()) 
		                 // }} 
		                 className="sendBtn bulkTxt block mt-4 text-center  ml-auto"
		                 >
	                    SUBMIT
	                 </button>
			 		
		 		{/*<h3>{from}</h3>
		 		<h3>{to}</h3> 
		 		<h3 onClick={() => {
		 				setFrom1(rangeF1.toLocaleDateString())
		 				setTo1(rangeT1.toLocaleDateString()) 
		 		}}>first
		 		</h3>
		 		<h3>{from1}</h3>
		 		<h3>{to1}</h3>*/}
		 	</div>
		 	}	
		 	</div>
		}
		</div>
		)



}