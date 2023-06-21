// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, onSnapshot, setDoc, doc, getDoc, updateDoc, orderBy , limit, query  } from "firebase/firestore";
import { app } from "../firebase/client";

const UserDetails = document.querySelector(".user");
const Main = document.querySelector(".main");
const Game = document.querySelector("#game");
const Store = document.getElementById("store");
const CLicker = document.querySelector("#clicker");
const Card = document.querySelectorAll(".card");
const Score = document.querySelector("#score");
const Save = document.querySelector("#save");
const ApplyBtn = document.querySelectorAll(".applyBtn");

// Initialise firebase firestore database
const db = getFirestore(app);

// Initialise firebase Auth 
const auth = getAuth(app);


const colRef = query(collection(db, "User"), orderBy("Score", "desc"), limit(2));
onSnapshot(colRef ,(snapshot) => {
    let rank = 1
    snapshot.docs.forEach((user) => {
        console.log(`Rank: ${rank}`, `Name: ${user.data().Name}`, `Score: ${user.data().Score}`)
        rank ++;
    })
})


// Check if user is logged in or not
auth.onAuthStateChanged( (user) => {
    if(user) {
        console.log("Firebase Auth 🔑")
        console.log("User Logged In", user)

        Game.style.display = "block"
        Store.style.display = "grid"
        Main.innerHTML = ""

        const docRef = doc(db, "User", user.uid)

        onSnapshot(docRef, (snapshot) => {
            UserDetails.innerHTML = `
            <div class="p-5 rounded-md shadow-xl border">
            <h1 class="text-xl font-semibold">Account details</h1>
            <p>Name: ${snapshot.data().Name}</p>
            <p>Region: ${snapshot.data().Region}</p>
            </iv>
            `
            Score.innerHTML = `Score: ${snapshot.data().Score}`

            let Clicks = snapshot.data().Score 

            function checkSave() {
                if ( CLicker.dataset.name !== snapshot.data().Button || Clicks !== snapshot.data().Score )  {
                       Save.style.color = "teal"
                }
                else {
                    console.log("All up to date mi amigo")
                    Save.style.color = "black"

                }
            }
                 
            
            CLicker.addEventListener("click", () => {
                Clicks ++;
                checkCards()
                checkSave()
                Score.innerHTML = `Score: ${Clicks}`
            })

            function checkCards() {
                Card.forEach( (card) => {
                    if( card.dataset.price > Clicks) {
                        card.style.opacity = "0.5"
                        card.style.pointerEvents = "none"
                    }
                    else {
                        card.style.opacity = ""
                        card.style.pointerEvents = ""
                    }
                })
            }

            checkCards()

            let Current = snapshot.data().Button;
            
            function checkButton () {
                if (Current !== "gameBtn") {
                    CLicker.classList.replace( "gameBtn" , snapshot.data().Button)
                    console.log("Loaded Custom Button")
                    CLicker.dataset.name = snapshot.data().Button;
                }
                else {
                    Current = "gameBtn"
                    console.log("Loaded Deftault button")
                }
            }

            checkButton()
            
            ApplyBtn.forEach(button => {
                button.addEventListener("click", () => {
                    if(Clicks >= button.dataset.price){
                        CLicker.classList.replace( CLicker.dataset.name , button.dataset.name)
                        Current = button.dataset.name;
                        CLicker.dataset.name = button.dataset.name;
                        checkSave()
                    }
                    else {
                        console.log("Not enough clicks")
                    }
                })
            });
            
            Save.addEventListener("click", () => {
                updateDoc(docRef, {
                    Score: Clicks,
                    Button: CLicker.dataset.name
                  }).then( () => {
                    console.log("Saved New score: ", Clicks)
                  })
                  
            })
        })

    }
    else {
         document.querySelector(".main").innerHTML = `
         <div class="p-5 text-center rounded-md shadow-xl col-span-3">
         <h1 class="text-xl font-semibold">Log In To Start Clicking!</h1>
         </div>
         `
         UserDetails.innerHTML = ""
         Game.style.display = "none"
         Store.style.display = "none"
    }
})

// Firebase auth signup
const signupForm = document.querySelector("#signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // steal user information, respectfully
    const userName = signupForm['signup-firebase-name'].value;
    const region = signupForm['signup-firebase-region'].value;
    const email = signupForm['signup-firebase-email'].value;
    const password = signupForm['signup-firebase-password'].value;
    console.log(email, password)
    
    // create user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        setDoc(doc(db, "User", userCredential.user.uid) , {
            Button: CLicker.dataset.name ,
            Name: userName ,
            Region: region ,
            Email: email ,
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

window.addEventListener('beforeunload', function (e) {
    e.preventDefault(); 
    e.returnValue = '';
  });