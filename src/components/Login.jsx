import './Login.scss'
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
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword} from "@firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";

function Login() {
  const [err, setErr] = useState("");
  const navigate= useNavigate();

    const themeColor = "#F56A4D";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


  const onSubmit = async (data) => {
  
    try{
      console.log(data)
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate("/");
  }
  catch(error){
      console.log(error);
      setErr(error.message);
  }

  
  }
  return (
    <div className='login'>

          <div className="card">
            <div className="left">
                      <h1>Hello Devs</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis earum tempora quis illo saepe accusamus similique molestiae, magni placeat soluta?</p>
                      <span>Don't have an account?</span>
                      <button>Register</button>
            </div>
            <div className="right">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <input type="text" placeholder='Email' name='email'   {...register("email", { required: true, minLength: 4 })}/>
                            <input type="password" name='password' id="" placeholder='Password'   {...register("username", { required: true, minLength: 4 })}/>
                            <button>Login</button>
                        </form>
            </div>
          </div>

    </div>
  )
}

export default Login    