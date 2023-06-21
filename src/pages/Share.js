import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import Papa from "papaparse";
import {API_URL} from '../utils/urls'


const generateInput = ( value, setOnChange) => {
  return(
      <div class="grid-item1">
        <input 
          value={value}
          onChange={(event) => setOnChange(event.target.value)}
          className="stdInput mt-4 pl-4"
        />
      </div>
    )
}

export default () => {

	const {user, setUser, simpleUser, setSimpleUser, create} = useContext(UserContext)
	// console.log("sim",simpleUser)
	// console.log("user",user)




	const [original, setOriginal] = useState('');
	const [fileBulk, setFileBulk] = useState('');
	const [fileArray, setFileArray] = useState('');
	const [name, setName] = useState('heyyy');
	const [first1, setFirst1] = useState('');
	const [first2, setFirst2] = useState('');
	const [first3, setFirst3] = useState('');
	const [first4, setFirst4] = useState('');
	const [first5, setFirst5] = useState('');
	const [first6, setFirst6] = useState('');
	const [first7, setFirst7] = useState('');
	const [first8, setFirst8] = useState('');
	const [foundUser, setFoundUser] = useState('');
	const [lowFunds, setLowFunds] = useState(false)
	const [lowFunds1, setLowFunds1] = useState(false)
	const [transferConfirmation, setTransferConfirmation] = useState(false)
	const [transferConfirmation1, setTransferConfirmation1] = useState(false)
	const [itemValue, setItemValue] = useState('');
	const [rentalValue, setRentalValue] = useState('');
	const [calculated, setCalculated] = useState(false);
	const [calculated1, setCalculated1] = useState(false);
	const [coin, setCoin] = useState('');
	const [days, setDays] = useState('');
	const [submit, setSubmit] = useState(false);
	const [bulk, setBulk] = useState(false);
	const [err, setErr] = useState('');





    const findUsername = async () => {
    	// console.log("findUsername")
    	try{
	    	const response = await fetch(`${API_URL}/users`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          }
	        })

          const usernames = await response.json()
          usernames.map((user, i) => { 
          	if(user.username === first1) {
          		updateCurrent(user.id)
          	}
          })

    	} catch(err){
		// console.log("Exception ", err)
	}
	

    }
  


//First find current User, subtract shared coins from my account

   const updateCurrent = async (realUserId) => {
   	    	// console.log("updateCurrent")

    const data1 = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(first2))
    }

    if(parseInt(simpleUser.coins) > parseInt(first2)){
    	try{
	    	const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
	          method: 'PUT',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          },
	          body: JSON.stringify(data1)
	        })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
          findUser(realUserId)

    	} catch(err){
		// console.log("Exception ", err)
	}
	} else {
		setLowFunds(true)
	}

    }

// Find the other users info

      const findUser = async (realUserId) => {
    	try{
	    	const response = await fetch(`${API_URL}/users/${realUserId}`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          }
	        })

          const dataOtherUser = await response.json()
          shareCoins(dataOtherUser, realUserId)
          // console.log("dataOtherUser", dataOtherUser)

    	} catch(err){
		// console.log("Exception ", err)
	}
	

    }

//Update the other user with the shared coins

   const shareCoins = async (dataOtherUser, realUserId) => {
   	// console.log()
    const data2 = {
      coins:  
      	dataOtherUser.coins === null 
      	? Math.round(parseInt(0) + parseInt(first2))
      	: Math.round(parseInt(dataOtherUser.coins) + parseInt(first2))
      
    }

    	try{
	    	const response = await fetch(`${API_URL}/users/${realUserId}`, {
	          method: 'PUT',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          },
	          body: JSON.stringify(data2)
	        })

          const shared = await response.json()
          setTransferConfirmation(true)
         

    	} catch(err){
		// console.log("Exception ", err)
	}

    }    


	

  const bulkUpdate1 = async (event) => {
  	event.preventDefault()
  	const data3 = {
      name: "yo"
    }
  	// console.log("bulkk", name)

	const formData = new FormData()
    formData.append('data', JSON.stringify(data3))
    formData.append('files.bulkupload', fileBulk)

  try{
        const response = await fetch(`${API_URL}/contents`, {
          method: 'POST',
          body: formData
        })
  
        const data = await response.json()
  
        // console.log("dataK", data) 
      }catch(err){
        // console.log("Exception", err)
      }

  }




