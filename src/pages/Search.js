import React, {useState, useEffect, useContext, Fragment} from 'react'
import ReactMarkdown from "react-markdown";
import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import {CartContext} from '../context/CartContext'
import ReactPlayer from 'react-player'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {Link } from 'react-router-dom'
import { SearchIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/outline'
import {API_URL} from '../utils/urls'
import Footer from '../components/Footer'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const formatImageUrl = (url) => `${API_URL}${url}`

export default (history) =>{

	const [results, setResults] = useState('84')
	const [place, setPlace] = useState('London, England')
	const [change2, setChage2] = useState('')
	const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)
	const [listings, setListings] = useState(null)
	const [finding, setFinding] = useState(true)
	const [searchWord, setSearchWord] = useState('')
	console.log("history", history)


useEffect(() => {

  getListings()

}, [])

const getListings = async (user) => {
    const response = await fetch(`${API_URL}/listings`, {
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

useEffect(() => {
if(listings !== null){
  addToList1()
}

}, [listings])
 
  const [selectedId1, setSelectedId1] = useState(null);
  const [selectedIdC, setSelectedIdC] = useState(null);
  const [itemList1, setItemList1] = useState([]);
  const [itemListC, setItemListC] = useState([]);
  const [category, setCategory] = useState(null);
  const [borough, setBorough] = useState(null);
  const [checked, setChecked] = useState(false);

  // const addToList1 = item => {
  //   //copy the selected item array
  //   let updatedItems = itemList1;
  //   //use array.push to add it to the array
  //   updatedItems.push(item.name);

  //   setItemList1(updatedItems);
  //   setSelectedId1(item.name);
  // };

    const addToList1 = () => {
    	listings.map((boro, i) => {
	        let updatedItems = itemList1;
	        updatedItems.push(boro.borough);
	        setItemList1(updatedItems);
	    	setSelectedId1(boro.borough);
	    })
    	listings.map((cat, i) => {
	        let updatedItemsC = itemListC;
	        updatedItemsC.push(cat.category);
	        setItemListC(updatedItemsC);
	    	setSelectedIdC(cat.category);
	    })	    
	    let uniqueCategory = [...new Set(itemListC)];
	    let uniqueBorough = [...new Set(itemList1)];
	    setBorough(uniqueBorough);
	    setCategory(uniqueCategory);
}
console.log("category1", category)


const [selectedId1a, setSelectedId1a] = useState(null);
  const [optionList, setOptionList] = useState([]);
const [selectedId1B, setSelectedId1B] = useState(null);
  const [optionListB, setOptionListB] = useState([]);
console.log("optionList", optionList)
console.log("optionListB", optionListB)


  const addToList = (person, list, setList, setSelect) => {
    //copy the selected item array
    let updatedItems = list;
    //use array.push to add it to the array
    updatedItems.push(person);

    setList(updatedItems);
    setSelect(person);
  };

  const removeFromList = (person, list, setList, setSelect) => {
    //copy the slected item array
    let updatedItems = list;
    //find the current item in the array
    let itemIndexToRemove = updatedItems.indexOf(person);
    //use splice to remove the item from list
    //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    updatedItems.splice(itemIndexToRemove, 1);

    setList(updatedItems);
    //this is weird but it makes it work - I can't unselect, so made a non-existing id
    setSelect(person + "____");
    ;
  };

useEffect(() => {
		if( history.location.state !== undefined){
			setSearchWord(history.location.state)
			// console.log("history!!!", )
		}

	  }, [])

	return(
			<div>
				<div className=' mx-12 pt-36' >
					<div className="flex flex-row">
						<h2 className=""> Find equipment nearby</h2>
						<div className="searchBx ml-auto items-center flex flex-row">
							<input
			                  id="searchWord"
			                  name="searchWord"
			                  type="text"
			                  required
			                  className="border-0 noRing bg-transparent genBold w-11/12 ml-4 py-2"
			                  placeholder="Cameras, laptops, speakers, drones..."
			                  value={searchWord}
			                  onChange={(event) => {
			                    setSearchWord(event.target.value)
			                  }}
			                />
							<div className="w-10 h-10 rounded-full flex justify-center items-center ml-auto mr-2" style={{"backgroundColor": "#0B1A2C"}}>
								<SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
							</div>
						</div>
					</div>
{/*					<div className="flex flex-row items-center mt-6" >
						<div className="h3Bold mr-2">{results} results </div>
						<div className="genLight" style={{"fontSize": "24px"}}>in {place}</div>
					</div>
*/}
					<div className="flex flex-row mt-12">
						<div className="flex flex-col w-3/12">
							
			              		
			              		
			              			<div className="h3Sub mt-12 mb-4">Categories</div>
			              		{category && category[0] &&
			              			<div>


{/*				              			{category.map((item, i) => {
				              				return(
				              				<div key={i} 
				              					className="flex flex-row items-center mb-3" 
				              					onClick={() => setChecked(true)}
				              				>
					              				{!checked 
					              					? <div className="checkBx"></div>

					              					: <div className="checkBx" style={{"background": "#0B1A2C"}}>
					              						<CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
					              					  </div>
					              				}
					              				<div className="genLight ml-3">{item}</div>
				              				</div>

				              			)})}*/}


									<fieldset>
									      <div className="">
									        {category.map((person, personIdx) => (
									          <div key={personIdx} className="flex flex-row items-center mb-3">
									   {/*         <div className="min-w-0 flex-1 text-sm">
									              <label htmlFor={`person-${person}`} className="font-medium bluenorm select-none">
									                {person}
									              </label>
									            </div>*/}
{/*									            <div className="ml-3 flex items-center h-5">
*/}									              <input
									                id={`person-${person}`}
									                name={`person-${person}`}
									                type="checkbox"
									                className="checkBx ring-transparent"
									                onClick={() =>
									                    optionList.indexOf(person) > -1
									                      ? removeFromList(person, optionList, setOptionList, setSelectedId1a)
									                      : addToList(person, optionList, setOptionList, setSelectedId1a)
									                  }
									              />
									              <div className="genLight ml-3">{person}</div>
{/*									            </div>
*/}									          </div>
									        ))}
									      </div>
									    </fieldset>				              			







				              		</div>
				              	}
			              			<div className="h3Sub mt-12 mb-4">Location</div>
			              		{borough && borough[0] &&
			              			<div>


{/*				              			{category.map((item, i) => {
				              				return(
				              				<div key={i} 
				              					className="flex flex-row items-center mb-3" 
				              					onClick={() => setChecked(true)}
				              				>
					              				{!checked 
					              					? <div className="checkBx"></div>

					              					: <div className="checkBx" style={{"background": "#0B1A2C"}}>
					              						<CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
					              					  </div>
					              				}
					              				<div className="genLight ml-3">{item}</div>
				              				</div>

				              			)})}*/}


									<fieldset>
									      <div className="">
									        {borough.map((person, personIdx) => (
									          <div key={personIdx} className="flex flex-row items-center mb-3">
									   {/*         <div className="min-w-0 flex-1 text-sm">
									              <label htmlFor={`person-${person}`} className="font-medium bluenorm select-none">
									                {person}
									              </label>
									            </div>*/}
{/*									            <div className="ml-3 flex items-center h-5">
*/}									              <input
									                id={`person-${person}`}
									                name={`person-${person}`}
									                type="checkbox"
									                className="checkBx ring-transparent"
									                onClick={() =>
									                    optionListB.indexOf(person) > -1
									                      ? removeFromList(person, optionListB, setOptionListB, setSelectedId1B)
									                      : addToList(person, optionListB, setOptionListB, setSelectedId1B)
									                  }
									              />
									              <div className="genLight ml-3">{person}</div>
{/*									            </div>
*/}									          </div>
									        ))}
									      </div>
									    </fieldset>				              			







				              		</div>
				              	}

								</div>
						<div className="flex flex-col w-9/12">


{listings ?
								<div className="grid gap-5 lg:grid-cols-3 lg:max-w-none">

							{listings.map((listing, i) => {
								if(optionList.length < 1 && optionListB < 1 && listing.name.includes(searchWord)) {
	                			return(

									<Link to={`/listing/${listing.id}`} className="h-96 searchThumb pt-4">
										<div className="h-4/6 mb-8 flex justify-center items-center self-center">
											<img className="h-48 mx-auto" src={listing.image && listing.image.url}/>
										</div>
										<div className="flex justify-between px-8">
											<div className="genLight">{listing.category}</div>
											<div className="genLight">{listing.borough}</div>
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
	                		)} else if (optionListB.includes(listing.borough) && optionList.length < 1 && listing.name.includes(searchWord)) {
	                			return(

									<Link to={`/listing/${listing.id}`} className="h-96 searchThumb pt-4">
										<div className="h-4/6 mb-8 flex justify-center items-center self-center">
											<img className="h-48 mx-auto" src={listing.image && listing.image.url}/>
										</div>
										<div className="flex justify-between px-8">
											<div className="genLight">{listing.category}</div>
											<div className="genLight">{listing.borough}</div>
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


	                		)} else if (optionList.includes(listing.category) && optionListB.length < 1 && listing.name.includes(searchWord)) {
	                			return(

									<Link to={`/listing/${listing.id}`} className="h-96 searchThumb pt-4">
										<div className="h-4/6 mb-8 flex justify-center items-center self-center">
											<img className="h-48 mx-auto" src={listing.image && listing.image.url}/>
										</div>
										<div className="flex justify-between px-8">
											<div className="genLight">{listing.category}</div>
											<div className="genLight">{listing.borough}</div>
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


	                		)} else if (optionListB.includes(listing.borough) && optionList.includes(listing.category && listing.name.includes(searchWord))) {
	                			return(

									<Link to={`/listing/${listing.id}`} className="h-96 searchThumb pt-4">
										<div className="h-4/6 mb-8 flex justify-center items-center self-center">
											<img className="h-48 mx-auto" src={listing.image && listing.image.url}/>
										</div>
										<div className="flex justify-between px-8">
											<div className="genLight">{listing.category}</div>
											<div className="genLight">{listing.borough}</div>
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


	                		)}

	                		})}
	                
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
				<Footer />
			</div>

		)
}