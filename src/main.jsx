import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyA7mKqfzYJLipxwIFxbUYu_xd9XuiBO03M",
    authDomain: "ecommerce-react-24.firebaseapp.com",
    projectId: "ecommerce-react-24",
    storageBucket: "ecommerce-react-24.appspot.com",
    messagingSenderId: "17010943910",
    appId: "1:17010943910:web:f827b57547278b8b8d9167"
  };

  initializeApp(firebaseConfig);
  export const auth = getAuth()

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
