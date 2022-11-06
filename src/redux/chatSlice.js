import { createSlice } from '@reduxjs/toolkit';


export const chatSlice = createSlice({
    name:'chat',  // store name,
    
    initialState: {
       chatId:"",
       user:{}
    
    },

    reducers:{
           
        setChat:(state,action)=>void(
         
            state.user = action.payload.user,
            state.chatId = action.payload.chatId

        )
    }
})

export const {setChat} = chatSlice.actions;
export default chatSlice.reducer;