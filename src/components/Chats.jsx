import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState(null);
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleSelect = (chatId, user) => {
    console.log(chatId, user);
    dispatch({ type: "SET_USER", payload: { user, chatId } });
    navigate("/chat");
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) setChats(Object.entries(doc.data()));
      });

      console.log("chats", chats);

      return () => {
        unsub();
      };
    };

    // Because first we need the currentUser

    currentUser.uid && getChats();
  }, []);
  //  console.log(Object.entries(chats))
  return (
    <div className="chats">
      <div className="usersChat">
        {!chats && <p>loading...</p>}

        {chats &&
          chats
            .sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="user"
                key={chat[0]}
                onClick={() => handleSelect(chat[0], chat[1].friendInfo)}
              >
                <div>
                  <img src={chat[1].friendInfo.pfpUrl} alt="" />
                </div>
                <div className="userChatInfo">
                  <span className="userName">
                    {chat[1].friendInfo.displayName}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {(!chat[1].lastMessage
                      ? "New Chat"
                      : chat[1].lastMessage?.senderId === currentUser.uid
                      ? "You: "
                      : "") +
                      chat[1].lastMessage?.text.slice(0, 20) +
                      "..."}
                  </span>
                </div>
                <span
                  className="time"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {chat[1]?.date?.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Chats;
