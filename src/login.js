import {auth} from './firestore.js';

import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginBtn = document.querySelector("#login-button");
const logIn = async () => {
    const emailValue = loginEmail.value;
    const passwordValue = loginPassword.value;

    await signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // window.userUID = user.uid;
            location.replace("index.html");

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
};
loginBtn.addEventListener("click", logIn);
