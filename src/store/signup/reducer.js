 let Signupstate = {
	name     : '',
	email    : '',
	password : '',
	error    : ''
}

export const Signup = (state=Signupstate,action) => {
	switch (action.type) {
		case 'changeEmail' :
			return {...state,email:action.value};
		case 'changeName' :
		  	return {...state,name:action.value};
		case 'changePassword' :
		  	return {...state,password:action.value};
		case 'changeError' :
		  	return {...state,error:action.value};
		default: return state	
	}
}