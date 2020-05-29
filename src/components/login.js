import React,{Component} from 'react'
import {connect} from 'react-redux'
import {ChangeValue} from '../store/login/action'
import Axios from 'axios'



class Login extends Component{
	constructor(props){
		super(props);
		
		
	}

	changeValue = (e) => {
	this.props.ChangeValue(e.target.getAttribute('id'),e.target.value)

	}

	SaveChanges = () => {
		this.props.login.error = ''
		let status = true;
		for(let i in this.props.login){
			if(i!=='error' && this.props.login[i]=='' && i!=='id'){
				this.props.ChangeValue('changeError','fill all fields');
				status = false
				}
		}
		if(status){
			document.getElementById('h1').innerHTML = '';
			let user = Object.assign({},this.props.login)
			delete user.error;
			delete user.id;
			
			Axios.post('http://localhost:4000/login',{user,table : 'users'}).then((r) => {
				if(r.data.length!=0){
					this.props.ChangeValue('changeId',r.data[0].id);
					this.props.login.email = '';
					this.props.login.password = '';					
					this.props.history.push({pathname:'/profile',userInfo:r.data})
				}
				else{
					document.getElementById('h1').innerHTML = 'there is invalid email/password';
					this.props.ChangeValue('changeEmail','')
					this.props.ChangeValue('changePassword','')
					
					
				}
			})
		}

	}

	render(){
		return (
		<div>
		<h1 id = 'h1'>{this.props.login.error}</h1>
		Email:<input type="text" value = {this.props.login.email} onChange = {this.changeValue.bind(this)} className="form-control" id="changeEmail"/>
		Password:<input type="text" value = {this.props.login.password} onChange = {this.changeValue.bind(this)} className="form-control" id="changePassword"/>	
		<button type="button" onClick = {this.SaveChanges} className="btn btn-danger">Login</button>
		</div>

			)
	}
}

function mapStateToProps(state){
	
	return {
		login : state.login
	}
}

let mapDispatchToProps = {
	ChangeValue
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)