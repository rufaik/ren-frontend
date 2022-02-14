import React, {useState, useEffect, useContext} from 'react'
import Post from '../components/Post'
import Share from './Share'

import {UserContext} from '../context/UserContext'
import {LikesContext} from '../context/LikesContext'
import Tabs,{Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';


export default ({match, history}) =>{
const {id} = match.params
console.log("idd", id)
console.log("match", id)

const {user, setUser} = useContext(UserContext)
console.log("user1", user)
// console.log("setUser", setUser)

// const {likesGiven, reloader} = useContext(LikesContext)

// const isPostAlreadyLiked = (() => {
//   return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
// })()

// console.log("isPostAlreadyLiked", isPostAlreadyLiked)

const [post1, setPost1] = useState({})
const [loading, setLoading] = useState(true)
const [edit, setEdit] = useState(false)
const [description1, setDescription1] = useState('')
const [letter, setLetter] = useState('')
const [first, setFirst] = useState('')
const [unique, setUnique] = useState('')
const [code, setCode] = useState('')
const [coins, setCoins] = useState('')
const [file, setFile] = useState(null)
const [profile, setProfile] = useState('/profile.jpg')
const [error, setError] = useState('')
const [show, setShow] = useState('collapse')
// const [profileUser, setProfileUser] = useState([])


useEffect(() => {

  fetchUser()

}, [])

const fetchUser = async (user) => {
  console.log("go", user)
    const response = await fetch(`http://localhost:1337/users/${id}`, {
       method: 'GET',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization': `Bearer ${user.jwt}`
        }
    })
    try{
                const data = await response.json();
                
                // setDescription1(data.description)
                setLoading(false);
                console.log("side", data)
                if(data !== null){
                  setPost1(data);
                  setFirst(data.Name)
                  setCode(data.username)
                  setCoins(data.coins)
                  setDescription1(data.Name)
                  const letterA = data.Surname.charAt(0)
                  setLetter(letterA)
                } else {
                  console.log("else", user)
                  setFirst(user.user.Name)
                  setCode(user.user.username)
                  setCoins(user.user.coins)
                  setDescription1(user.user.bio)
                  const letterA = user.user.Surname.charAt(0)
                  setLetter(letterA)

                }
                // history.push(`/profile/${id}`)
            } catch(err){
              console.log("nope")
                setPost1({}); 
                setLoading(false);
            }         
        }


useEffect(() =>{
    console.log("hey")
  }, [])

// const handleDelete = async () => {
//   const response = await fetch(`http://localhost:1337/posts/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${user.jwt}`
//     },
//   })
//   const data = await response.json();
//   history.push('/')
// }

const handleEditSubmit = async (event) => {
  event.preventDefault()
  console.log("handleEditSubmit")

  const response = await fetch(`http://localhost:1337/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${user.jwt}`
    },
    body: JSON.stringify({
      name: description1
    })
  })
  const data = await response.json();
  fetchUser()
  console.log("handleEditSubmit data", data)
}


// const handleLike = async () => {
//   try{
//     const response = await fetch('http://localhost:1337/likes', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${user.jwt}`,
//         'Content-Type':'application/json',
//       },
//       body: JSON.stringify({
//         post: parseInt(id)
//       })
//     })
//     fetchPost()
//     reloader()
//   } catch(err){
//     console.log("Exception ", err)
//   }
// }

// const handleRemoveLike = async () => {
//   try{
//     const response = await fetch(`http://localhost:1337/likes/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.jwt}`
//       }
//     })
//     fetchPost()
//     reloader()
//   } catch(err){
//     console.log("Exception ", err)
//   }
// }


const handleImgSubmit = async (event) => {
    event.preventDefault()

    if(!file){
      setError('Please add a file')
      return
    }

    const formData = new FormData()
    formData.append('files.image', file)

  try{
   
        const response = await fetch(`http://localhost:1337/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/multipart/form-data',
            'Authorization': `Bearer ${user.jwt}`
          },          
          body: {formData}
        })
  
        const data = await response.json()
  
        console.log("dataR", data) 
      }catch(err){
        console.log("Exception", err)
        setError(err)
      }

  }






// useEffect(() => {
//   {user && 
//   fetchUser()
// }
// }, [user])

// useEffect(() => {

//   {user && 
//     setDescription1(user.user.Name)
//   }
// }, [user])

console.log("sided", letter)

const API_URL = 'http://localhost:1337'

// const url = post.image && post.image.url
const formatImageUrl = (url) => `${API_URL}${url}`

                  console.log("if", post1)



  return (
    <div className="SinglePost">

    <div className="sectWidth flex mx-auto mt-16">
    <div className="flex flex-col">
      <div className="imgBx rounded-t-full rounded-b-lg flex justify-center items-center">
        <img className="rounded-t-full rounded-b-lg w-full h-full object-cover" src={profile} alt="" />
{/*        <img className="PostImage w-full h-full object-cover" src={formatImageUrl(url)} alt="" />
*/}         
      </div>
      {user && user.user.id === post1.id 
      ? <button className="orangeTxt" onClick={() => { show ==='collapse' ? setShow('visible') : setShow('collapse')}} >Choose Photo</button>
      : null
    }
      <form onSubmit={handleImgSubmit} className="flex flex-col justify-center mx-auto" style={{"visibility":show}}> 
         <input
            type="file"
            className="orangeTxt"
            placeholder="Add a File"
            onChange={(event) => {
              setError('')
              setFile(event.target.files[0])
              console.log("event.target.files[0]", event)
            }}
          />
          <button onClick={() => setProfile('./profile2')} c>Submit</button>
       </form>
       </div>

      <div className="ml-12 coinBox">
          <h2 className="items-start">Your R.E.N Coins</h2>
          <div className="flex mt-12">

            <div>
              <div className="flex items-center ">
                <div className="coin mr-2">
                  <img className='w-100' alt='REN coin' src="../coin.png" />
                </div>
                <h3>{coins}</h3>
                <button className="authBtn ml-10">
                  Top up
                </button>
              </div>

              <div className="flex mt-4">
                <div className="genBold">75</div>
                <div className="gen ml-2">earned in the past 30 days</div>
              </div>
              <div className="flex">
                <div className="genBold">30</div>
                <div className="gen ml-2">spent in the past 30 days</div>
              </div>
            </div>

            <Share />

{/*            <div className="shareBox ml-auto">
              <div className="h3Dark">Share your R.E.N Coins</div>
              <div className="gen mt-4 mb-7"> Simply enter the user’s unique code and submit the number of R.E.N Coins you’d like to share.</div>
              <input
                          value={unique}
                          placeholder="Enter user unqiue code"
                          className="uniqueBox pl-4"
                        />
              <input
                          value={unique}
                          placeholder="Number of R.E.N Coins"
                          className="uniqueBox mt-2 pl-4"
                        />
              <div className="flex items-center mt-6">
                <div className="bulkTxt underline">Bulk Share Option</div>
                <button className="sendBtn bulkTxt ml-20 text-center">Send R.E.N Coins</button>
              </div>
            </div>*/}
            
        </div>
    </div>
  </div>

<div className="sectWidth flex mx-auto mt-10">
  <div className="leftCol">
  <div className="flex items-center">
    <h2 className="flex">
      <div>Jasmine.</div>
      <div className="capitalize">K</div>
    </h2>

    {user && user.user.id.toString() === id.toString() ?
      <button onClick={() => setEdit(true)} className="editBtn bulkTxt ml-8 text-center">Edit profile</button>

      : null
    }
  </div>
    <div className="flex items-center">
      <div className="gen greyCol">R.E.N code:</div>
      <div className="genBold orangeCol mr-2">&nbsp;{code}</div>
      <div className="mb-1">
        <img className='w-100' alt='info' src="../info.png" />
      </div>
    </div>
   
      <>
    <div className="gen mt-4">
      {description1}
    </div>
    {edit &&
                      <form onSubmit={handleEditSubmit}>
                        <input
                          value={description1}
                          onChange={(event) => setDescription1(event.target.value)}
                          placeholder="New description"
                        />
                        <button onClick={() => setEdit(false)}> Confirm</button>
                      </form> 
                    }
                    </>
                 
  
    <div className="gen greyCol mb-7">
      Joined 8th Jan 2021
    </div>
    <div className="flex my-3 items-center">
      <h3>95%</h3>
      <div className="gen">&nbsp;Rentals approved</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>98%</h3>
      <div className="gen">&nbsp;Response rate</div>
    </div>
    <div className="flex my-3 items-center">
      <h3>72</h3>
      <div className="gen">&nbsp;Rentals</div>
    </div>
    <div className="lineA mt-8"></div>


  </div>

  <div className="rightCol ml-12">

      <Tabs activeTab="1" className="mt-5 w-100" ulClassName="tabTitle" activityClassName="bg-success activeTabTitle" onClick={(event, tab) => console.log(event, tab)} >
        <Tab title="Listed" className="mr-3 w-1/2">
           
        
           <div className="mt-0 lg:mt-12 max-w-lg grid gap-5 grid-cols-2 lg:max-w-none">
  
            <div>
            <div className="flex flex-col overflow-hidden thumbImgBx">
              <div className="flex-shrink-0 relative thumbImg">
                <img className="w-full h-full object-cover rounded-3xl lg:rounded-2xl" src="../pstn.png" alt="playstation" />
              </div>
              <div className="flex flex-row px-8">

                  <div className="flex-1 py-6 pr-4 flex flex-col justify-between">
                      <div className="flex items-center ">
                        <h3>4</h3>
                        <div className="smallCoin flex mb-1 ml-1.5 mr-1">
                          <img className='w-100' alt='REN coin' src="../coin.png" />
                        </div>
                        <h3>/day</h3>
                      </div>
                      <div className="line mt-1 mb-3"></div>
                      <div className="gen"> Xbox Series X</div>
                  </div>

                  <div className="gen pt-9">23rd Sep 2021</div>
              </div>
            </div>
            </div>
            </div>




         </Tab>
     
         <Tab title="Rented" className="mr-3 w-1/2">
              <div className="mt-3">
                  Tab 2 content
               </div>
          </Tab>
     
{/*          <Tab title="Reviews" className="mr-3 w-1/3">
              <div className="mt-3">
                  Tab 3 content
              </div>
          </Tab>*/}
      </Tabs>
  </div>

</div>



      {loading &&
        <p>Loading...</p>
      }
      {!loading &&
        <>
          { user &&
            <>
              <Post 
                  // description={post1.description}

                />

{/*                {user &&
                  <>
                    {isPostAlreadyLiked &&
                      <button onClick={handleRemoveLike}>Remove Like</button>
                    }
                    {!isPostAlreadyLiked &&
                      <button onClick={handleLike}>Like</button>
                    }
                  </>
                }*/}


{/*                {user &&
                  <>
                    <button onClick={() => setEdit(true)}> Edit this post </button>
                    {edit &&
                      <form onSubmit={handleEditSubmit}>
                        <input
                          value={description1}
                          onChange={(event) => setDescription1(event.target.value)}
                          placeholder="New description"
                        />
                        <button> Confirm</button>
                      </form> 
                    }
                  </>
                }*/}

          </>
          }
{/*          { !post.id &&
            <p> not found </p>
          }*/}
        </>
      }
    </div>
  );
}






























