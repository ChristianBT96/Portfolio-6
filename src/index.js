import {initializeApp} from "firebase/app";
import {collection, setDoc, doc, getFirestore, query, where, getDocs } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQhW9ZGoQNsEOYsXK6MolkRgzupxOgL8E",
    authDomain: "world-of-pictures.firebaseapp.com",
    projectId: "world-of-pictures",
    storageBucket: "world-of-pictures.appspot.com",
    messagingSenderId: "497847256484",
    appId: "1:497847256484:web:d4e29809a90966303ead31"
};

// const express = require('express');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// -------------------------------------------------- CODE BEGINNING
const picturesRef = collection(db, "pictures");

let q = query(picturesRef);
let product = await getDocs(q);
product.forEach(item => {
    console.log(item.data())
})
const albumsRef = collection(db, "albums");
// ------------------------------------------------- ACCESS JS LIBARIES

// app.post("/testDB", (req, res) => {
//
//     let setDoc =
//         db.collection('testCollection').doc('testDoc').set(req.body);
//
//     res.send({'Message': 'Success'});
//
// });