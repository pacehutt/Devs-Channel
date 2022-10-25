import "./Register.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate =useNavigate();
  const onSubmit = async (data) => {
    let username = data.username;
    let password = data.password;
    let email = data.email;
    let file = data.pfp ? data.pfp[0] : null;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `pfps/${username}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL, "it is downloadURL");
          await updateProfile(res.user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: username,
            email,
            pfpUrl: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});

          //  navigate("/");
        });
      });
    } catch (err) {
      setErr(err.message);
    }

    console.log(data);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Connect to Devs...</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            earum tempora quis illo saepe accusamus similique molestiae, magni
            placeat soluta?
          </p>
          <span>Already a member?</span>
          <button>Login</button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              {...register("username", { required: true, minLength: 4 })}
            />
            {errors.username && <p>username must be at least 4 characters</p>}
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              {...register("email", { required: true, minLength: 4 })}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              {...register("password", { required: true, minLength: 5 })}
            />
            <label htmlFor="pfp">
              <AddPhotoAlternateIcon
                sx={{
                  color: "#555",
                }}
              />
              Select an Avatar
            </label>
            <input
              type="file"
              name="pfp"
              id="pfp"
              {...register("pfp")}
              accept="image/*"
            />

            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
