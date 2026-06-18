import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

window.login = function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {

            localStorage.setItem("loggedIn", "true");

            alert("Login successful!");

            window.location.href = "Ts&Cs.html";
        })
        .catch((error) => {
            alert("Incorrect email or password");
        });
};