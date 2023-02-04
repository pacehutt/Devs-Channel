import React, { useContext, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, updateDoc } from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import { Timestamp, doc } from "@firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "@firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (_) => {
    console.log(currentUser);
    if (image) {
      const key = uuid();
      const storageRef = ref(storage, `${data.chatId}/${key}`);
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL, "it is downloadURL");

          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: key,
              text,
              senderId: currentUser.uid,

              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        senderId: currentUser.uid,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        senderId: currentUser.uid,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        className="msg-input"
        placeholder="Type something.."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src="" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <PhotoCameraIcon sx={{ color: "#494d5b" }}></PhotoCameraIcon>
        </label>
        <button onClick={handleSend}>
          <SendIcon
            sx={{ color: "#1d90f5", backgroundColor: "transparent" }}
          ></SendIcon>
        </button>
      </div>
    </div>
  );
};

export default Input;
