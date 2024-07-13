import { onAuthStateChanged } from "firebase/auth";
import  React, { createContext } from "react";
import { auth } from "../FireBase";

export const AuthContext = React.createContext()

export const AuthContextProvider = ({children}) =>{
    const [CurrentUser , setCurrentUser] = React.useState({})

    React.useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            console.log(user)
        })
        return()=>{
            unsub()
        }
    },[])
    return(
        <AuthContext.Provider value={{CurrentUser}}>
        {children}
    </AuthContext.Provider>
    )
}

