import { collection, doc, onSnapshot } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const { data } = useContext(ChatContext);
//   const chatsRef = collection(db, "chats");
//   console.log(chatsRef)

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if(data.chatId)
    {

        const unsub = onSnapshot(doc(db, "chats", data.chatId), (document) => {
            document.exists() && setMessages(document.data().messages);
            console.log(document.data());
            console.log(document.data().messages);
        });
        
        return () => {
            unsub();
        };
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message}></Message>
      ))}
    </div>
  );
};

export default Messages;
