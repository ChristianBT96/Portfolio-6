import {auth} from './firestore.js';
import {createUserInDB} from './db.js';

import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

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
            window.userUID = user.uid;
            location.replace("index.html");

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
};
loginBtn.addEventListener("click", logIn);

const toggleSignUpSection = () => {
    const signUpSection = document.querySelector('#signup-section');
    const loginSection = document.querySelector('#login-section')
    if (signUpSection.classList.contains('hidden')) {
        signUpSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
    }
    else {
        signUpSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    }
    
}
const showSignUp = document.querySelector('#create-account');
showSignUp.addEventListener('click', toggleSignUpSection)
const showLogin = document.querySelector('#already-have-account');
showLogin.addEventListener('click', toggleSignUpSection)



const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const signupEmail = document.querySelector("#signup-email");

const signupPassword = document.querySelector("#signup-password");
const signupPasswordCheck = document.querySelector("#signup-password-check");

const signupBtn = document.querySelector("#signup-button");



const createAccount = () => {

    if (signupPassword.value !== signupPasswordCheck.value) {
        alert('Passwords do not match');
        return;
    }

    const emailValue = signupEmail.value;
    const passwordValue = signupPassword.value;

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            createUserInDB(user.uid, firstName.value, lastName.value, signupEmail.value);
            window.userUID = user.uid;

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
}

signupBtn.addEventListener("click", createAccount);