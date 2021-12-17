import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../context/UserContext'


const generateInput = ( value, setOnChange) => {
  return(
      <div class="grid-item">
        <input 
          value={value}
          onChange={(event) => setOnChange(event.target.value)}
        />
      </div>
    )
}

export default () =>{

	const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
	console.log("sim",simpleUser)
	console.log("user",user)




	const [fileBulk, setFile] = useState('');
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
	const [transferConfirmation, setTransferConfirmation] = useState(false)


//First find current User, subtract shared coins from my account

   const updateCurrent = async (data) => {
    const data1 = {
      coins: Math.round(parseInt(simpleUser.coins) - parseInt(first2))
    }

    if(parseInt(simpleUser.coins) > parseInt(first2)){
    	try{
	    	const response = await fetch(`http://localhost:1337/users/${simpleUser.id}`, {
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
          findUser()

    	} catch(err){
		console.log("Exception ", err)}
	} else {
		setLowFunds(true)
	}

    }

// Find the other users info

      const findUser = async () => {

    	try{
	    	const response = await fetch(`http://localhost:1337/users/${first1}`, {
	          method: 'GET',
	          headers: {
	          'Content-Type':'application/json',
	          'Authorization': `Bearer ${user.jwt}`
	          }
	        })

          const dataOtherUser = await response.json()
          shareCoins(dataOtherUser)
          console.log("dataOtherUser", dataOtherUser)

    	} catch(err){
		console.log("Exception ", err)}
	

    }

//Update the other user with the shared coins

   const shareCoins = async (dataOtherUser) => {
   	console.log()
    const data2 = {
      coins:  
      	dataOtherUser.coins === null 
      	? Math.round(parseInt(0) + parseInt(first2))
      	: Math.round(parseInt(dataOtherUser.coins) + parseInt(first2))
      
    }

    	try{
	    	const response = await fetch(`http://localhost:1337/users/${first1}`, {
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
		console.log("Exception ", err)}

    }    
    const bulkUpdate = (event) => {
    	event.preventDefault()
    	console.log("file", fileBulk)
		const csvFilePath={fileBulk}
		const csv=require('csvtojson')
		csv()
		.fromFile(csvFilePath)
		.then((jsonObj)=>{
		    console.log(jsonObj);
	    /**
	     * [
	     * 	{a:"1", b:"2", c:"3"},
	     * 	{a:"4", b:"5". c:"6"}
	     * ]
	     */ 
    // jsonObj.forEach(entry => {
    // 	strapi.extent['users-permissions'].models.user.create({
    // 		id: entry.id,
    // 		coins: entry.coins
    // 	})
    // })

	})
	}


  const bulkUpdate1 = async (event) => {
  	event.preventDefault()



  	const formData = new FormData();
    console.log("formData", formData)
    console.log("fileBulk", fileBulk)

    formData.append('files', fileBulk);
        console.log("formData", formData)
    console.log("fileBulk", fileBulk)


  	const response = await fetch('http://localhost:1337/contents', {
	          method: 'POST',
	          body: {
	          	bulkupload: fileBulk,
	          	name: "hey"
	          }
	        })

  	const shared1 = await response.json()
  	console.log(shared1)

  }


  return (
    <div className="mx-32 mt-10">
  	   <div class="grid-container">
		  <div class="grid-item">REN CODE</div>
		  <div class="grid-item">Coins</div>
		  {generateInput(first1, setFirst1)}
		  {generateInput(first2, setFirst2)}
		
		</div>
		<button onClick={updateCurrent}>Submit</button>
	  	    {transferConfirmation &&
	  	    	<div>Congrats! You have shared {first2} coins</div>
	  	    }
	  	    {lowFunds &&
	  	    	<div>Unfortunately you dont have enough REN coins!</div>
	  	    } 
{/*	  	<form>
	  		<input 
                type='file' 
                value={fileBulk}
                name="files"
                onChange={(event) => setFile(event.target.value)} 
            />
	  		<button 
	  			type="submit" 
	  			onClick={bulkUpdate} 
	  			value="Submit"
	  		>
	  		BULK UPDATE
	  		</button>
	  	</form>*/}

	  	<form>
 
    <input type="file" name="files" onChange={(event) => setFile(event.target.value)}  />

    <input type="text" name="ref" value="content" />
    <input type="text" name="refId" value="1" />
    <input type="text" name="field" value="bulkupload" />
    
    	<button 
	  			type="submit" 
	  			onClick={bulkUpdate1} 
	  			value="Submit"
	  		>
	  		BULK UPDATE
	  		</button>
  </form>

  



	</div>
  );
}














