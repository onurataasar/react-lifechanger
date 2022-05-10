import firebase from "firebase/compat/app";
import { getAuth } from "firebase/compat/auth";
import 'firebase/compat/database';
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOPsf95eb-Chpmhr3wVfiPumJfU3dZqHs",
    authDomain: "react-lifechanger.firebaseapp.com",
    databaseURL: "https://react-lifechanger-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-lifechanger",
    storageBucket: "react-lifechanger.appspot.com",
    messagingSenderId: "61749568321",
    appId: "1:61749568321:web:cc4de8a3f7136de724f7c0"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const gprovider = new firebase.auth.GoogleAuthProvider();
gprovider.setCustomParameters({ prompt: 'select_account' });


export const auth = firebase.auth();
export { db, gprovider };
export default firebase;