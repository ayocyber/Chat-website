import React from "react";
import gallery from "../Img/Icon_gallery.png"
import send from "../Img/send.jpeg"
import { AuthContext } from "../Context/AuthContex";
import { ChatContext } from "../Context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../FireBase";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input(){
    const [text , setText] = React.useState("")
    const [img , setImg] = React.useState(null)
    const {CurrentUser} = React.useContext(AuthContext)
    const {data} = React.useContext(ChatContext)


    async function handleSend() {
        try {
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);
    
                uploadTask.on("state_changed", 
                    (snapshot) => {
                        // Handle progress or other snapshot events
                    },
                    (error) => {
                        console.error("Error uploading file:", error);
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatID), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: CurrentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL
                                }),
                            });
                        });
                    }
                );
            } else {
                // If no image is selected, just update the Firestore with text message
                await updateDoc(doc(db, "chats", data.chatID), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: CurrentUser.uid,
                        date: Timestamp.now()
                    }),
                });
            }
    
            // Update userChats for both sender and receiver
            const chatUpdate = {
                [data.chatID + ".lastMessage"]: {
                    text
                },
                [data.chatID + ".date"]: serverTimestamp(),
            };
    
            await updateDoc(doc(db, "userChats", CurrentUser.uid), chatUpdate);
            await updateDoc(doc(db, "userChats", data.user.uid), chatUpdate);
    
            setText("");
            setImg(null);
        } catch (error) {
            console.error("Error sending message:", error);
            // Handle the error gracefully
        }
    }
    
    return(
        <div className="input">
            <input type="text" 
            placeholder="Type something" 
            className="inputs" 
            value={text}
            onChange={e=>setText(e.target.value)}
            />
            <div className="send">
                <img src={send} alt="" width="24px"/>
                <input type="file" id="file" style={{display :"none"}} onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={gallery} alt="" width="24px"/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input 