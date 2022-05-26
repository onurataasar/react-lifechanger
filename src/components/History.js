import React, { Component } from "react";
import Navbar from './Navbar'
import { Button, Typography } from '@mui/material';
import { getDatabase, ref, child, get, push, onValue } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { UserAuth } from "../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import ProfileImageBox from 'react-profile-image-box';
import { useState } from "react";
import StickyFooter from "./StickyFooter";
import { useNavigate } from 'react-router';
import { auth, db } from "../firebaseConfig";
import { confirm } from "react-confirm-box";
import NavItem from "rsuite/esm/Nav/NavItem";



export default function History() {


    const dbRef = ref(getDatabase());
    /*     const [name, setName] = useState("");
        const [surname, setsName] = useState("");
        const [dob, setDob] = useState(); 

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid
            console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
            get(child(dbRef, `users/${uid}/name`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setName(snapshot.val());
                    console.log(snapshot.val());

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            get(child(dbRef, `users/${uid}/surname`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setsName(snapshot.val());
                    console.log(snapshot.val());

                } else {
                    console.log("No data available");
                }
            })

            get(child(dbRef, `users/${uid}/dob`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setDob(snapshot.val());
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
        }
    });*/
    const email = firebase.auth().currentUser.email

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    const navigate = useNavigate();



    return (

        <div className="dashboard" >
            <Navbar />
            <br></br>
            <div className="question">
                <br></br>
                <Box display='table' sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "table",
                    width: 400,
                    height: 500, p: 2,
                    boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                    bgcolor: "#FCFCFC"

                }}>

                    <div className="profile-image" >
                        <input
                            type="button" name="emotion"
                            id="profile-photo" class="input-hidden"
                            value="user-image"
                        />
                        <label htmlFor="photo-upload">
                            <img style={{ width: "33%", borderRadius: "50%" }}
                                src="https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-user-web-flaticons-flat-flat-icons-2.png"
                                alt="Profile Photo"
                                /* onChange={(e) => setPp(e.target.value)} */ />
                        </label>

                    </div>
                    <p></p>

                </Box>


                <p></p>
            </div >
            <StickyFooter></StickyFooter>
        </div >
    );
}