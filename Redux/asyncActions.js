const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios  = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const userRequested = 'userRequested'
const userSucceeded = 'userSucceeded'
const userFailed = 'userFailed'

const userRequest = () => {
    return {
        type: userRequested,
    }
}

const userSucceess = users => {
    return {
        type: userSucceeded,
        payload: users,
    }
}

const userFailure = error => {
    return {
        type: userFailed,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case userRequested:
            return{
                ...state,
                loading: true,
            }
        case userSucceeded:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }
        case userFailed:
            return{
                loading: false,
                user: [],
                error: action.payload,
            }
    }         
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the users 
                const users = response.data.map((user) => user.id)
                dispatch(fetchUsersSuccess(users))
            }).catch(error => {
                //error.message is the error message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log(store.getState())})
store.dispatch(fetchUsers())