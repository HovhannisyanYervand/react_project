import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {connect} from 'react-redux'
import {ChangeValue} from '../store/newtask/action'
import Axios from 'axios'


 class NewTasks extends Component{
 	constructor(props){
 		super(props);
 		
 		
 		
 	}
 

 	changeValue = (e) => {
 	this.props.ChangeValue(e.target.getAttribute('id'),e.target.value)
 	}

	addTask =() => {
		this.props.newtask.error = '';
		let status = true
		for(let i in this.props.newtask){
			if(this.props.newtask[i]==='' && i!=='error'){
			this.props.ChangeValue('changeTaskError','fill all fields');
			status = false
			}
		}
		if(status){
			this.props.ChangeValue('changeTaskError','');
			let data = Object.assign({},this.props.newtask)
			delete data.error;
			data.user_id = this.props.login.id;
			data.status = 0;			
			Axios.post('http://localhost:4000/addTask',{table:'tasks',data}).then((r) => {

			
			let inp = document.getElementsByTagName('input');
			this.props.ChangeValue('changeTaskName','')
			this.props.ChangeValue('changeTaskDesc','')
			this.props.ChangeValue('changeTaskDeadline','')
			inp[0].value=''
			inp[1].value=''
			inp[2].value=''
			})
			
		}
		
	}

	render(){
		return(
		<div>
		<h1 id = 'h1'>{this.props.newtask.error}</h1>
		<nav className="navbar navbar-expand-sm bg-light">

  
  			<ul className="navbar-nav">  			  
  			  <li className="nav-item">
  			    <Link className="nav-link badge-danger" to="/profile/alltasks">My tasks</Link>
  			  </li>
  			  
  			</ul>

		</nav>
		Name:<input type="text"  value = {this.props.newtask.name}     onChange = {this.changeValue.bind(this)}   className="form-control" id="changeTaskName"/>
		Desc:<input type="text"  value = {this.props.newtask.description}     onChange = {this.changeValue.bind(this)}   className="form-control" id="changeTaskDesc"/>
		Deadline:<input type="date" value = {this.props.newtask.deadline}  onChange = {this.changeValue.bind(this)}  className="form-control" id="changeTaskDeadline"/>
		<button type="button" onClick = {this.addTask.bind(this)}  className="btn btn-danger">Add</button>
		</div>
		
			)
	}
}

function mapStateToProps(state){
	
	return {
		newtask : state.newTask,
		login : state.login
		
	}
}

let mapDispatchToProps = {
	ChangeValue
}

export default connect(mapStateToProps,mapDispatchToProps)(NewTasks)