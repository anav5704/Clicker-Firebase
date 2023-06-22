// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, onSnapshot, setDoc, doc, getDoc, updateDoc, orderBy , limit, query  } from "firebase/firestore";
import { app } from "../firebase/client";

const Leaderboard = document.querySelector("#leaderboard");

// Initialise firebase firestore database
const db = getFirestore(app);

// Initialise firebase Auth 
const auth = getAuth(app);


const colRef = query(collection(db, "User"), orderBy("Score", "desc"), limit(10));
onSnapshot(colRef ,(snapshot) => {
    let rank = 1
    snapshot.docs.forEach((user) => {
        Leaderboard.innerHTML += `<p><span class="rank">${rank}</span><span class="region">${user.data().Region}</span><span class="name">${user.data().Name}</span><span class="score"> ${user.data().Score} Clicks</span>
       </p>`
          rank ++;
    })
})


// Check if user is logged in or not
auth.onAuthStateChanged( (user) => {
    if(user) {
        console.log("Firebase Auth 🔑")
        console.log("User Logged In", user)
    }
    else {

    }
})
