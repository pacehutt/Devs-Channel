import React, { useState,useContext } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import  {db} from '../firebase'

import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const currentUser = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("")
  const [err, setErr] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [freindReqMessage, setFreindReqMessage] = useState("Add Friend");
  const addfriend = async ()=>
  {
    console.log("add friend")
    setFreindReqMessage("Friend Request Sent")
    // Check whether the yuser chat exxists or not
    const combinedId= user.uid > currentUser.uid ? user.uid + currentUser.uid : currentUser.uid+user.uid ;
    try{
      const res = await getDoc(doc(db, "userChats", combinedId))

      if(!res.exists())
      {
        // create the chat for with the combined id of both users
        await setDoc(doc(db, "chats", combinedId), {
        
          messages: [],
        });

        await updateDoc(doc(db,"userChats", currentUser.uid), {
          [combinedId+".friendInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            pfpUrl: user.pfpUrl,
          },
          [combinedId+".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db,"userChats", user.uid), {
          [combinedId+".friendInfo"]:{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            pfpUrl: currentUser.pfpUrl,
          },
          [combinedId+".date"]: serverTimestamp(),
        });
      }

      setTimeout(() => {
        setUser(null);
        setUserName(null);
      }, 1000);
    }
    catch(err)
    {

    }
    
  }
  const searchUser = async ()=>
  {
    try
   { const q = query(collection(db,"users"), where("displayName", "==", userName));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if(querySnapshot.empty)
    {
      setEmpty(true);
      setErr("No user found");
      return;
    }
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUser(doc.data());
});}
catch(err)
{
  setErr(err.message);
}
  }

  const handleKey= e => e.code === 'Enter' && searchUser();
  return (
   <div className="search">


     <div className="searchForm">
        <input type="text" onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)} placeholder='Search users' value={userName}/>
     </div>
     {err && <div className="err">{err}</div>}
    {
    user && <div className="usersChat">
         <div className="user">
            <img src={user.pfpUrl} alt="" />
            <div className="userChatInfo">

            <span className="userName">{user.displayName}</span>
            <span className="time">9:33</span>
            </div>
            <button onClick={addfriend}>{freindReqMessage}</button>

         </div>
     </div>}

   </div>
  )
}

export default Search