import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyByP9j3KRfs5BxbrfO5mQzR9PJQUp4Qjho",
    authDomain: "keys-of-africa.firebaseapp.com",
    projectId: "keys-of-africa",
    storageBucket: "keys-of-africa.firebasestorage.app",
    messagingSenderId: "295412124500",
    appId: "1:295412124500:web:db00efdbe5319869b416c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 