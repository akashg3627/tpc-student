import * as ActionTypes from '../../ActionTypes';
export const User =(state={
    user: localStorage.getItem('creds'),
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isAuth: localStorage.getItem('token') ? true : false
}, action)=>{
    switch(action.type) {
        case ActionTypes.LOGIN:
            return {...state, isAuth: true, user: action.user, token: action.token};
        case ActionTypes.LOGOUT:
            return {...state, isAuth: false, user: null , token: ''};
        default:
            return state;
    }
}