const bulkUpdate2 = (event) => {
	   // console.log(fileBulk);
            Papa.parse(fileBulk, {
              complete: function(results) {
                // console.log("Finished:", results.data);
                setFileArray(results.data)

                var arr= [['1','20'],['5','20'],['11','20']]

//create array of 2nd items 
var secondNumbers = []

//loop through main array and add to secondNumbers array 
for(var x = 0;x<results.data.length;x++){
  var secondNumber = results.data[x][1]//index 1 = 2nd number in item
  secondNumbers.push(parseInt(secondNumber)) //parseInt - change string to number
  // console.log("secondNumbers", secondNumbers)
}

//now add the ones in second item
var total = 0
for (var y = 0 ; y<secondNumbers.length;y++){
  total+=secondNumbers[y] 
}

// console.log("total", total)
// document.write(total)

updateCurrent1(total)

				if(parseInt(simpleUser.coins) > parseInt(total)){
                {results.data.map((upload, i) => { findUsername1(upload[0], upload[1])
                	
                })}

            } else {
            	setLowFunds1(true)
            }

           
              }}
            )
          }
        






//First find current User, subtract shared coins from my account

   const updateCurrent1 = async (total) => {
   	const battle =  Math.round(parseInt(simpleUser.coins) - parseInt(total))
   	// console.log()
    const data1 = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(total))
    }

    if(parseInt(simpleUser.coins) > parseInt(total)){
    	try{
	    	const response = await fetch(`${API_URL}/users/${simpleUser.id}`, {
	          method: 'PUT',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          },
	          body: JSON.stringify(data1)
	        })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
          

    	} catch(err){
		// console.log("Exception ", err)
	}
	} else {
		setLowFunds1(true)
	}

    }


// Convert Username

    const findUsername1 = async (receiverID, amount) => {
    	// console.log("findUsername")
    	try{
	    	const response = await fetch(`${API_URL}/users`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          }
	        })

          const usernames = await response.json()
          usernames.map((user, i) => { 
          	if(user.username === receiverID) {
          		findUser1(user.id, amount)
          	}
          })

    	} catch(err){
		// console.log("Exception ", err)
	}
	

    }
// Find the other users info

      const findUser1 = async (receiverID, amount) => {

    	try{
	    	const response = await fetch(`${API_URL}/users/${receiverID}`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          }
	        })

          const dataOtherUser = await response.json()
          shareCoins1(dataOtherUser, receiverID, amount)
          // console.log("dataOtherUser", dataOtherUser)

    	} catch(err){
		// console.log("Exception ", err)
	}
	

    }

//Update the other user with the shared coins

   const shareCoins1 = async (dataOtherUser, receiverID, amount) => {
   	// console.log()
    const data2 = {
      coins:  
      	dataOtherUser.coins === null 
      	? Math.round(parseInt(0) + parseInt(amount))
      	: Math.round(parseInt(dataOtherUser.coins) + parseInt(amount))
      
    }

    	try{
	    	const response = await fetch(`${API_URL}/users/${receiverID}`, {
	          method: 'PUT',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          },
	          body: JSON.stringify(data2)
	        })

          const shared = await response.json()
          setTransferConfirmation1(true)
         

    	} catch(err){
		// console.log("Exception ", err)
	}

    }    

//     const calculate = () => {
//     	// get item value
//     	const coinTotal 
//     	return Math.round(itemValue * 5)

//     	//20 multiplied by 5 gives us coins 

//     	//320 divided by 20 = days= how many days it would take 


//     }

    const calculate = () => {
    	const coinTotal = coin *10

    	return Math.round(coinTotal/5 - 3)
    	// get coins
    	//20 coins

    	//20 divided by 5 gives us coins minus flat cost


    	//320 divided by 20 = days= how many days it would take 
    


    }
// export const cartSubTotal = (cart) => {
// 	//Sum up all of the individual product cost
// 	const subTotal = cart.reduce((counter, productc) => {
// 		return counter + productc.price_in_cent * productc.qty

// 	}, 0)
// 	return subTotal
// }


	const [upload, setUpload] = useState(false);


