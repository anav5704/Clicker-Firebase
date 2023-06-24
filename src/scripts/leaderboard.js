// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, onSnapshot, setDoc, doc, getDoc, updateDoc, orderBy , limit, query  } from "firebase/firestore";
import { app } from "../firebase/client";

const Leaderboard = document.querySelector("#leaderboard");
const Nav = document.querySelector("#nav");
Nav.style.display = "none"
// Initialise firebase firestore database
const db = getFirestore(app);

// Initialise firebase Auth 
const auth = getAuth(app);

// Check if user is logged in or not`
auth.onAuthStateChanged( (user) => {
    if(user) {
        const colRef = query(collection(db, "User"), orderBy("Score", "desc"));
        onSnapshot(colRef ,(snapshot) => {
            Leaderboard.innerHTML = " "
            let rank = 1
            snapshot.docs.forEach((user) => {
                Leaderboard.innerHTML += `<p><span class="rank">${rank}</span><span class="region">${user.data().Region}</span><span class="name">${user.data().Name}</span><span class="score"> ${user.data().Score} Clicks</span>
            </p>`
                rank ++;
            })
        })

    }
    else {
        console.log("Login to see leaderboards")
    }
})
