import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Reducers from './store/reducers'
import Signup from './components/signup'
import Login from './components/login'
import Profile from './components/profile'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import NewTask from './components/newTask'
import AllTasks from './components/allTasks'
const store  = createStore(Reducers)
export default  class App extends Component {
  

  
  


  render() {
    
    return (
      <Provider store = {store} >
      <div>
    <Router >
    
     <nav className="navbar navbar-expand-sm bg-light">

 		 
  		<ul className="navbar-nav">
  		  <li className="nav-item">
  		    <Link className="nav-link" to="/">Signup</Link>
  		  </li>
  		  <li className="nav-item">
  		    <Link className="nav-link" to="/login">Login</Link>
  		  </li>
  		  <li className="nav-item">
  		    <Link className="nav-link" to="/profile">Profile</Link>
  		  </li>
  		</ul>

	</nav>


    <Route path = '/' exact component = {Signup} /> 
    <Route path = '/login' exact component = {Login} /> 

    <Route
      path="/profile"
      render={({ match: { url } }) => (
        <>
          <Route path={`${url}/`} component={Profile} exact />
          <Route path={`${url}/addnewtask`} component={NewTask} />
          <Route path={`${url}/alltasks`} component={AllTasks} />
        </>
      )}
    />

	</Router>
  </div>
  </Provider>
      
    )
  }



}


