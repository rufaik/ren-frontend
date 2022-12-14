import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Create from './pages/Create'
import Nav from './components/Nav'
import SinglePost from './pages/SinglePost'
import SingleProduct from './pages/SingleProduct'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from './pages/Reset'
import Forgot from './pages/Forgot'
import Cart from './pages/Cart'
import Type from './pages/Type'
import Search from './pages/Search'
import Credits from './pages/Credits'
import Slide from './pages/Slide'
import NewListing from './pages/NewListing'
import Topup from './pages/Topup'
import TransitionPayout from './pages/TransitionPayout'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Partners from './pages/Partners'
import {UserContext} from './context/UserContext'
import {API_URL} from './utils/urls'


  


        

function App() {

  const {user, setUser, create, simpleUser, setSimpleUser, mainImages, setImages, lightMode, setLight} = useContext(UserContext)

    useEffect(() => {
      if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
        }
    }, [])


    useEffect(() => {
      if(localStorage.getItem('simpleUser')){
        const simpleUser = JSON.parse(localStorage.getItem('simpleUser'))
        setSimpleUser(simpleUser)
        }
    }, [])




    console.log("APPPPPP", lightMode)
    console.log("GHHHHHH", user)


    const getImages = async () => {
      try{
        const response = await fetch(`${API_URL}/homepages`, {
            method: 'GET',
            headers: {
            'Content-Type':'application/json',
            }
          })

          const data = await response.json()
          setImages(data)

      } catch(err){
    console.log("Exception ", err)}
  

    }

   useEffect(() => {
      getImages()
    }, [])


  return (
    <div className={create}>
    <div className="App">

  

      <BrowserRouter>
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/reset" exact component={Reset} />
          <Route path="/type" exact component={Type} />
          <Route path="/search" exact component={Search} />
          <Route path="/credits" exact component={Credits} />
          <Route path="/topup" exact component={Topup} />
          <Route path="/transitionpayout" exact component={TransitionPayout} />
          <Route path="/newlisting" exact component={NewListing} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/Terms" exact component={Terms} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/slide" exact component={Slide} />
          <Route path="/about" exact component={About} />
          <Route path="/howitworks" exact component={HowItWorks} />
          <Route path="/partners" exact component={Partners} />
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/listing/:id" exact component={SingleProduct} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </BrowserRouter>

    </div>
    </div>
    )
 
}

export default App;
