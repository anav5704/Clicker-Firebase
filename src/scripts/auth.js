// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, onSnapshot, setDoc, doc, getDoc, updateDoc  } from "firebase/firestore";
import { app } from "../firebase/client";


const UserDetails = document.querySelector(".user");
const Main = document.querySelector(".main");
const Game = document.querySelector("#game");
const CLicker = document.querySelector("#clicker");
const Score = document.querySelector("#score");
const Save = document.querySelector("#save");
const ApplyBtn = document.querySelectorAll(".applyBtn");

// Initialise firebase firestore database
const db = getFirestore(app);

// Initialise firebase Auth 
const auth = getAuth(app);

// Check if user is logged in or not
auth.onAuthStateChanged( (user) => {
    if(user) {
        console.log("Firebase Auth 🔑")
        console.log("User Logged In", user)

        Game.style.display = "block"
        Main.innerHTML = ""
        UserDetails.innerHTML = `
        <div class="p-5 rounded-md shadow-xl border">
        <h1 class="text-xl font-semibold">Account details</h1>
        <p>Email: ${user.email}</p>
        </iv>
        `
        const docRef = doc(db, "Score", user.uid)

        onSnapshot(docRef, (snapshot) => {
            Score.innerHTML = `Score: ${snapshot.data().Score}`

            let Clicks = snapshot.data().Score 
            CLicker.addEventListener("click", () => {
                Clicks ++;
                Score.innerHTML = `Score: ${Clicks}`
            })

            ApplyBtn.forEach(button => {
                button.addEventListener("click", () => {
                    if(Clicks >= button.dataset.price){
                        CLicker.classList.replace( CLicker.dataset.name , button.dataset.name)
                        CLicker.dataset.name = button.dataset.name;
                    }
                    else {
                        console.log("Not enough clicks")
                    }
                })
            });
            
            Save.addEventListener("click", () => {
                updateDoc(docRef, {
                    Score: Clicks
                  }).then( () => {
                    console.log("Saved New score: ", Clicks)
                  })
                  
            })
        })

    }
    else {
         document.querySelector(".main").innerHTML = `
         <div class="p-5 text-center rounded-md shadow-xl col-span-3">
         <h1 class="text-xl font-semibold">Log In to see data</h1>
         </div>
         `
         UserDetails.innerHTML = ""
         Game.style.display = "none"
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

        setDoc(doc(db, "Score", userCredential.user.uid) , {
            Score: 0
        });

    }).then( () => {
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