import React,{Component} from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
class Profile extends Component{
	constructor(props){
		super(props);
		
	}

	componentWillMount(){
		if(typeof this.props.location.userInfo!='object'){
			this.props.history.push({pathname:'/login'})
		}
	}

	render(){
		return (
		<div>
		<nav className="navbar navbar-expand-sm bg-light">

  
  			<ul className="navbar-nav">
  			  <li className="nav-item">
  			    <Link className="nav-link badge-success" to="/profile/addnewtask">Add task</Link>
  			  </li>
  			  <li className="nav-item">
  			    <Link className="nav-link  badge-danger " to="/profile/alltasks">My tasks</Link>
  			  </li>
  			  
  			</ul>

		</nav>

		
		</div>

			)
	}
}
export default Profile