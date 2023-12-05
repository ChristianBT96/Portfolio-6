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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// -------------------------------------------------- CODE BEGINNING
const picturesRef = collection(db, "pictures");

const albumsRef = collection(db, "albums");

const recentPictures = document.querySelector('#recent-pictures');

async function retrievePictures (collectionRef) {
    try
    {
        let countryData = [];
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log(doc.data());
            const img = document.createElement('img');
            img.src = doc.data().img_path;
            recentPictures.appendChild(img);

            if (countryData.some(x => x.name === doc.data().country)) {
                countryData.forEach(object => {
                    if (object.name === doc.data().country) {
                        object.count++;
                    }
                });
            }
            else {
                countryData.push({
                    "name": doc.data().country,
                    "count": 1
                })
            }
        });
        console.log(countryData)
        renderGeoJSON(countryData);
    }
    catch(err)
    {console.log(err)}
}
retrievePictures(picturesRef);
// const firebase_delete_data = async (category, response, product_name) => {
//     try
//     {
//         await db.collection(category).doc(product_name).delete()
//     }
//     catch(err)
//     {console.log(err)}
// }
// const firebase_update_data = async (category, response, reqbody) => {
//     try
//     {
//         await db.collection(category).doc(reqbody["productName"]).update({"Price": parseFloat(reqbody["price"]), "Quantity": parseFloat(reqbody["quantity"]), "ExpiryDate": reqbody["expiryDate"]})
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }
