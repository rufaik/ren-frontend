// import React, {useState, useEffect, useContext} from 'react'
// import {UserContext} from '../context/UserContext'
// import Papa from "papaparse";
// import {API_URL} from '../utils/urls'

// const generateInput = ( value, setOnChange) => {
//   return(
//       <div class="grid-item1">
//         <input 
//           value={value}
//           onChange={(event) => setOnChange(event.target.value)}
//           className="stdInput mt-4 pl-4"
//         />
//       </div>
//     )
// }

// export const Calc = () => {

// 	const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
// 	console.log("sim",simpleUser)
// 	console.log("user",user)




// 	const [original, setOriginal] = useState('');
// 	const [fileBulk, setFileBulk] = useState('');
// 	const [fileArray, setFileArray] = useState('');
// 	const [name, setName] = useState('heyyy');
// 	const [first1, setFirst1] = useState('');
// 	const [first2, setFirst2] = useState('');
// 	const [first3, setFirst3] = useState('');
// 	const [first4, setFirst4] = useState('');
// 	const [first5, setFirst5] = useState('');
// 	const [first6, setFirst6] = useState('');
// 	const [first7, setFirst7] = useState('');
// 	const [first8, setFirst8] = useState('');
// 	const [foundUser, setFoundUser] = useState('');
// 	const [lowFunds, setLowFunds] = useState(false)
// 	const [transferConfirmation, setTransferConfirmation] = useState(false)
// 	const [transferConfirmation1, setTransferConfirmation1] = useState(false)
// 	const [itemValue, setItemValue] = useState('');
// 	const [rentalValue, setRentalValue] = useState('');
// 	const [calculated, setCalculated] = useState(false);
// 	const [calculated1, setCalculated1] = useState(false);
// 	const [coin, setCoin] = useState('');
// 	const [days, setDays] = useState('');
  


// //First find current User, subtract shared coins from my account

//    const updateCurrent = async (data) => {
//     const data1 = {
//       coins: Math.round(parseInt(simpleUser.coins) - parseInt(first2))
//     }

//     if(parseInt(simpleUser.coins) > parseInt(first2)){
//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
// 	          method: 'PUT',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          },
// 	          body: JSON.stringify(data1)
// 	        })

//           const confirm = await response.json()
//           setSimpleUser(confirm)
//            localStorage.setItem('simpleUser', JSON.stringify(confirm))
//           findUser()

//     	} catch(err){
// 		console.log("Exception ", err)}
// 	} else {
// 		setLowFunds(true)
// 	}

//     }

// // Find the other users info

//       const findUser = async () => {

//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${first1}`, {
// 	          method: 'GET',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          }
// 	        })

//           const dataOtherUser = await response.json()
//           shareCoins(dataOtherUser)
//           console.log("dataOtherUser", dataOtherUser)

//     	} catch(err){
// 		console.log("Exception ", err)}
	

//     }

// //Update the other user with the shared coins

//    const shareCoins = async (dataOtherUser) => {
//    	console.log()
//     const data2 = {
//       coins:  
//       	dataOtherUser.coins === null 
//       	? Math.round(parseInt(0) + parseInt(first2))
//       	: Math.round(parseInt(dataOtherUser.coins) + parseInt(first2))
      
//     }

//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${first1}`, {
// 	          method: 'PUT',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          },
// 	          body: JSON.stringify(data2)
// 	        })

//           const shared = await response.json()
//           setTransferConfirmation(true)
         

//     	} catch(err){
// 		console.log("Exception ", err)}

//     }    


	

//   const bulkUpdate1 = async (event) => {
//   	event.preventDefault()
//   	const data3 = {
//       name: "yo"
//     }
//   	console.log("bulkk", name)

// 	const formData = new FormData()
//     formData.append('data', JSON.stringify(data3))
//     formData.append('files.bulkupload', fileBulk)

//   try{
//         const response = await fetch(`${API_URL}/contents`, {
//           method: 'POST',
//           body: formData
//         })
  
//         const data = await response.json()
  
//         console.log("dataK", data) 
//       }catch(err){
//         console.log("Exception", err)
//       }

//   }




// const bulkUpdate2 = (event) => {
// 	   console.log(fileBulk);
//             Papa.parse(fileBulk, {
//               complete: function(results) {
//                 console.log("Finished:", results.data);
//                 setFileArray(results.data)

//                 var arr= [['1','20'],['5','20'],['11','20']]

// //create array of 2nd items 
// var secondNumbers = []

// //loop through main array and add to secondNumbers array 
// for(var x = 0;x<results.data.length;x++){
//   var secondNumber = results.data[x][1]//index 1 = 2nd number in item
//   secondNumbers.push(parseInt(secondNumber)) //parseInt - change string to number
// }

// //now add the ones in second item
// var total = 0
// for (var y = 0 ; y<secondNumbers.length;y++){
//   total+=secondNumbers[y] 
// }

// console.log("total", total)
// // document.write(total)

// updateCurrent1(total)


//                 {results.data.map((upload, i) => { findUser1(upload[0], upload[1])
                	
//                 })}

           
//               }}
//             )
//           }
        


// //First find current User, subtract shared coins from my account

//    const updateCurrent1 = async (total) => {
//    	const battle =  Math.round(parseInt(simpleUser.coins) - parseInt(total))
//    	console.log()
//     const data1 = {
//       coins: Math.round(parseInt(simpleUser.coins) - parseInt(total))
//     }

//     if(parseInt(simpleUser.coins) > parseInt(total)){
//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
// 	          method: 'PUT',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          },
// 	          body: JSON.stringify(data1)
// 	        })

//           const confirm = await response.json()
//           setSimpleUser(confirm)
//            localStorage.setItem('simpleUser', JSON.stringify(confirm))
          

//     	} catch(err){
// 		console.log("Exception ", err)}
// 	} else {
// 		setLowFunds(true)
// 	}

//     }

// // Find the other users info

//       const findUser1 = async (receiverID, amount) => {

//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${receiverID}`, {
// 	          method: 'GET',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          }
// 	        })

//           const dataOtherUser = await response.json()
//           shareCoins1(dataOtherUser, receiverID, amount)
//           console.log("dataOtherUser", dataOtherUser)

//     	} catch(err){
// 		console.log("Exception ", err)}
	

//     }

// //Update the other user with the shared coins

//    const shareCoins1 = async (dataOtherUser, receiverID, amount) => {
//    	console.log()
//     const data2 = {
//       coins:  
//       	dataOtherUser.coins === null 
//       	? Math.round(parseInt(0) + parseInt(amount))
//       	: Math.round(parseInt(dataOtherUser.coins) + parseInt(amount))
      
//     }

//     	try{
// 	    	const response = await fetch(`${API_URL}/users/${receiverID}`, {
// 	          method: 'PUT',
// 	          headers: {
// 	          'Content-Type':'application/json',
// 	          'Authorization': `Bearer ${user.jwt}`
// 	          },
// 	          body: JSON.stringify(data2)
// 	        })

//           const shared = await response.json()
//           setTransferConfirmation1(true)
         

//     	} catch(err){
// 		console.log("Exception ", err)}

//     }    

// //     const calculate = () => {
// //     	// get item value
// //     	const coinTotal 
// //     	return Math.round(itemValue * 5)

// //     	//20 multiplied by 5 gives us coins 

// //     	//320 divided by 20 = days= how many days it would take 


// //     }

//     const calculate = () => {
//     	const coinTotal = coin *10

//     	return Math.round(coinTotal/5 - 3)
//     	// get coins
//     	//20 coins

//     	//20 divided by 5 gives us coins minus flat cost


//     	//320 divided by 20 = days= how many days it would take 
    


//     }
// // export const cartSubTotal = (cart) => {
// // 	//Sum up all of the individual product cost
// // 	const subTotal = cart.reduce((counter, productc) => {
// // 		return counter + productc.price_in_cent * productc.qty

// // 	}, 0)
// // 	return subTotal
// // }





// console.log(fileBulk)



//   return (
//   	<>
           



//     <div className="calcBox">
//       <div className="borderBoundary mx-auto">
//         <div className="h3Dark border-solid pt-8 pb-4 border-b-2 inline-flex orangeBorder">R.E.N Coin Calculator</div>
//         <div className="normalBold mt-7">Set the item value and desired rental price above to calculate R.E.N price and return on investment.</div>
        
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Item value (£)</div>
//           <input
//                             value={itemValue}
//                             onChange={(event ) => {setItemValue(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (£)</div>
//           <input
//                             value={rentalValue}
//                             onChange={(event ) => {setRentalValue(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>

//          <button 
//                   className="sendBtn bulkTxt ml-auto mr-12 block mt-4 text-center"
//                   onClick={() => setCalculated(true)} 
//                   value="Submit"
//                 >
//                 Calculate
//           </button>
//           {calculated && itemValue > 0 && rentalValue > 0 &&
//             <div>
//               <h2 className="normalBold mt-5">Your item rents for {Math.round(rentalValue * 5)} credits/day </h2>
//               <h2 className="normalBold mt-2 mb-4">Your would pay off the item in {Math.round(itemValue/rentalValue)} rental days </h2>
//             </div>

//           }
      

//       </div>
//     </div>
    
// {    <div className="calcBox my-16">
//       <div className="borderBoundary mx-auto">
//         <div className="h3Dark border-solid pt-8 pb-4 border-b-2 inline-flex orangeBorder">R.E.N Coin Calculator</div>
//         <div className="normalBold mt-7 pb-4">Calculate how much you could make!</div>
        
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (coins)</div>
//           <input
//                            value={coin}
//                             onChange={(event ) => {
//                               setCalculated1(false) 
//                               setCoin(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental days</div>
//           <input
//                           value={days}
//                           onChange={(event ) => {
//                             setCalculated1(false)
//                             setDays(event.target.value)}}
//                           className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>

//          <button 
//                   className="sendBtn bulkTxt ml-auto mr-12 block mt-4 text-center"
//                   onClick={() => setCalculated1(true)} 
//                   value="Submit"
//                 >
//                 Calculate
//           </button>
//           {calculated1 && coin > 0 && days > 0 &&
//             <div>
//               <h2 className="normalBold mt-7">You could earn £{calculate()} in {days} days by just renting out ONE item </h2>
//             </div>

//           }
      

//       </div>
//     </div>}




// 	</>
//   );
// }






// export const Calc1 = () => {

//   const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
//   console.log("sim",simpleUser)
//   console.log("user",user)




//   const [original, setOriginal] = useState('');
//   const [fileBulk, setFileBulk] = useState('');
//   const [fileArray, setFileArray] = useState('');
//   const [name, setName] = useState('heyyy');
//   const [first1, setFirst1] = useState('');
//   const [first2, setFirst2] = useState('');
//   const [first3, setFirst3] = useState('');
//   const [first4, setFirst4] = useState('');
//   const [first5, setFirst5] = useState('');
//   const [first6, setFirst6] = useState('');
//   const [first7, setFirst7] = useState('');
//   const [first8, setFirst8] = useState('');
//   const [foundUser, setFoundUser] = useState('');
//   const [lowFunds, setLowFunds] = useState(false)
//   const [transferConfirmation, setTransferConfirmation] = useState(false)
//   const [transferConfirmation1, setTransferConfirmation1] = useState(false)
//   const [itemValue, setItemValue] = useState('');
//   const [rentalValue, setRentalValue] = useState('');
//   const [calculated, setCalculated] = useState(false);
//   const [calculated1, setCalculated1] = useState(false);
//   const [coin, setCoin] = useState('');
//   const [days, setDays] = useState('');
  


// //First find current User, subtract shared coins from my account

//    const updateCurrent = async (data) => {
//     const data1 = {
//       coins: Math.round(parseInt(simpleUser.coins) - parseInt(first2))
//     }

//     if(parseInt(simpleUser.coins) > parseInt(first2)){
//       try{
//         const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
//             method: 'PUT',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             },
//             body: JSON.stringify(data1)
//           })

//           const confirm = await response.json()
//           setSimpleUser(confirm)
//            localStorage.setItem('simpleUser', JSON.stringify(confirm))
//           findUser()

