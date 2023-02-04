import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const currentUser = useContext(AuthContext);
  return (
    <>
      <div className="navbar">
        <span className="logo">Dev's Channel</span>
        <div className="user" onClick={() => setOpen((prev) => !prev)}>
          <span className="name">{currentUser.displayName}</span>
          <img
            src={
              currentUser?.photoURL ||
              "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            }
            alt=""
          />
        </div>
      </div>
      {open && (
        <div className="nav-options">
          <ul>
            <li>
              <HomeIcon fontSize="14px"></HomeIcon>Home
            </li>
            <li>
              <AccountBoxIcon fontSize="14px" />
              Profile
            </li>
            <li onClick={() => signOut(auth)}>
              {" "}
              <ExitToAppIcon fontSize="14px" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
