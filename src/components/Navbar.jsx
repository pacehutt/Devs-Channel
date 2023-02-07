import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import { animated, useSpring } from "@react-spring/web";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 0 : 24,
    shadow: open ? 24 : 0,
  });

  const currentUser = useContext(AuthContext);
  return (
    <>
      <div className="navbar">
        <span className="logo">Devs Channel</span>
        <div className="user" onClick={() => setOpen((prev) => !prev)}>
          <span className="name">{currentUser.displayName}</span>
          <img
            src={
              currentUser?.photoURL ||
              "https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-user-line-icon-profile-avatar-sign-person-silhouette-symbol-geometric-shapes-random-cross-elements-l.jpg"
            }
            alt=""
          />
        </div>
      </div>
      {open && (
        <animated.div style={styles} className="nav-options">
          <ul>
            <li>
              <HomeIcon fontSize="14px"></HomeIcon>
              <Link
                to={"/"}
                style={{
                  width: "100%",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <AccountBoxIcon fontSize="14px" />
              <Link
                to={"/profile"}
                style={{
                  width: "100%",
                }}
              >
                My Profile
              </Link>
            </li>
            <li onClick={() => signOut(auth)}>
              {" "}
              <ExitToAppIcon fontSize="14px" />
              Logout
            </li>
          </ul>
        </animated.div>
      )}
    </>
  );
};

export default Navbar;
