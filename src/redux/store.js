import {  configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'

export default configureStore({
    reducer:{
        chat:chatReducer
    }
})
