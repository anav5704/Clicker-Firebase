console.log("Firebase Auth 🤓")

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../firebase/client";

const auth = getAuth(app);

const signupForm = document.querySelector("#signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // steal user information, respectfully
    const email = signupForm['signup-firebase-email'].value;
    const password = signupForm['signup-firebase-password'].value;
    console.log(email, password)
    
    // create user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User Account Created")
        console.log(user)

        signupForm.classList.remove("show")
        signupForm.reset();

    })
})

    const logOutBtn = document.querySelector("#logout");
    
logOutBtn.addEventListener("click",(e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("User Signed Out")
    })
})

const loginForm = document.querySelector("#login")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm['login-firebase-email'].value;
    const password = loginForm['login-firebase-password'].value;
    console.log(email, password)

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {            
        const user = userCredential.user;
        console.log("User Logged In")
        console.log(user)

        loginForm.classList.remove("show")
        loginForm.reset();

    })
})