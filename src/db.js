import {db} from './firestore.js';

import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";

const picturesRef = collection(db, "pictures");

const albumsRef = collection(db, "albums");

const usersRef = collection(db, "users");

const recentPictures = document.querySelector('#recent-pictures');

export async function createUserInDB (uid, firstName, lastName, signupEmail) {
    await setDoc(doc(usersRef), {
        first_name: firstName,
        last_name: lastName,
        email: signupEmail,
        uid: uid
        })
        .then((docRef) => {
            console.log("Document written");
        })
        .catch((error) => {
            console.log(error);
        });
}


async function retrievePictures (collectionRef) {
    try
    {
        let countryData = [];
        const q = query(collectionRef);
        // const q = query(collectionRef, where("user_id", "==", userUID));
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
        if (window.location.href.includes('index.html')) {
            renderGeoJSON(countryData);
        }
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
