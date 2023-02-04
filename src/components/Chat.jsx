import React, { useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallIcon from "@mui/icons-material/Call";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Messages from "./Messages";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const currentUser = useContext(AuthContext);
  //  console.log(chat)

  const navigate = useNavigate();
  const { data } = useContext(ChatContext);

  return (
    currentUser && (
      <div className="chat">
        <div className="chatInfo">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ArrowBackIcon
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
              }}
            />
            <span className="chatName">{data?.user?.displayName}</span>
            <div className="chatImage">
              <img src={data?.user.pfpUrl} alt="" />
            </div>
          </div>
          <div>
            <Typography
              sx={{
                fontSize: "12px",
                color: "white",
              }}
            >
              Chat Securely
            </Typography>
          </div>

          <div className="chatIcons">
            <CallIcon sx={{ width: "20px", color: "white" }}></CallIcon>
            <PersonAddIcon
              sx={{ width: "20px", color: "white" }}
            ></PersonAddIcon>
            <MoreVertIcon sx={{ width: "20px", color: "white" }}></MoreVertIcon>
          </div>
        </div>
        <Messages></Messages>
        <Input></Input>
      </div>
    )
  );
};

export default Chat;
