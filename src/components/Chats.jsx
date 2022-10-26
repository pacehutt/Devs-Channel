import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Chats = () => {

  const [ chats, setChats ] = useState(null);
   const currentUser = useContext(AuthContext);
  useEffect(() => {
    const getChats = ()=>
    {const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(Object.entries(doc.data()));
     
  });

    return () => {
      unsub();
    };}

    // Because first we need the currentUser

    currentUser.uid && getChats();
  }, []);
  //  console.log(Object.entries(chats))
  return (
    <div className='chats'>
      <div className="usersChat">

        {
          chats && chats.map((chat) => 
          
            <div className="user" key={chat[0]}>
            <img src={chat[1].friendInfo.pfpUrl} alt="" />
            <div className="userChatInfo">

            <span className="userName">{chat[1].friendInfo.displayName}</span>
            <span>{chat[1].friendInfo.lastMessage?.text}</span>
            </div>
            <span className="time">{chat[1].friendInfo.lastMessage?.time || "12:33"}</span>

         </div>
          
          )
        }
         
     </div>
    </div>
  )
}

export default Chats