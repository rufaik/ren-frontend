import React, {useState, useEffect, useContext, Fragment} from 'react'
import ReactMarkdown from "react-markdown";
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
import ReactPlayer from 'react-player'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default () =>{

	const [results, setResults] = useState('84')
	const [place, setPlace] = useState('London, England')
	const [change2, setChage2] = useState('')
	const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
	const [listings, setListings] = useState(null)
	const [finding, setFinding] = useState(true)


useEffect(() => {

  getListings()

}, [])

const getListings = async (user) => {
  console.log("go", user)
    const response = await fetch(`http://localhost:1337/listings`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                
                // setDescription1(data.description)
                console.log("side", data)
                if(data !== null){
                  setListings(data);
                  setFinding(false)
                } else {
                  console.log("else", user)
                  setFinding(true)
                }
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
                setListings({}); 
            }         
        }





	return(
			<div>
				<div className=' mx-12 pt-36' >
					<h2 className=""> Find equipment nearby</h2>
					<div className="flex flex-row items-center mt-6" >
						<div className="h3Bold mr-2">{results} results </div>
						<div className="genLight" style={{"fontSize": "24px"}}>in {place}</div>
					</div>

					<div className="flex flex-row mt-12">
						<div className="flex flex-col w-3/12">
							<div className="h3Sub">Location</div>
							<div className="uniqueBoxSearch mt-4"></div>
			              		
			              		<div className="flex flex-row mt-4">
			              			<Menu as="div" className="relative inline-block text-left">
									      <div>
									        <Menu.Button className="genLight uniqueBoxSearch inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
									          Within 1 mile
									          <ChevronDownIcon className="-mr-1 ml-auto h-5 w-5" aria-hidden="true" />
									        </Menu.Button>
									      </div>

									      <Transition
									        as={Fragment}
									        enter="transition ease-out duration-100"
									        enterFrom="transform opacity-0 scale-95"
									        enterTo="transform opacity-100 scale-100"
									        leave="transition ease-in duration-75"
									        leaveFrom="transform opacity-100 scale-100"
									        leaveTo="transform opacity-0 scale-95"
									      >
									        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
									          <div className="py-1">
									            <Menu.Item>
									              {({ active }) => (
									                <a
									                  href="#"
									                  className={classNames(
									                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									                    'block px-4 py-2 text-sm'
									                  )}
									                >
									                  Account settings
									                </a>
									              )}
									            </Menu.Item>
									            <Menu.Item>
									              {({ active }) => (
									                <a
									                  href="#"
									                  className={classNames(
									                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									                    'block px-4 py-2 text-sm'
									                  )}
									                >
									                  Support
									                </a>
									              )}
									            </Menu.Item>
									            <Menu.Item>
									              {({ active }) => (
									                <a
									                  href="#"
									                  className={classNames(
									                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									                    'block px-4 py-2 text-sm'
									                  )}
									                >
									                  License
									                </a>
									              )}
									            </Menu.Item>
									            <form method="POST" action="#">
									              <Menu.Item>
									                {({ active }) => (
									                  <button
									                    type="submit"
									                    className={classNames(
									                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									                      'block w-full text-left px-4 py-2 text-sm'
									                    )}
									                  >
									                    Sign out
									                  </button>
									                )}
									              </Menu.Item>
									            </form>
									          </div>
									        </Menu.Items>
									      </Transition>
									    </Menu>
			              			</div>

			              			<div className="h3Sub mt-12 mb-4">Categories</div>
			              			<div className="flex flex-row items-center">
			              				<div className="checkBx"></div>
			              				<div className="genLight ml-3">Film & Photography</div>
			              			</div>
			              			<div className="flex flex-row items-center mt-3">
			              				<div className="checkBx"></div>
			              				<div className="genLight ml-3">Film & Photography</div>
			              			</div>
			              			<div className="flex flex-row items-center mt-3">
			              				<div className="checkBx"></div>
			              				<div className="genLight ml-3">Film & Photography</div>
			              			</div>
			              			<div className="flex flex-row items-center mt-3">
			              				<div className="checkBx"></div>
			              				<div className="genLight ml-3">Film & Photography</div>
			              			</div>
								</div>
						<div className="flex flex-col w-9/12">
{/*							Add MAP HERE							
*/}

{listings ?
								<div className="grid gap-5 lg:grid-cols-3 lg:max-w-none">

							{listings.map((listing, i) => {
{/*								if(listing.booked !== true)
*/}	                			return(

									<Link to={`/listing/${listing.id}`} className="h-96 searchThumb pt-4">
										<div className="h-4/6 mb-8 flex justify-center items-center self-center">
											<img className="h-48 mx-auto" src={formatImageUrl(listing.image && listing.image.url)}/>
										</div>
										<div className="flex justify-between px-8">
											<div className="genLight">{listing.name}</div>
											<div className="genLight">{listing.postcode}</div>
										</div>
										<div className="flex items-center pl-8">
					                        <h3>{listing.coins}</h3>
					                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
					                          <img className='w-100' alt='REN coin' src="../coin.png" />
					                        </div>
					                        <h3>/day</h3>
					                     </div>
					                     <div className="genLight orgBdr pt-2 inline-flex ml-8"> Canon EOS M50 Black</div>

									</Link>	                				
	                		)})}
	                
{/*
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8 mb-10"> Canon EOS M50 Black</div>

								</div>
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8"> Canon EOS M50 Black</div>

								</div>
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8"> Canon EOS M50 Black</div>

								</div>
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8"> Canon EOS M50 Black</div>

								</div>
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8"> Canon EOS M50 Black</div>

								</div>
								<div className="h-96 searchThumb pt-4">
									<div className="h-4/6 mb-8">
										<img className="w-100 mx-auto" src="./camera.png" />
									</div>
									<div className="flex justify-between px-8">
										<div className="genLight">Sarah</div>
										<div className="genLight">Hackney</div>
									</div>
									<div className="flex items-center pl-8">
				                        <h3>2</h3>
				                        <div className="smallCoin flex mb-1 ml-0.5 mr-0">
				                          <img className='w-100' alt='REN coin' src="../coin.png" />
				                        </div>
				                        <h3>/day</h3>
				                     </div>
				                     <div className="genLight orgBdr pt-2 inline-flex ml-8 mb-4"> Canon EOS M50 Black</div>

								</div>*/}

							</div>

	                : null
						}
						</div>
					</div>
				</div>
			</div>

		)
}