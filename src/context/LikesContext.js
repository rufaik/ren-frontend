import React, {useState, useEffect, useContext, createContext} from 'react'
import {UserContext} from './UserContext'
import {API_URL} from '../utils/urls'



export const LikesContext = createContext(null)

export default ({children}) =>{

	const {user} = useContext(UserContext)
	const [likesGiven, setLikesGiven] = useState([])
	const [likesReceived, setLikesReceived] = useState([])

	const reloader = () => {
		if(user) {
			const loadLikesGiven = async () => {
				const response =  await fetch(`${API_URL}/likes/given?users_permissions_user=${user.user.id}`,{
					headers: {
						'Authorization': `Bearer ${user.jwt}`
					}
	
				})
				const data = await response.json()
				setLikesGiven(data)
			}
			loadLikesGiven()

			const loadLikesReceived = async () => {
				const response =  await fetch(`${API_URL}/likes/received?post.author=${user.user.id}`,{
					headers: {
						'Authorization': `Bearer ${user.jwt}`
					}	
				})
				const data = await response.json()
				setLikesReceived(data)
			}
			loadLikesReceived()
		}
	}

	useEffect(() =>{
		reloader()
	}, [user])

// console.log("likesGiven", likesGiven)
// console.log("likesReceived", likesReceived)

  return (
  	<LikesContext.Provider value={{likesGiven, likesReceived, reloader}} >
  		{children}
  	</LikesContext.Provider>
  );
}