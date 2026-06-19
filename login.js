
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if(user){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

    }

});

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {

    localStorage.setItem("loggedIn", "true");

    localStorage.setItem(
        "userEmail",
        userCredential.user.email
    );

    alert("Login successful!");

    window.location.href = "Ts&Cs.html";

})