import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ChatContextProvider>
);
