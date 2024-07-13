import React from "react";
import add from "../Img/avatar.jpg"
import { auth, db, storage } from "../FireBase"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";


function Register(){
    const [error , setError] = React.useState(false)
    const [Username , setUserName] = React.useState("")
    const [email , setEmail] = React.useState("")
    const [password , setPassword] = React.useState("")
    const navigate = useNavigate()

    async function HandleSubmit(e){
        e.preventDefault()
        try {
          const userCredential = await createUserWithEmailAndPassword(auth,email,password)
          const fileInput = document.getElementById('file');
          const file = fileInput.files[0];       

const storageRef = ref(storage, Username);
const uploadTask = uploadBytesResumable(storageRef, file);
// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    setError(true)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(userCredential.user,{
        displayName: Username,
        photoURL : downloadURL
      })
      await setDoc(doc(db, "users" , userCredential.user.uid),{
        uid: userCredential.user.uid,
        Username,
        email,
        photoURL: downloadURL
      })
      await setDoc(doc(db, "userChats",userCredential.user.uid),{})
      navigate("/")
    });
  }
);

 
          console.log(userCredential)
        } catch (error){
          setError(true)
        }
        setEmail("")
        setPassword("")
        setUserName("")
      } 
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Ayo Chat</span>
                <span className="title">register</span>
                <form onSubmit={HandleSubmit}>
                    <input type="text" 
                    placeholder="Username" 
                    className="sin-input"
                    value={Username}
                    onChange={(e)=>setUserName(e.target.value)}
                    />
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
                    <input style={{display: "none"}} type="file" id="file" className="sin-input"/>
                    <label htmlFor="file">
                        <img src={add} alt="" width="42px"/>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {error && <span>Fuckkkkkk Gideon</span>}
                </form>
                <p>You don't have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register