//       } catch(err){
//     console.log("Exception ", err)}
//   } else {
//     setLowFunds(true)
//   }

//     }

// // Find the other users info

//       const findUser = async () => {

//       try{
//         const response = await fetch(`${API_URL}/users/${first1}`, {
//             method: 'GET',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             }
//           })

//           const dataOtherUser = await response.json()
//           shareCoins(dataOtherUser)
//           console.log("dataOtherUser", dataOtherUser)

//       } catch(err){
//     console.log("Exception ", err)}
  

//     }

// //Update the other user with the shared coins

//    const shareCoins = async (dataOtherUser) => {
//     console.log()
//     const data2 = {
//       coins:  
//         dataOtherUser.coins === null 
//         ? Math.round(parseInt(0) + parseInt(first2))
//         : Math.round(parseInt(dataOtherUser.coins) + parseInt(first2))
      
//     }

//       try{
//         const response = await fetch(`${API_URL}/users/${first1}`, {
//             method: 'PUT',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             },
//             body: JSON.stringify(data2)
//           })

//           const shared = await response.json()
//           setTransferConfirmation(true)
         

//       } catch(err){
//     console.log("Exception ", err)}

//     }    


  

//   const bulkUpdate1 = async (event) => {
//     event.preventDefault()
//     const data3 = {
//       name: "yo"
//     }
//     console.log("bulkk", name)

//   const formData = new FormData()
//     formData.append('data', JSON.stringify(data3))
//     formData.append('files.bulkupload', fileBulk)

//   try{
//         const response = await fetch(`${API_URL}/contents`, {
//           method: 'POST',
//           body: formData
//         })
  
//         const data = await response.json()
  
//         console.log("dataK", data) 
//       }catch(err){
//         console.log("Exception", err)
//       }

//   }




// const bulkUpdate2 = (event) => {
//      console.log(fileBulk);
//             Papa.parse(fileBulk, {
//               complete: function(results) {
//                 console.log("Finished:", results.data);
//                 setFileArray(results.data)

//                 var arr= [['1','20'],['5','20'],['11','20']]

// //create array of 2nd items 
// var secondNumbers = []

// //loop through main array and add to secondNumbers array 
// for(var x = 0;x<results.data.length;x++){
//   var secondNumber = results.data[x][1]//index 1 = 2nd number in item
//   secondNumbers.push(parseInt(secondNumber)) //parseInt - change string to number
// }

// //now add the ones in second item
// var total = 0
// for (var y = 0 ; y<secondNumbers.length;y++){
//   total+=secondNumbers[y] 
// }

// console.log("total", total)
// // document.write(total)

// updateCurrent1(total)


//                 {results.data.map((upload, i) => { findUser1(upload[0], upload[1])
                  
//                 })}

           
//               }}
//             )
//           }
        


// //First find current User, subtract shared coins from my account

//    const updateCurrent1 = async (total) => {
//     const battle =  Math.round(parseInt(simpleUser.coins) - parseInt(total))
//     console.log()
//     const data1 = {
//       coins: Math.round(parseInt(simpleUser.coins) - parseInt(total))
//     }

//     if(parseInt(simpleUser.coins) > parseInt(total)){
//       try{
//         const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
//             method: 'PUT',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             },
//             body: JSON.stringify(data1)
//           })

//           const confirm = await response.json()
//           setSimpleUser(confirm)
//            localStorage.setItem('simpleUser', JSON.stringify(confirm))
          

//       } catch(err){
//     console.log("Exception ", err)}
//   } else {
//     setLowFunds(true)
//   }

//     }

// // Find the other users info

//       const findUser1 = async (receiverID, amount) => {

//       try{
//         const response = await fetch(`${API_URL}/users/${receiverID}`, {
//             method: 'GET',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             }
//           })

//           const dataOtherUser = await response.json()
//           shareCoins1(dataOtherUser, receiverID, amount)
//           console.log("dataOtherUser", dataOtherUser)

//       } catch(err){
//     console.log("Exception ", err)}
  

//     }

// //Update the other user with the shared coins

