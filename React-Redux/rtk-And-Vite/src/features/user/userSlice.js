import {createSlice, AsyncThunk} from '@reduxjs/toolkit'
//with redux toolkit to create an async action we make use of the
//createAsyncThunk function 
//redux thunk is applied as a middleware to the store under the hood

import axios from 'axios'


const initialState = {
    loading: false,
    user: [],
    error: ''
}

//Generated pending, fulfilled and rejected actions types
//The function accepts an action type as it first argument
// and a callback as its second argument
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    //the callback function will contain the async logic and return a promise
    // createAsyncThunk will dispatch the promise life cycle actions that we 
    // can listen to using extraReducers
    //The life cylces include: pending, fulfilled and rejected 
    return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data.map((user) => user.id))
})

const userSlice = createSlice({
    name: 'user',
    initialState, 
    extraReducers: builder => {
        //Pending
        //For when the request is made
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        //Fulfilled
        //For when the request succeeds
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        //Rejected
        //For when the request fails
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

//export reducer as the default export 
//and fecthUsers function as a named export
export default userSlice.reducer


//Make sure to attach in store and dispatch in index