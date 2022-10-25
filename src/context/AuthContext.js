import { createContext } from "react";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {

    const unsubsribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);

      return ()=> unsubsribe();
    });
  }, []);

  return(

      <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
};