//    const shareCoins1 = async (dataOtherUser, receiverID, amount) => {
//     console.log()
//     const data2 = {
//       coins:  
//         dataOtherUser.coins === null 
//         ? Math.round(parseInt(0) + parseInt(amount))
//         : Math.round(parseInt(dataOtherUser.coins) + parseInt(amount))
      
//     }

//       try{
//         const response = await fetch(`${API_URL}/users/${receiverID}`, {
//             method: 'PUT',
//             headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Bearer ${user.jwt}`
//             },
//             body: JSON.stringify(data2)
//           })

//           const shared = await response.json()
//           setTransferConfirmation1(true)
         

//       } catch(err){
//     console.log("Exception ", err)}

//     }    

// //     const calculate = () => {
// //      // get item value
// //      const coinTotal 
// //      return Math.round(itemValue * 5)

// //      //20 multiplied by 5 gives us coins 

// //      //320 divided by 20 = days= how many days it would take 


// //     }

//     const calculate = () => {
//       const coinTotal = coin *10

//       return Math.round(coinTotal/5 - 3)
//       // get coins
//       //20 coins

//       //20 divided by 5 gives us coins minus flat cost


//       //320 divided by 20 = days= how many days it would take 
    


//     }
// // export const cartSubTotal = (cart) => {
// //  //Sum up all of the individual product cost
// //  const subTotal = cart.reduce((counter, productc) => {
// //    return counter + productc.price_in_cent * productc.qty

// //  }, 0)
// //  return subTotal
// // }





// console.log(fileBulk)



//   return (
//     <>
           


// {/*

//     <div className="calcBox">
//       <div className="borderBoundary mx-auto">
//         <div className="h3Dark border-solid pt-8 pb-4 border-b-2 inline-flex orangeBorder">R.E.N Coin Calculator</div>
//         <div className="normalBold mt-7">Set the item value and desired rental price above to calculate R.E.N price and return on investment.</div>
        
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Item value (£)</div>
//           <input
//                             value={itemValue}
//                             onChange={(event ) => {setItemValue(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (£)</div>
//           <input
//                             value={rentalValue}
//                             onChange={(event ) => {setRentalValue(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>

//          <button 
//                   className="sendBtn bulkTxt ml-auto mr-12 block mt-4 text-center"
//                   onClick={() => setCalculated(true)} 
//                   value="Submit"
//                 >
//                 Calculate
//           </button>
//           {calculated && itemValue > 0 && rentalValue > 0 &&
//             <div>
//               <h2 className="normalBold mt-7">Your item rents for {Math.round(rentalValue * 5)} coins/day </h2>
//               <h2 className="normalBold mt-7">Your would pay off the item in {Math.round(itemValue/rentalValue)} rental days </h2>
//             </div>

//           }
      

//       </div>
//     </div>*/}
    
//     <div className="calcBox my-16">
//       <div className="borderBoundary mx-auto">
//         <div className="h3Dark border-solid pt-8 pb-4 border-b-2 inline-flex orangeBorder">R.E.N Credit Calculator</div>
//         <div className="normalBold mt-7 pb-4">Calculate how much you could make!</div>
        
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental price per day (coins)</div>
//           <input
//                            value={coin}
//                             onChange={(event ) => {
//                               setCalculated1(false) 
//                               setCoin(event.target.value)}}
//                             className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>
//         <div className="flex flex-row">
//           <div className="w-1/3 flex items-center pt-2 justify-end pr-3 normalBold">Rental days</div>
//           <input
//                           value={days}
//                           onChange={(event ) => {
//                             setCalculated1(false)
//                             setDays(event.target.value)}}
//                           className="uniqueBox mt-2 pl-4"
                          
//                           />
//         </div>

//          <button 
//                   className="sendBtn bulkTxt ml-auto mr-12 block mt-4 text-center"
//                   onClick={() => setCalculated1(true)} 
//                   value="Submit"
//                 >
//                 Calculate
//           </button>
//           {calculated1 && coin > 0 && days > 0 &&
//             <div>
//               <h2 className="normalBold mt-7">You could earn £{calculate()} in {days} days by just renting out ONE item </h2>
//             </div>

//           }
      

//       </div>
//     </div>





//   </>
//   );
// }














