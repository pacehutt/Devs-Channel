import React,{useState, useEffect} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { Grid } from "@mui/material";
import {useForm} from 'react-hook-form'
import GoogleIcon from '@mui/icons-material/Google';

function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const themeColor="#F56A4D"

  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const onSubmit=(data)=> {
    console.log(data)
    }
  const CustumBox= styled(Box)`
  
    alignItems: "center",
    display: "flex",
    height: "400px",
    width: "500px",
    justifyContent: "center",
  `;

 

  

  return (
    <Container sx={{
        
    alignItems: "center",
    display: "flex",
    height: "100vh",
    width: "500px",
    justifyContent: "center",
    }}>
      <CustumBox key={"custom1"}>
        <Typography variant="h4" my={3} color={"#F56A4D"}>Devs Channel</Typography>
        <Typography variant="h6">Log in</Typography>

        <form onSubmit={handleSubmit(onSubmit)} sx={{width:"inherit"}} >

       
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin:"19px 0" }}>
        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField key={"user"} id="input-with-sx" label="Username" variant="standard" 
        
        {...register("username", {required: true, minLength: 4})}
        errors={errors.username}
        helperText={errors.username && "Username must be at least 4 characters"}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField  key={"pwd"} id="input-with-sx" label="Password" variant="standard" 
        {...register("password", {required: true, minLength: 5})}
        errors={errors.password}
        helperText={errors.password && "Password must be at least 5 characters"}
        
        />
      </Box>
        
      <Box sx={{alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "inherit"}}>
    <Button sx={{width:"230px",backgroundColor:"#FEEFEC",margin:"26px 0",color:"black","&:hover":{
        backgroundColor:"#F56A4D",
    }}} type="submit" variant="contained">Login</Button>
    <Button
                sx={{width:"230px",marginBottom:"10px","&:hover":{
            backgroundColor:"#F56A4D"},backgroundColor:"#FEEFEC",color:"black"}} 
                type="submit"
                className="login-with-google-btn"
                // onClick={registerUserWithGoogle}
                id="login-google-btn"
                variant="contained"
                >
              Login with Google <GoogleIcon sx={{marginLeft:"10px",}}></GoogleIcon>
              </Button>

                  </Box> 

        </form>
            <Typography  variant="overline"  sx={{ margin:"10px 0",  fontSize: "11px",
}}>Don't have an account? <Typography component={"span"} variant="overline" sx={{borderBottom:"1px solid black",fontStyle:"bold","&:hover":{
    color:"#F56A4D"},cursor:
    "pointer"}}>Register</Typography></Typography>
      </CustumBox>

    </Container>
  );
}

export default Login;
