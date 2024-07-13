import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContex";
import { ChatContext } from "../Context/ChatContext";


function Message({message}){
    console.log(message)
    const {CurrentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const  ref = React.useRef()

    React.useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message])
    return(
        <div ref={ref}
        className={`message ${message.senderId === CurrentUser.uid && "owner" }`}>
            <div className="messageInfo">
                <img 
                className="img-messageInfo" 
                src={
                    message.senderId === CurrentUser.uid 
                    ? CurrentUser.photoURL
                    : data.user.photoURL
                }
                alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p className="messageContent-p">{message.text}</p>
               {message.img &&
                <img 
                className="img-messageContent" 
                alt="" 
                src={message.img}
                />}
            </div>
        </div>
    )
}

export default Message