import React from "react";
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { AuthContext } from "../Context/AuthContex";

function Search() {
    const [username, setUsername] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const   {CurrentUser} = React.useContext(AuthContext)


    async function handleSearch() {
        const q = query(
            collection(db, "users"),
            where("Username", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
               
            });
        } catch (error) {
            setError("User not found!");
        } finally {
            setLoading(false);
        }
    }

    function handleKey(e) {
        if (e.code === "Enter") {
            handleSearch();
        }
    }
    async function handleSelect(){
        const combinedId = 
        CurrentUser.uid > user.uid 
        ? CurrentUser.uid + user.uid
         : user.uid +CurrentUser.uid
         try {
            const res = await getDoc(doc(db,"chats",combinedId))
            if(!res.exists()){
                await setDoc(doc(db,"chats", combinedId),{messages : []})
                await updateDoc(doc(db,"userChats",CurrentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid:user.uid, 
                        Username : user.Username,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                })
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:CurrentUser.uid, 
                        Username : user.Username,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                })
            } 
            console.log("hello world")
         } catch (error) {
            setError(true)
            console.log("error")
         }
         setUser(null)
    }
    
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Find a user"
                    value={username}
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {error && <span>User not Found!</span>}
            {loading && <span>Loading...</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="search-avatar"
                    />
                    <div className="userChatInfo">
                        <span>{user.Username}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
