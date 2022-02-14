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
import Calc from './pages/Calc'
import Type from './pages/Type'
import {UserContext} from './context/UserContext'


  


        

function App() {

  const {user, setUser, create, simpleUser, setSimpleUser} = useContext(UserContext)

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
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/calc" exact component={Calc} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/products/:id" exact component={SingleProduct} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </BrowserRouter>

    </div>
    </div>
    )
 
}

export default App;
