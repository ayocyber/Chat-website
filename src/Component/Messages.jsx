import React from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../FireBase";
import { ChatContext } from "../Context/ChatContext";

function Messages(){
    const [messages , setMessages] = React.useState([])
    const {data} = React.useContext(ChatContext)

    React.useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats", data.chatID), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })
        return ()=>{
            unSub()
        }
    },[data.chatID])
    return(
        <div className="messages">
            {messages.map(m=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages