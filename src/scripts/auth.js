// Function imports for firebase auth and firebase firestore
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, onSnapshot, setDoc, doc, getDoc, updateDoc, orderBy , limit, query  } from "firebase/firestore";
import { app } from "../firebase/client";

// const UserDetails = document.querySelector(".user");
const ErrorSignin = document.querySelector("#errorSi");
const ErrorLogin = document.querySelector("#errorLo");
const Game = document.querySelector("#game");
const Form = document.querySelector("#form");
const Store = document.getElementById("store");
const CLicker = document.querySelector("#clicker");
const Card = document.querySelectorAll(".card");
const Score = document.querySelector("#score");
const Save = document.querySelector("#save");
const ApplyBtn = document.querySelectorAll(".applyBtn");
const NotLoggedinBtns = document.querySelectorAll(".notloggedin");
const LoggedinBtns = document.querySelectorAll(".loggedin");

// Initialise firebase firestore database
const db = getFirestore(app);

// Initialise firebase Auth 
const auth = getAuth(app);

// Check if user is logged in or not
auth.onAuthStateChanged( (user) => {
    if(user) {
        console.log("Firebase Auth 🔑")
        console.log("User Logged In", user)

        LoggedinBtns.forEach( btn => {
            btn.style.display = "block"
        })
        NotLoggedinBtns.forEach( btn => {
            btn.style.display = "none"
        })

        Game.style.display = "flex"
        Store.style.display = "grid"
        Form.style.display = "none"

        const docRef = doc(db, "User", user.uid)
        onSnapshot(docRef, (snapshot) => {

            Score.innerHTML = `Clicks: ${snapshot.data().Score}`
            let Clicks = snapshot.data().Score 
            
            function checkSave() {
                if ( CLicker.dataset.name !== snapshot.data().Button || Clicks !== snapshot.data().Score )  {
                       Save.style.display = "block"
                }
                else {
                    console.log("All up to date mi amigo")
                    Save.style.display = "none"
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
                if (Current !== "clickr") {
                    CLicker.classList.replace( "clickr" , snapshot.data().Button)
                    console.log("Loaded Custom Button")
                    CLicker.dataset.name = snapshot.data().Button;
                }
                else {
                    Current = "clickr"
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

            async function save(){
                try{
                    updateDoc(docRef, {
                        Score: Clicks,
                        Button: CLicker.dataset.name
                    })
                    console.log("Saved New score: ", Clicks)
                }
                catch(err) {
                    console.log(err)
                }
            }
            
            Save.addEventListener("click", () => {
                save()
            })
        })

    }
    else {
        NotLoggedinBtns.forEach( btn => {
            btn.style.display = "block"
        })
        LoggedinBtns.forEach( btn => {
            btn.style.display = "none"
        })
        Form.style.display = "flex"
        Form.style.pointerEvents = "all"
         Game.style.display = "none"
         Store.style.display = "none"
    }
})

// Firebase auth signup function
async function signup() {
       try {
         // steal user information, respectfully
         const userName = signupForm['signup-firebase-name'].value;
         const region = signupForm['signup-firebase-region'].value;
         const email = signupForm['signup-firebase-email'].value;
         const password = signupForm['signup-firebase-password'].value;

         //Create user with preset fields in document
         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, "User", userCredential.user.uid) , {
            Button: CLicker.dataset.name ,
            Name: userName ,
            Region: region ,
            Email: email ,
            Score: 0 
        });
    
        signupForm.classList.remove("show")
        signupForm.reset();
    }
        
    catch(err) {
        ErrorSignin.style.display = "block"
        ErrorSignin.innerHTML = `<p>${err.message}</p>`
    }
}

// Firebase auth signin event istener
const signupForm = document.querySelector("#signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup()
})

// Firebase auth login function
async function login() {
    try {
        const email = loginForm['login-firebase-email'].value;
        const password = loginForm['login-firebase-password'].value;
    
        await signInWithEmailAndPassword(auth, email, password)  
        loginForm.classList.remove("show")
        loginForm.reset();            
    }
    catch(err){
        ErrorLogin.style.display = "block"
        ErrorLogin.innerHTML = `<p>${err.message}</p>`
    }
} 

// Firebase auth login event listener
const loginForm = document.querySelector("#login")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login()
})

// Firebase auth signout
const logOutBtn = document.querySelector("#logout");    
logOutBtn.addEventListener("click",(e) => {
    e.preventDefault();
    auth.signOut()
})
