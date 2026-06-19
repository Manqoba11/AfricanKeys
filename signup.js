 
import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const form = document.getElementById("signupForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    const email =
    document.getElementById("email").value;

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then(() => {

        alert("Account created successfully!");

        window.location.href = "login.html";

    })
    .catch((error) => {

        alert(error.message);

    });

});