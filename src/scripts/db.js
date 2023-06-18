console.log("Firebase Firestore 🔥")

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/client";

const db = getFirestore(app);
const colrRef = collection(db, "Tips")

getDocs(colrRef).then(snapshot => {
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
    console.log(data)
})





