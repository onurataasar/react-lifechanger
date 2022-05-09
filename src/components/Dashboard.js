import React, { Component } from "react";
import Navbar from './Navbar'
import { Button } from '@mui/material';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { getAuth } from "@firebase/auth";

export default function Dashboard() {

    const dbRef = ref(getDatabase());
    if (firebase.auth().currentUser != null) {
        var uid = firebase.auth().currentUser.uid
        console.log(uid);
    }
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        } var name = snapshot.val();
    }).catch((error) => {
        console.error(error);
    });

    return (

        <div className="dashboard" >
            <Navbar />
            <div className="question">

                <h1>Welcome </h1>

            </div>
        </div >
    );
}