// console.log(fileBulk)



  return (
  	<>
            <div className="shareBox ml-auto">
              <div 
              className={create === 'darkbg' ? "text-white h3Dark" : "h3Dark"}
              	>Share your R.E.N Credits</div>
              <div 
              	className={create === 'darkbg' ? "text-white gen mt-4 mb-7" : "gen mt-4 mb-7"}
              > Simply enter the user’s unique code and submit the number of R.E.N Credits you’d like to share.</div>
              <input
                          value={first1}
                          placeholder="Enter user unqiue code"
                          className="uniqueBox pl-4"
                          className={create === 'darkbg' ? "text-white uniqueBoxDrk pl-4" : "uniqueBox pl-4"}
                          onChange={(event) => {
                          	setTransferConfirmation(false)
                          	setLowFunds(false)
                          	setFirst1(event.target.value)}}
                        />
              <input
                          value={first2}
                          placeholder="Number of R.E.N Credits"
                          className={create === 'darkbg' ? "text-white uniqueBoxDrk mt-2 pl-4" : "uniqueBox mt-2 pl-4"}
                          onChange={(event) => {
                          	setTransferConfirmation(false)
                          	setLowFunds(false)
                          	setFirst2(event.target.value)}}
                        />
              <div className="flex items-center mt-6">
                <button 
                	className="bulkTxt underline pointer" 
                	className={create === 'darkbg' ? "text-white bulkTxt underline pointer" : "bulkTxt underline pointer"}
                	onClick={() => {setBulk(true)}}
                >Bulk Share Option
                </button>
                <button 
                	className={create === 'darkbg' ? "text-white sendBtnDrk bulkTxt ml-20 text-center" : "sendBtn bulkTxt ml-20 text-center"}
                	onClick={findUsername}
                >
                Send R.E.N Credits
                </button>
			</div>
			{transferConfirmation &&
				<div 
					className="normalBold mt-3"
					className={create === 'darkbg' ? "text-white bulkTxt underline pointer" : "bulkTxt underline pointer"}


				>Congrats! You have shared {first2} credits</div>
			}
			{lowFunds &&
				<div 
					className="normalBold mt-3"
					className={create === 'darkbg' ? "text-white bulkTxt underline pointer" : "bulkTxt underline pointer"}
				>Unfortunately you dont have enough REN credits, please top up</div>
			} 
			</div>

			{bulk &&
			<div className="absolute w-screen h-screen z-10 top-24 left-0 flex justify-center">
			
				<div className="smallBox">
					<div className="coin absolute top-4 right-4" onClick={() => {setBulk(false)}}>
	                  <img className='w-100' alt='leave' src="../Vector.png" />
	                </div>
				{!transferConfirmation1 &&
					<>
	    			<div className="h3Bold mx-auto flex justify-center py-8"> Bulk Share R.E.N Credits </div>
	    			<div 
	    				className="borderBoundary mx-auto"
	    				className={create === 'darkbg' ? "text-white bulkTxt underline pointer" : "bulkTxt underline pointer"}
	    			>
						<div className="gryLine"></div>
						<div className="h3Sub pt-6">Step 1: Create the template</div>
						<div className="genLight py-6">First column: R.E.N Code, found in the user profile. This code should have no spaces.
							Second column: Amount of R.E.N Credits. This should be a whole number. DO NOT ADD TITLES.</div>
						<div className="gryLine1"></div>
						<div className="h3Sub pt-6">Step 2: Export spreadsheet as CSV</div>
						<div className="genLight py-6">Click on File > Export as > CSV. This should update the originally downloaded CSV, or save as a new file, ending with the .csv extension.</div>
						<div className="gryLine1"></div>
						<div className="h3Sub pt-6">Step 3: Review and upload</div>
						<div className="genLight py-6">Double-check through the amounts and R.E.N Codes, if you're happy click the Upload button</div>
						<div className="gryLine1"></div>
						{!upload &&
							<button 
								onClick={() => {setUpload(true)}}
								className="stdBtn flex items-center justify-center  mt-4"
							>Upload
							</button>
						}
						{upload &&
							<>
								<input
							        type="file"
							        accept=".csv,.xlsx,.xls"
									className="mt-4"
							        onChange={(e) => {
							          const files = e.target.files;
							          // console.log(files);
							          if (files) {
							          	setFileBulk(e.target.files[0])
							          	setOriginal(simpleUser.coins)
							          }
							      }}
							  />
							  <button 
					  			type="submit" 
					  			onClick={bulkUpdate2} 
					  			value="Submit"
					  			className="stdBtn flex items-center justify-center  mt-4"
					  		>
					  		Submit 
					  		</button>
					  	</>}
					</div>

				</>}
				{transferConfirmation1 &&
			            	<>
			            	<div className="h3Sub">Congrats! You have shared: </div>
			            	{fileArray.map((fa, i) => { 
			            		return(
			            			<div className="h3Sub">{fa[1]} credits with user: {fa[0]}</div>
			            		)
				  	    	})}
						</>}
				{lowFunds1 &&
				<div className="normalBold mt-3 ml-4">Unfortunately you dont have enough REN credits, please top up</div>
			} 
	</div>

		

			</div>
}

   
	</>
  );
}














