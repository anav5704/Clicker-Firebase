// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, getDocs,onSnapshot  } from "firebase/firestore";
import { app } from "../firebase/client";

// Initialise firebase firestore database
const db = getFirestore(app);

// Funtion to take data and inject into html template
const populate = (snapshot) => {
    let data = []
    let html = ''
    snapshot.docs.forEach( (doc) => {
        data.push({ ...doc.data(), id: doc.id})
        html += `
        <div class="p-5 rounded-md shadow-xl col-span-1">
        <h1 class="text-xl font-bold">${doc.data().Title}</h1>
        <p>${doc.data().Content}</p>
        </div>
        `
    })
    const card = document.querySelector(".main")
    card.innerHTML = html;
    console.log("Firebase Firestore 🔥")
}

// Initialise firebase Auth 
const auth = getAuth(app);

// Check if user is logged in or not
auth.onAuthStateChanged( (user) => {
    if(user) {
        console.log("Firebase Auth 🔑")
        console.log("User Logged In", user)
        
        const colrRef = collection(db, "Tips")

        onSnapshot(colrRef, (snapshot) => {
            populate(snapshot)
            console.log(snapshot.docs)
        })
    }
    else {
         document.querySelector(".main").innerHTML = `
         <div class="p-5 text-center rounded-md shadow-xl col-span-3">
         <h1 class="text-xl font-semibold">Log In to see data</h1>
         </div>
         `
    }
})

// Firebase auth signup
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

        signupForm.classList.remove("show")
        signupForm.reset();

    })
})

// Firebase auth sigin
const loginForm = document.querySelector("#login")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm['login-firebase-email'].value;
    const password = loginForm['login-firebase-password'].value;
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {            
        
        loginForm.classList.remove("show")
        loginForm.reset();
        
    })
})

// Firebase auth signout
const logOutBtn = document.querySelector("#logout");    
logOutBtn.addEventListener("click",(e) => {
    console.log("Firebase Auth 🔑")
    console.log("User Logged Out")
    e.preventDefault();
    auth.signOut()
})