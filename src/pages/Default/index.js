import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typist from "react-typist";
import logo from "../../assets/remove.png";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

import ReactLoading from "react-loading";

const DefaultPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        color: "#F7F7F7",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",

        background: "#141E30",
        background: "-webkit-linear-gradient(to right, #243B55, #141E30)",
        background: "linear-gradient(to right, #243B55, #141E30)",
      }}
    >
      <Grid
        container
        sx={{
          width: "90%",
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "2rem",
              fontFamily: "Bebas Neue, Roboto",
              color: "#F7F7F7",
            }}
          >
            Devs Channel
          </Typography>
        </Grid>
      </Grid>
      {load && (
        <Box
          sx={{
            marginTop: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type={"cylon"}
            color={"darkGray"}
            height={"40px"}
            width={"70px"}
          />
        </Box>
      )}
      {!load && (
        <>
          <Box
            sx={{
              marginTop: "5rem",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                width: "200px",
                height: "70px",
              }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  width: "200px",
                  height: "70px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="button"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
                fontFamily: "Bebas Neue, Roboto",
                letterSpacing: "3px",
              }}
            >
              Greetings!! Dev
            </Typography>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "60%",
                },
                fontSize: {
                  xs: "16px",
                  sm: "16px",
                  md: "1.5rem",
                },
                height: "100px",
              }}
            >
              <TypeAnimation
                sequence={[
                  "Chat with the Chad Developers.", // Types 'One'
                  1000, // Waits 1s
                  "Exchange knowledge and experience.",
                  2000,
                  "Get inspired and be inspired.",
                  3000,
                  "Chat and share ideas.",
                  () => {
                    // console.log("Done typing!"); // Place optional callbacks anywhere in the array
                  },
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "Courier Prime, monospace",
                }}
              />
            </Box>
          </Box>

          <Grid
            spacing={2}
            container
            // justifyContent={"center"}
            // alignItems={"center"}

            sx={{
              padding: {
                xs: "0",
                sm: "0",
                md: " 0 32rem",
              },
            }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "#272a37",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "#414555",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <Box
        sx={{
          marginTop: "auto",
        }}
      >
        <Typography variant="body1" fontSize={"12px"}>
          @Devs-Channel, 2023 - By Mafiz
        </Typography>
      </Box>
    </Box>
  );
};

export default DefaultPage;
