import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Slide from "@mui/material/Slide";

import { deleteDoc, doc } from "firebase/firestore";

import Backdrop from "@mui/material/Backdrop";

import ReactLoading from "react-loading";

import { animated, useSpring } from "@react-spring/web";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const currentUser = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const [deleting, setDeleting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // auth.currentUser
    //   .delete()
    //   .then(() => {
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setDeleting(true);
    deleteDoc(doc(db, "users", auth.currentUser.uid))
      .then(() => {
        auth.currentUser
          .delete()
          .then(() => {
            navigate("/login");
            setDeleting(false);
          })
          .catch((err) => {
            console.log(err);
            setDeleting(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "65%%",
      sm: "65%",
      md: "40%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",

    background: "#141E30",
    background: "-webkit-linear-gradient(to right, #243B55, #141E30)",
    background: "linear-gradient(to right, #243B55, #141E30)",
    color: "white",
    boxShadow: 24,
    border: "none",
    outline: "none",
    p: 5,
  };

  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 24,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleting}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleting}>
          <Box sx={style}>
            <Typography>Please Wait...</Typography>
            <ReactLoading
              type={"cylon"}
              color={"darkGray"}
              height={"40px"}
              width={"70px"}
            />
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#414555" }}>
          {"Delete Your Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              color: "#414555",
            }}
          >
            You are about to delete your account. All your data will be deleted
            <br />
            Are you sure, you want to delete it ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Box
        className="container"
        sx={{
          borderRadius: "15px",

          height: "90%",
          display: "flex",
          overflow: "hidden",
          width: {
            xs: "90%",
            sm: "80%",
            md: "40%",
          },
          margin: {
            xs: "0px",
            sm: "0px",
            md: "20rem",
          },
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "1rem",
          }}
        >
          <Navbar></Navbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <ArrowBackIcon
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                color: "white",
              }}
            />
            <Typography variant="button" color={"white"} fontSize={"16px"}>
              My Profile
            </Typography>
          </Box>

          <animated.div style={styles}>
            <Box>
              <Grid
                container
                spacing={2}
                flexDirection={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                }}
                alignItems={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                }}
                justifyContent={{
                  xs: "center",
                  sm: "center",
                  md: "flex-start",
                }}
                sx={{
                  marginTop: "1rem",
                  padding: "0 1rem",
                }}
              >
                <Grid item>
                  <Box
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "30px",
                    }}
                  >
                    <img
                      src={currentUser?.photoURL}
                      // src={"https://byuc.files.wordpress.com/2012/07/avat-2.jpg"}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: {
                      xs: "center",
                      sm: "center",
                      md: "flex-start",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="button"
                      fontSize={"16px"}
                      sx={{
                        textAlign: {
                          xs: "center",
                          sm: "center",
                          md: "left",
                        },
                      }}
                    >
                      {currentUser.displayName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body"
                      fontSize={"16px"}
                      sx={{
                        textAlign: {
                          xs: "center",
                          sm: "center",
                          md: "left",
                        },
                      }}
                    >
                      {currentUser.email}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{ marginTop: "1rem" }}
                    onClick={() => {
                      auth.signOut();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                padding: "1rem",
                width: "95%",
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "flex-end",
                },
                marginTop: "1rem",
                // paddingRight: "1rem",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#A30101",
                  fontSize: "12px",
                  "&:hover": {
                    backgroundColor: "#BE202F",
                  },
                }}
                onClick={handleClickOpen}
              >
                Delete My Account
              </Button>
            </Box>
          </animated.div>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
