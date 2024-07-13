import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../FireBase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContex";


function Navbar(){
    const {CurrentUser} = useContext(AuthContext)
    return(
        
            <div className="nav">
                <span className="nav-logo">Ayo Chat</span>
                <div className="user">
                <img src={CurrentUser.photoURL} alt="pics" className="avatar"/>
                <span >{CurrentUser.displayName}</span>
                <button className="btn" onClick={()=>signOut(auth)}>logout</button>
            </div>
            </div>
    
    )
}

export default Navbar