import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import Input from "@mui/material/Input";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {Link, useNavigate } from "react-router-dom";

function Register() {

  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate =useNavigate();
  const onSubmit = async (data) => {
    let username = data.username;
    let password = data.password;
    let email = data.email;
    let file = data.profile_pic ? data.profile_pic[0] : null;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `pfps/${file.name}`);
      uploadBytes(storageRef, file).then(()=>{                  

        getDownloadURL(storageRef).then(async (downloadURL) => {
         console.log(downloadURL, "it is downloadURL");
         await updateProfile(res.user, {
           displayName: username,
           photoURL: downloadURL,
         });
 
         await setDoc(doc(db, "users", res.user.uid),{
           uid: res.user.uid,
           displayName: username,
           email,
           pfpUrl: downloadURL,
           
         })

         await setDoc(doc(db, "userChats", res.user.uid),{})  

         navigate("/");



      })
    })

    } catch (err) {
      setErr(err.message);
    }

    console.log(data.username);
  };

  const CustumBox = styled(Box)`
    
      alignItems: "center",
      display: "flex",
      height: "400px",
      width: "500px",
      justifyContent: "center",
    `;

  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100vh",
        width: "500px",
        justifyContent: "center",
      }}
    >
      <CustumBox key={"custom1"}>
        <Typography variant="h4" my={3} color={"#F56A4D"}>
          Devs Channel
        </Typography>
        <Typography variant="h6">Register</Typography>

        <form onSubmit={handleSubmit(onSubmit)} sx={{ width: "inherit" }}>
          <Box
            key={"user"}
            sx={{ display: "flex", alignItems: "flex-end", margin: "19px 0" }}
          >
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Username"
              variant="standard"
              {...register("username", { required: true, minLength: 4 })}
              errors={errors.username}
              helperText={
                errors.username && "Username must be at least 4 characters"
              }
            />
          </Box>
          <Box
            key={"email"}
            sx={{ display: "flex", alignItems: "flex-end", margin: "19px 0" }}
          >
            <AlternateEmailIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="input-with-sx"
              label="Email"
              variant="standard"
              {...register("email", { required: true, minLength: 4 })}
              errors={errors.email}
              helperText={errors.username && "valid email required"}
            />
          </Box>
          <Box key={"pwd"} sx={{ display: "flex", alignItems: "flex-end" }}>
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Password"
              variant="standard"
              {...register("password", { required: true, minLength: 5 })}
              errors={errors.password}
              helperText={
                errors.password && "Password must be at least 5 characters"
              }
              //   autoFocus
            />
          </Box>
          <Box sx={{ marginTop: "2rem" }}>
            <label htmlFor="upload-file">
              <AddPhotoAlternateIcon sx={{}}> </AddPhotoAlternateIcon>
              <Typography variant="overline">Profile Pic</Typography>
            </label>
          </Box>

          <Input
            {...register("profile_pic")}
            accept="image/*"
            type="file"
            id="upload-file"
            sx={{ display: "none" }}
          ></Input>
          {err && <Typography variant="overline">{err}</Typography>}
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "inherit",
            }}
          >
            <Button
              sx={{
                width: "100%",
                backgroundColor: "#FEEFEC",
                margin: "26px 0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F56A4D",
                },
              }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
            <Button
              sx={{
                width: "100%",
                marginBottom: "10px",
                "&:hover": {
                  backgroundColor: "#F56A4D",
                },
                backgroundColor: "#FEEFEC",
                color: "black",
              }}
              type="submit"
              className="login-with-google-btn"
              // onClick={registerUserWithGoogle}
              id="login-google-btn"
              variant="contained"
            >
              Or with Google{" "}
              <GoogleIcon sx={{ marginLeft: "10px" }}></GoogleIcon>
            </Button>
          </Box>
        </form>
        <Typography
          variant="overline"
          sx={{ textAlign: "center", margin: "10px 0", fontSize: "11px" }}
        >
          Already a user?{" "}
          <Typography
            component={"span"}
            variant="overline"
            sx={{
              borderBottom: "1px solid black",
              fontStyle: "bold",
              "&:hover": {
                color: "#F56A4D",
              },
              cursor: "pointer",
            }}
          >
            {" "}
            <Link to={"/login"}>Login</Link>
          </Typography>
        </Typography>
      </CustumBox>
    </Container>
  );
}

export default Register;
