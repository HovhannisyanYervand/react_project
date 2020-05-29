import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom" 
import {connect} from 'react-redux'
import Axios from 'axios'

 class AllTasks extends Component{
	constructor(props){
		super(props);

	this.state = {
		tasks : []
	}
		
	}

	componentWillMount(){
		let id =  this.props.login.id;
		let data = {user_id : id}
		

		Axios.post('http://localhost:4000/myTasks',{data,table : 'tasks'}).then((r) => {
			this.state.tasks=r.data;
			this.setState({})
			
		})
	}

	changeStatus = (e) => {
		let id = e.target.getAttribute('id');
		let status
		(e.target.checked==true)?status=1:status=0;
		let data = {status : status}
		Axios.post('http://localhost:4000/changeStatus',{table : 'tasks',data,id:id});
		(status)?e.target.parentElement.firstChild.style.textDecoration='line-through':e.target.parentElement.firstChild.style.textDecoration='none'
	} 

	deleteTask = (e) => {
	let id = e.target.getAttribute('id');
	Axios.post('http://localhost:4000/delete',{table:'tasks',id:id});
	e.target.parentElement.remove()
	}

	render(){
		return(
		<div>			
		<nav className="navbar navbar-expand-sm bg-light">

  
  			<ul className="navbar-nav">
  			  <li className="nav-item">
  			    <Link className="nav-link badge-success" to="/profile/addnewtask">Add task</Link>
  			  </li>
  			  
  			  
  			</ul>

		</nav>
		{
			this.state.tasks.map((item,index) => {
				return(
				<ul key = {index}>
				{
				(item.status===0)?<li>{item.name}</li>:<li style={{textDecoration: 'line-through'}} >{item.name}</li>
				}
					
					<li>{item.description}</li>
					<li>{item.deadline}</li>

					{
					(item.status===0)?<input type='checkbox' onClick = {this.changeStatus.bind(this)} defaultChecked = {false} id = {item.id}/>:<input onClick = {this.changeStatus.bind(this)} type='checkbox' defaultChecked = {true} id = {item.id}/>	
					}
				<button id = {item.id} onClick={this.deleteTask.bind(this)}>Delete</button>
				</ul>	
				)
			})
		}
		</div>
			)
	}
}

function mapStateToProps(state){
	
	return {
		
		login : state.login
		
	}
}



export default connect(mapStateToProps)(AllTasks)