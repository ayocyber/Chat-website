import React from "react";
import add from "../Img/addAvtar.png"
import video from "../Img/video.png"
import dot from "../Img/dot.png"
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";

function Chat(){
    const {data} = React.useContext(ChatContext)
    return(
        <div className="chat">
            <div className="chatInfo">
                <span className="chat-span">{data.user?.Username}</span>
                <div className="chatIcons">
                     <img src={video} alt="" className="Icon"/>
                     <img src={add} alt=""  className="Icon"/>
                     <img src={dot} alt=""  className="Icon"/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat