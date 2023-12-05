import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firestore";

async function monitorAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            window.userUID = user.uid;
            console.log('user is signed in')
            // ...
        } else {
            // User is signed out
            window.userUID = '';
            console.log('user is signed out')
            window.location.replace('./login.html');
            // ...
        }
    });
}
const logOut = async () => {
    await auth.signOut().then(() => {
        window.location.replace('./login.html');
    }).catch((error) => {
        console.log(error);
    });
};

if (!window.location.href.includes('login.html')) {
    monitorAuthState();
    const logOutLink = document.querySelector("#logout");
    logOutLink.addEventListener("click", logOut);
}



