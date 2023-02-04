import { collection, doc, onSnapshot } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

import ReactLoading from "react-loading";
import { Box } from "@mui/material";

const Messages = () => {
  const { data } = useContext(ChatContext);

  const [loading, setLoading] = useState(false);
  //   const chatsRef = collection(db, "chats");
  //   console.log(chatsRef)

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (data.chatId) {
      setLoading(true);
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (document) => {
        document.exists() && setMessages(document.data().messages);
        setLoading(false);
      });

      return () => {
        unsub();
        setLoading(false);
      };
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#c6c6c6",
            fontSize: "13px",
          }}
        >
          No messages, please chat with {data?.user?.displayName || "this user"}
        </p>
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ReactLoading
            type={"cylon"}
            color={"gray"}
            height={"30px"}
            width={"70px"}
          />
        </Box>
      )}
      {messages &&
        messages.map((message) => (
          <Message key={message.id} message={message}></Message>
        ))}
    </div>
  );
};

export default Messages;
