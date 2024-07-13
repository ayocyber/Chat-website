import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../FireBase";
import { AuthContext } from "../Context/AuthContex";
import { ChatContext } from "../Context/ChatContext";

function Chats(){
    const [chats , setChats] = React.useState([])

    const {CurrentUser} = React.useContext(AuthContext)
    const {dispatch} = React.useContext(ChatContext)

    React.useEffect(()=>{
        function getChats(){
            const unsub = onSnapshot(doc(db, "userChats", CurrentUser.uid), (doc) => {
                setChats(doc.data())
                
             });
             return ()=>{
                 unsub()
                 
             }
        }
       CurrentUser.uid && getChats()
    },[CurrentUser.uid])

    const handleSelect = (u)=>{
        dispatch({type:"CHANGE_USER",payload: u})
    }
    console.log(Object.entries(chats))
    console.log(chats)
    return(
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date- a[1].date).map(chat=>(
                <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1]?.userInfo?.photoURL}
                alt="pics" 
                className="search-avatar"/>
                    <div className="userChatInfo">
                        <span className="chat-span">{chat[1]?.userInfo?.Username}</span>
                        <p className="chat-p">{chat[1]?.lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats