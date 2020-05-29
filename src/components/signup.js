import React,{Component} from 'react'
import {connect} from 'react-redux'
import {ChangeValue} from '../store/signup/action'
import Axios from 'axios'

class Signup extends Component{
	constructor(props){
		super(props);
		
	}

	changeValue = (e) => {
		this.props.ChangeValue(e.target.getAttribute('id'),e.target.value)
	}

	SaveChanges = () => {

		this.props.signup.error = ''
		let status = true
		for(let i in this.props.signup){
			if(this.props.signup[i] == '' && i!=='error'){
			this.props.ChangeValue('changeError','fill all fields');
			status = false	
			}
		}
		if(status){
			
			let user = Object.assign({},this.props.signup)
			delete user.error			
			document.getElementById('h1').innerHTML = '';
			Axios.post('http://localhost:4000/signup',{user:user,table : 'users'}).then((r) => {
				this.props.ChangeValue('name','')				
				this.props.ChangeValue('email','')				
				this.props.ChangeValue('password','')				
				this.props.history.push({pathname:'/login'});

			})
		}
	}

	render(){
		return (

		<div>
		<h1 id='h1'>{this.props.signup.error}</h1>
		Name:<input type="text" value = {this.props.signup.name} onChange = {this.changeValue.bind(this)} className="form-control" id="changeName"/>
		Email:<input type="text" value = {this.props.signup.email} onChange = {this.changeValue.bind(this)} className="form-control" id="changeEmail"/>
		Password:<input type="text" value = {this.props.signup.password} onChange = {this.changeValue.bind(this)} className="form-control" id="changePassword"/>
		<button type="button" onClick = {this.SaveChanges} className="btn btn-danger">SAVE</button>


		</div>	

			)
	}
}
function mapStateToProps(state){
	return {
		signup:state.signup
	}
}

let mapDispatchToProps = {
	ChangeValue
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup)