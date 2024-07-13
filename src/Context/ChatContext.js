import React from "react";
import { AuthContext } from "./AuthContex";


export const ChatContext = React.createContext()



export const ChatContextProvider =({children})=>{
    const {CurrentUser} = React.useContext(AuthContext)
    const INITIAL_STATE ={
        chatID:"null",
        user: {}
    }
    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatID: CurrentUser.uid > action.payload.uid 
                    ? CurrentUser.uid + action.payload.uid
                     : action.payload.uid +CurrentUser.uid
                }

            default:
                return state
        }
    }
    const [state , dispatch] = React.useReducer(chatReducer,INITIAL_STATE)
    return(
        <ChatContext.Provider value={{data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}
