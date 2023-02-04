import "./Register.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import loader from '../../assets/greenLoader.gif'

function Register() {
  const [err, setErr] = useState("");
  
  const [loading, setLoading] = useState(false);

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
    let file = data.pfp ? data.pfp[0] : null;
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

           navigate("/");
        });
      });
    } catch (err) {
      setErr(err.message);
      setLoading(false);
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
          <Link to={'/login'}>
                      <button>Login</button>
                      </Link>
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
            {errors.username && <p  className="error">must be 4 chars</p>}
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              {...register("email", { required: true, minLength: 4 })}
            />
               {(errors.email || err) && <p  className="error">invalid email</p>}
              
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              {...register("password", { required: true, minLength: 5 })}
            />
              {errors.password && <p className="error">password must be 5 chars</p>}
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

{                 loading ? <img src={loader} alt="" className="loader" />:
                              <button>Register</button>

                            }
          
          </form>

          <button className="google">Google <GoogleIcon sx={{height:"16px"}}></GoogleIcon></button>
        </div>
      </div>
    </div>
  );
}

export default Register;
