import { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  
  const currentUser = useContext(AuthContext);
  
  const INITIAL_STATE =   {
    chatId:"",
    user:{

    }
  }
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload.user,
          chatId:action.payload.chatId
   
        };
        }

      }

      const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
    
  return(

      <ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider>
  )
};
