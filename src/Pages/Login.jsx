import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FireBase";
function Login(){
    const [error , setError] = React.useState(false)
    const [email , setEmail] = React.useState("")
    const [password , setPassword] = React.useState("")
    const navigate = useNavigate()

    async function HandleSubmit(e){
        e.preventDefault()
        try {
          await signInWithEmailAndPassword(auth, email, password)
          navigate("/")
        } catch (error){
          setError(true)
        }
        setEmail("")
        setPassword("")
    
      } 
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Ayo Chat</span>
                <span className="title">register</span>
                <form onSubmit={HandleSubmit}>
                <input 
                    type="email" 
                    placeholder="email" 
                    className="sin-input"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input   
                    type="password" 
                    placeholder="password" 
                    className="sin-input"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button>Log in</button>
                    {error && <span>Fuckkkkkk Gideon</span>}
                </form>
                
                <p>You don't have an account?<Link to="/register">Register</Link> </p>
            </div>
        </div>
    )
}

export default Login