let newTaskState = {
	name     : '',
	description     : '',
	deadline : '',
	error    : ''
}

export const NewTask = (state=newTaskState,action) => {
	switch(action.type){
		case 'changeTaskName' : return {...state,name:action.value};
		case 'changeTaskDesc' : return {...state,description:action.value};
		case 'changeTaskDeadline' : return {...state,deadline:action.value};
		case 'changeTaskError' : return {...state,error:action.value};
		default : return state
	}
}