import Home from "./pages/Home";
// import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
// import Register from "./pages/Register";
import { useState, useEffect } from "react";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { auth, storage, db } from "./firebase";

import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Box } from "@mui/material";

function App() {
  const currentUser = useContext(AuthContext);
  console.log(1, currentUser, 2);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    else return children;
  };

  const [Image, setImage] = useState(null);
  const uploadImage = () => {
    if (Image) {
      const imageRef = ref(storage, `images/${Image.name}`);

      uploadBytes(imageRef, Image).then((snapshot) => {
        console.log("Uploaded");
      });
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <div className="home">
                    <Box
                      className="container"
                      sx={{
                        borderRadius: "15px",

                        height: "90%",
                        display: "flex",
                        overflow: "hidden",
                        width: {
                          xs: "90%",
                          sm: "80%",
                          md: "40%",
                        },
                        margin: {
                          xs: "0px",
                          sm: "0px",
                          md: "20rem",
                        },
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                    >
                      <Sidebar></Sidebar>
                      {/* <Chat></Chat> */}
                    </Box>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              index
              element={
                <ProtectedRoute>
                  <div className="home">
                    <Box
                      className="container"
                      sx={{
                        borderRadius: "15px",

                        height: "90%",
                        display: "flex",
                        overflow: "hidden",
                        width: {
                          xs: "90%",
                          sm: "80%",
                          md: "40%",
                        },
                        margin: {
                          xs: "0px",
                          sm: "0px",
                          md: "20rem",
                        },
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                    >
                      <Chat></Chat>
                      {/* <Chat></Chat> */}
                    </Box>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="upload">
         <input type="file" onChange={(event)=>setImage(event.target.files[0])}/>
         <button onClick={uploadImage}>Upload Image</button>
       </div> */}
    </div>
  );
}

export default App;
