import { Box, Fade, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import Backdrop from "@mui/material/Backdrop";

import { useInView, useSpring, animated } from "@react-spring/web";

const Message = ({ message }) => {
  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageClick = () => {
    handleOpen();
    console.log("clicked");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "98%",
      sm: "98%",
      md: "60%",
    },
    height: {
      xs: "auto",
      sm: "auto",
      md: "80%",
    },
    bgcolor: "transparent",
    boxShadow: 24,
    border: "none",
    outline: "none",
    p: 1,
  };

  const [click, setClick] = useState(false);
  const messageStyles = useSpring({
    scale: click ? 1.1 : 1,
    shadow: click ? 0 : 15,
  });

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });

    // console.log(data.user, "currentUser");
  }, [message]);

  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      ref={ref}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              src={message.img}
              alt="message-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Fade>
      </Modal>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.pfpUrl
          }
          alt=""
        />
        <span
          className="time"
          style={{
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          {message?.date?.toDate().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <animated.div
        style={messageStyles}
        className="messageContent"
        onClick={() => setClick((prev) => !prev)}
      >
        {message.text?.length !== 0 && <p>{message.text}</p>}
        {message.img && (
          <img src={message.img} alt="" onClick={handleImageClick} />
        )}
      </animated.div>
    </div>
  );
};

export default Message;
