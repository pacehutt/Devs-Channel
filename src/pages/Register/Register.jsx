import "./Register.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import loader from "../../assets/greenLoader.gif";
import { Typography } from "@mui/material";
import defaultImage from "../../assets/a.png";
import Tick from "@mui/icons-material/FileDownloadDone";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useInView, useSpring, animated } from "@react-spring/web";

import ReactLoading from "react-loading";

function Register() {
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const [image, setImage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);
  const registerUserWithGoogle = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithGoogle();
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName, result.user.email, "user");

        obSubmitGoogle(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const obSubmitGoogle = async (googleData) => {
    await updateProfile(googleData, {
      displayName: googleData.displayName.split(" ")[0],
      photoURL: googleData.photoURL,
    });

    await setDoc(doc(db, "users", googleData.uid), {
      uid: googleData.uid,
      displayName: googleData.displayName.split(" ")[0],
      email: googleData.email,
      pfpUrl: googleData.photoURL,
    });

    await setDoc(doc(db, "userChats", googleData.uid), {});

    navigate("/");
  };

  const handleImage = (e) => {
    setImage(true);
    console.log(e.target.files[0], "file");
  };

  const onSubmit = async (data) => {
    let username = data.username;
    let password = data.password;
    let email = data.email;
    let file = data.pfp ? data.pfp[0] : null;
    if (file === undefined) {
      file = new File([defaultImage], "default.png", { type: "image/png" });
    }

    setLoading(true);

    try {
      // const isValidEmail = await fetch(`https://emailvalidation.abstractapi.com/v1/
      // ?=${process.env.ABSTRACT_KEY}
      // &email=${email}`);
      // const isValidEmailJson = await isValidEmail.json();
      // if (!isValidEmailJson.deliverability === "DELIVERABLE") {

      //   setErr("Please enter a valid email");
      //   setLoading(false);
      //   throw new Error("Please enter a valid email");

      // }
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `pfps/${username}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
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

          navigate("/");
        });
      });
    } catch (err) {
      setErr(err.message);
      setLoading(false);
    }
  };
  const styles = useSpring({
    scale: show ? 1 : 0,
    config: {
      mass: 2,
      tension: 150,
      friction: 40,
    },
  });
  return (
    <div className="register">
      <animated.div style={styles} className="card">
        <div className="left">
          <h1>Connect with Devs...</h1>
          <p>
            Join the vibrant community of developers on Devs Channel and take
            your coding journey to the next level. Chat with The Chad Developers
            out there and be one of Chads.
          </p>
          <span>Already a member?</span>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <Typography
            sx={{
              fontSize: "15px",
              letterSpacing: "3px",
              fontFamily: "Bebas Neue, sans-serif",
              position: "relative",
              top: "20px",
            }}
          >
            Welcome to Devs Channel !
          </Typography>
          <h2>Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            {errors.username && (
              <p
                className="error"
                style={{
                  fontSize: "10px",
                }}
              >
                4-10 characters only
              </p>
            )}
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              {...register("email", { required: true, minLength: 4 })}
            />
            {(errors.email || err) && (
              <p
                className="error"
                style={{
                  fontSize: "10px",
                }}
              >
                invalid email
              </p>
            )}

            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              {...register("password", { required: true, minLength: 5 })}
            />
            {errors.password && (
              <p
                className="error"
                style={{
                  fontSize: "10px",
                }}
              >
                password must be 5 chars
              </p>
            )}
            <label htmlFor="pfp">
              {!image && (
                <AddPhotoAlternateIcon
                  sx={{
                    color: "#555",
                  }}
                />
              )}
              {image && (
                <Tick
                  sx={{
                    color: "green",
                  }}
                />
              )}
              {!image && "Select an Avatar"}
              {image && "Selected"}
            </label>
            <input
              type="file"
              name="pfp"
              id="pfp"
              onChangeCapture={handleImage}
              {...register("pfp")}
              accept="image/*"
              {...register("pfp", { required: true })}
            />
            {(errors.email || err) && (
              <p
                className="error"
                style={{
                  fontSize: "10px",
                }}
              >
                please select a profile pic
              </p>
            )}

            {loading ? (
              <ReactLoading
                type={"bubbles"}
                color={"gray"}
                height={"20%"}
                width={"20%"}
              />
            ) : (
              <button>Register</button>
            )}
          </form>

          <button className="google" onClick={registerUserWithGoogle}>
            Google <GoogleIcon sx={{ height: "16px" }}></GoogleIcon>
          </button>
        </div>
      </animated.div>
    </div>
  );
}

export default Register;
