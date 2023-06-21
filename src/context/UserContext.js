import React, {createContext, useState, useEffect} from 'react'


export const UserContext = createContext(null)

export default ({children}) => {

	const [user, setUser] = useState(null)
	const [simpleUser, setSimpleUser] = useState(null)
	const [mainImages, setImages] = useState(null)
	const [rangeF, setRangeF] = useState(null)
	const [rangeT, setRangeT] = useState(null)
	const [create, setCreate] = useState('light')
	const [lightMode, setLight] = useState(true)
	// console.log("ussss", user)
	// console.log("lllllllll", lightMode)
	// console.log("crrrrrrr", create)


	useEffect(() => {
      if(localStorage.getItem('lightMode')){
        const lightMode1 = JSON.parse(localStorage.getItem('lightMode'))
        setLight(lightMode1)
        // console.log("doffffff", lightMode1)       
        // console.log("dotttttt", lightMode)       
        }
    }, [lightMode])

	return(
		<UserContext.Provider value={{user, setUser, create, setCreate, simpleUser, setSimpleUser, rangeF, setRangeF, rangeT, setRangeT, mainImages, setImages, lightMode, setLight}}>
			{children}
		</UserContext.Provider>

		)
}

// import createDataContext from './createDataContext';



// const userReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'add_error':
// 			return { ...state, errorMessage: action.payload};
// 		case 'update_user':
// 			return {...state, user: ...action.payload }
// 		// case 'signup':
// 		// 	return { errorMessage: '', token: action.payload };

			
// 		default:
// 			return [state];
// 	}
// };


// // const addName = dispatch => async ({ name}) => {
// // 	const response = await trackerApi.post('/name', {name});
// // 	dispatch ({ type: 'add_name', payload: {name} })


// // const updatepref1 = (dispatch)  => async ({ userId, newitemList, newlist1, newitemList1, newword1, newitemList4 }) => {
// // 	try {
// // 		//make a request
// // 		console.log('try')
// // 		const response = await trackerApi.put('/updatepref', {userId, newitemList, newlist1, newitemList1, newword1, newitemList4});
// // 		console.log('done')
// // 		//navigate to main flow
// // 		navigate('TrackList')
// // 	} catch (err) {
// // 		dispatch({
// // 			type:'add_error',
// // 			payload: 'I didnt update'

// // 		})
// // 	}
// // }

// const updateUser = dispatch =>  async ({ data}) => {
// 	// make api request to sign up with that email and password

// 	//if we sign up, modify our state and say we are authenticated

// 	// if signing up fail, we need show an error message to the user
	
// 	try {
// 		//make a request
	
		
// 		//store the token
		
// 		//update our state
// 		dispatch({ type: 'update_user', payload: data});
// 		//navigate to main flow

// 	} catch (err) {
// 		dispatch({ 
// 			type: 'add_error', 
// 			payload: 'Something went wrong with sign up'
// 		})
// 	};
// 	};





// export const { Provider, Context } = createDataContext(
// 	userReducer,
// 	{ user, setUser, create, setCreate, updateUser },

// 	[]
// 	);

