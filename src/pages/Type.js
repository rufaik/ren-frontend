import React, {useState, useEffect, useContext} from 'react'
import ReactMarkdown from "react-markdown";
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {API_URL} from '../utils/urls'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
import ReactPlayer from 'react-player'
import Footer from '../components/Footer'



const formatImageUrl = (url) => `${API_URL}${url}`

export default (history) =>{

	const [userTypes, setUserTypes] = useState([])
	const [change1, setChage1] = useState('Creative')
	const [change2, setChage2] = useState('')
	const [showText, setShowText] = useState(false)
	const [showText1, setShowText1] = useState(false)
	const [showText2, setShowText2] = useState(false)
	const {create} = useContext(UserContext)




// const sortNumAsc = new Map([...data].sort((a, b) => a.id[1] - b.id[1]));
// console.log("Sorted", sortNumAsc)

	useEffect(() => {
	    const getUserTypes = async () => {
	      const response = await fetch(`${API_URL}/identity-cards`)
	      const data = await response.json()
	      // console.log("data", data)
	      const sortNumAsc = data.sort((firstItem, secondItem) => firstItem.id - secondItem.id)
	      setUserTypes(sortNumAsc)
	      if( history.location.state && history.location.state.card !== null){
	      	return null
	      } else{
	      storyPicker(data)
	  }
    }

    getUserTypes()
    // console.log("userTypes", userTypes)


  }, [])


const storyPicker =  (data) => {
   data.map( async (card, i) => {
      if(card.title === change1){
        setChage2(card.user_stories[0].id)
}})}
	

	useEffect(() => {
		if( history.location.state && history.location.state.card !== null){
			setChage1(history.location.state.card)
			setChage2(history.location.state.card)
		}

	  }, [])

		useEffect(() => {
		if( history.location.state && history.location.state.card !== null && userTypes.length > 0){
			storyPicker(userTypes)
		}

	  }, [userTypes])		

	return(

		<div className={create === 'darkbg' ? "text-white" : ""}>

			<div className='sectWidth mx-auto pt-36' >
				<h2 className='mb-8'> Get Inspired! </h2>
				<div className='h3Light' >See how others are using Rent Equipment Now.</div>
				<div className='h3Light'>Get some new ideas.</div>
			{userTypes && userTypes[0] 
  				?
  				<>
					<div className='flex flex-row mt-20'>
						{userTypes.map((type, i) => {
	                return(
	                	<div 
	                		onClick={() => { setChage1(type.title); setChage2(type.user_stories[0].id) }} 
	                		className={ change1 === type.title ? 'w-1/4 flex flex-row items-center justify-center border-b borderIconB pb-2' : 'w-1/4 flex flex-row items-center justify-center border-b borderIcon pb-2'}>
		                {change1 === type.title &&
		                	<div className='mr-2'>
		                    	<img className='w-100' alt='icon' src={type.icon && type.icon.url} />
		                  	</div>
		                  }
		                  	<div className='h3Dark24'>{type.title}</div>
		                </div>

	                	)})}
					</div>
			

  {userTypes.map((type, i) => {
          if (type.title === change1) {
           
            return (
			<div className='pt-28'>
				<div className='flex flex-row '>
					<div className='flex flex-col w-1/2 mr-4'>
						<div class='titleBox p-12 h-72 flex flex-col items-center justify-center'>
							<h2 className='text-white text-center'>{type.blueBoxTitle}</h2>
							<div className='h3Dark text-center text-white'>{type.blueBoxDesc}</div>
						</div>
						<div 
							className={create === 'darkbg' ? "itemBoxDrk mt-16 relative cursor-pointer" : "itemBox mt-16 relative cursor-pointer"}
							onClick={showText ? () => {setShowText(false)} :  () => {setShowText(true)}}
						>
						{!showText &&
							<div className='flex justify-center items-center' style={{"height": "35rem"}}>
								<img className='w-100 mx-auto' alt='macbook' src={type.mainImage1 && type.mainImage1.url} />
							</div>
						}
						{!showText &&
							<div 
								className={create === 'darkbg' 
												? " w-full h-32 absolute bottom-0 flex justify-center items-center darkTitleBg" 
												: " w-full h-32 absolute bottom-0 bg-white flex justify-center items-center " 
											}
							>
								<div className="h3Dark24">{type.image1Title}</div>
							</div>
						}
						{showText &&
							<div 
								className= "mt-16 relative"
							>
								<div className="h3Dark24 text-center">{type.image1Title}</div>
								<div className="px-8 mt-16 spaceMark">
									<ReactMarkdown children={type.popuptext1} />
								</div>

								<Link 
                    				to='/search'
				                  className="ml-8 mt-10 orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1 cursor-pointer"
				                 
				                >
				                 Search products
				                </Link>
							</div>
						}
						</div>
					</div>
					<div className='flex flex-col w-1/2 ml-4'>
						<div 
							className={create === 'darkbg' ? "itemBoxSmDrk relative cursor-pointer" :"itemBoxSm relative cursor-pointer"}
							onClick={showText1 ? () => {setShowText1(false)} :  () => {setShowText1(true)}}
						>
						{!showText1 &&
							<div className='pt-8' style={{"height": "22.5rem"}}>
								<img className='h-full mx-auto' alt='macbook' src={type.mainImage2 && type.mainImage2.url} />
							</div>
						}
						{!showText1 &&
							<div 
								className={create === 'darkbg' 
												? " w-full h-32 absolute bottom-0 flex justify-center items-center darkTitleBg" 
												: " w-full h-32 absolute bottom-0 bg-white flex justify-center items-center " 
											}
							>
								<div className="h3Dark24">{type.image2Title}</div>
							</div>
						}
						{showText1 &&
							<div 
								className= "mt-16 relative"
							>
								<div className="h3Dark24 text-center">{type.image2Title}</div>
								<div className="px-8 mt-16">
									<div className="genLight mt-4">
										<ReactMarkdown>{type.popuptext2}</ReactMarkdown>
									</div>

								</div>
								<Link 
                    				to='/search'
				                  className="ml-8 mt-10 orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1 cursor-pointer"
				                 
				                >
				                 Search products
				                </Link>
							</div>
						}
						</div>
						<div 
							className={create === 'darkbg' ? "itemBoxSmDrk mt-16 relative cursor-pointer" :"itemBoxSm mt-16 relative cursor-pointer"}
							onClick={showText2 ? () => {setShowText2(false)} :  () => {setShowText2(true)}}
						>
						{!showText2 &&
							<div className='pt-8' style={{"height": "22.5rem"}}>
								<img className='h-full mx-auto' alt='macbook' src={type.mainImage3 && type.mainImage3.url} />
							</div>
						}
						{!showText2 &&
							<div 
								className={create === 'darkbg' 
												? " w-full h-32 absolute bottom-0 flex justify-center items-center darkTitleBg" 
												: " w-full h-32 absolute bottom-0 bg-white flex justify-center items-center " 
											}
							>
								<div className="h3Dark24">{type.image3Title}</div>
							</div>
						}
						{showText2 &&
							<div 
								className= "mt-16 relative"
							>
								<div className="h3Dark24 text-center">{type.image3Title}</div>
								<div className="px-8 mt-16">
									<div className="genLight mt-4">
										<ReactMarkdown>{type.popuptext3}</ReactMarkdown>
									</div>

								</div>

								<Link 
                    				to='/search'
				                  className="ml-8 mt-10 orangeBg orangeBtn bulkTxt text-white block mt-4 text-center pt-1 cursor-pointer"
				                 
				                >
				                 Search products
				                </Link>
							</div>
						}
						</div>

					</div>
				</div>


				<h2 className="mt-40">Need some Inspiration?</h2>
				<div className='mt-6 h3Light w-1/2'>
					We asked a few of our customers how they use R.E.N to help them acheieve their goals
				</div>

				<div className='flex flex-row mt-20'>
						{type.user_stories.map((story, i) => {
	                return(
	                	<div 
	                		onClick={() => { setChage2(story.id) }} 
	                		className={ change2 === story.id ? 'w-1/3 flex flex-row items-center border-b borderIconB pb-2' : 'w-1/3 flex flex-row items-center border-b borderIcon pb-2'}>
		               
		                  	<div className='h3Dark24 mx-auto'>{story.name}</div>
		                </div>

	                	)})}
					</div>
					  {type.user_stories.map((story1, i) => {
				          if (story1.id === change2) {
				           
				            return (
				            	<div className="pt-12">
				            		<div className='flex flex-row'>
				            			<div className="flex flex-col w-5/12 pt-12 mr-12">
					            			<div className="flex flex-row">

					            				<div className="flex flex-col mr-4">
				            				      <div 
				            				      	className={create === 'darkbg' ? "avatarDrk items-center justify-center" : "avatar items-center justify-center"}
				            				      >
												        <img className="object-cover avatar1 rounded-full" src={story1.avatar && story1.avatar.url} alt="" />
												   </div>
												</div>
												<div  className="flex flex-col items-center justify-center ml-4">
													<div className='h3Dark24 mb-4'>{story1.name}</div>
													<div className="h3Sub opacity-60">{story1.job}</div>
													<div className="h3Sub opacity-60">{story1.residence}</div>
												</div>

										  </div>
										  <div className="getLightIta contentMarkdown mt-16">
										  	<ReactMarkdown>{story1.description}</ReactMarkdown>
										  </div>
				            			</div>
				            			<div className="flex flex-col w-7/12">
				            				 <ReactPlayer 
								                playing

								                 // url={story1.Video.url}  
								                 url={story1.Video && story1.Video.url} 
								                 light={story1.videoImage && story1.videoImage.url}
								                 controls={true}
								                 width='47rem'
    											height='38rem'
								              />

				            			</div>
				            		</div>

				            	</div>

				        )}})}

			</div>
			)}})}
  </>

	: null
			}
			</div>
			<Footer />
			
		</div>

		)
}