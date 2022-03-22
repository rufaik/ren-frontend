import React from 'react'
import {API_URL} from '../utils/urls'


// const post = {
//     "id": 1,
//     "description": "Beautiful picture of the generations",
//     "likes": 20,
//     "author": null,
//     "published_at": "2021-07-20T14:05:12.511Z",
//     "created_at": "2021-07-20T14:03:24.220Z",
//     "updated_at": "2021-07-20T14:05:12.539Z",
//     "image": {
//         "url": "/uploads/jonathan_rivera_oo22_C_Jb46_E_unsplash_d63fe44cc4.jpg",
//         "previewUrl": null,
//         "provider": "local",
//         "provider_metadata": null,
//         "created_at": "2021-07-20T14:02:05.216Z",
//         "updated_at": "2021-07-20T14:02:05.250Z"
//     }
// }



const formatImageUrl = (url) => `${API_URL}${url}`

export default ({description, likes, url}) =>{


	return(
		<div className="Post">
			<img className="PostImage" src={formatImageUrl(url)} />
			<h4>{description}</h4>
			<div>
				<span>Likes: {likes}</span>
			</div>	
		</div>
	)
}