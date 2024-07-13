import React from "react";
import Chat from "../Component/Chat";
import Sidebar from "../Component/Sidebar";

function Home(){
    return(
        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home