import React from "react";
import ReactDOM from "react-dom";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
