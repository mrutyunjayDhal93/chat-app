import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import ChatContextProvider from "./Context/ChatContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChatContextProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
