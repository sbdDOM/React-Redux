const redux = require('redux')
const createStore = redux.createStore

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

const store = createStore(reducer)