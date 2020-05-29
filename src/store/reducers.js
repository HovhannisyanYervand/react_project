import {Signup} from './signup/reducer'
import {Login} from './login/reducer'
import {NewTask} from './newtask/reducer'

import {combineReducers} from 'redux'

export default combineReducers({signup:Signup,login:Login,newTask:NewTask})