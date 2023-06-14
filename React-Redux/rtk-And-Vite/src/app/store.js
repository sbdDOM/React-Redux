//start by importing it
import {configureStore} from '@reduxjs/toolkit'
//const reduxLogger = require('redux-logger')
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import userReducer from '../features/user/userSlice'

const logger = reduxLogger.createLogger()

//invoke the constant and assign it to a variable
const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        user: userReducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store