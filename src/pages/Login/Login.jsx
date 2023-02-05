import "./Login.scss";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import ReactLoading from "react-loading";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import loader from "../../assets/pinkLoader.gif";
function Login() {
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const themeColor = "#F56A4D";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginWithGoogle = (e) => {
    e.preventDefault();

    setLoading(true);
    signInWithGoogle();
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName, result.user.email, "user");
        navigate("/");
        // onSubmit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // console.log(data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Greetings Dev</h1>
          <p>
            Welcome back to Devs Channel, the hub for developers. Connect with
            fellow coders, share your knowledge, and expand your network.
          </p>
          <span>Don't have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>

        <div className="right">
          <Typography
            sx={{
              fontSize: "15px",
              letterSpacing: "3px",
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Welcome Back Chad !
          </Typography>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              {...register("email", { required: true, minLength: 4 })}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              {...register("password", { required: true, minLength: 4 })}
            />
            {(errors.email || errors.password || err) && (
              <p className="error">Invalid Credentials</p>
            )}
            {loading ? (
              <ReactLoading
                type={"bubbles"}
                color={"gray"}
                height={"20%"}
                width={"20%"}
              />
            ) : (
              <button>Login</button>
            )}
          </form>
          <button
            className="google"
            disabled={loading === true}
            onClick={loginWithGoogle}
          >
            Google <GoogleIcon sx={{ height: "16px" }}></GoogleIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
