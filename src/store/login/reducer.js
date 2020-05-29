let loginState = {
	email : '',
	password : '',
	error : '',
	id :     '',

}

export  const Login = (state = loginState,action) => {
	switch(action.type){
		case 'changeEmail' : return {...state,email: action.value};
		case 'changePassword' :  return {...state,password: action.value};
		case 'changeError' : return {...state,error: action.value};
		case 'changeId' : return {...state,id: action.value};
		default: return state

	}
} 