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
import { Box, textAlign } from "@mui/system";
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

        <div className="history" >
            <Navbar />
            <br></br>
            <div className="history-boxes">
                <br></br>
                <Stack spacing={6} display="flex" direction="row">
                    <Box display='table' sx={{
                        width: 400,
                        height: 500, p: 2,
                        boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                        bgcolor: "#FCFCFC"

                    }}>
                        <h4 style={{ textAlign: "center" }}>Choose Date</h4>
                        <hr></hr>
                    </Box>
                    <Box display='table' sx={{
                        width: 400,
                        height: 500, p: 2,
                        boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                        bgcolor: "#FCFCFC"

                    }}>
                        <h4 style={{ textAlign: "center" }}>Today</h4>
                        <hr></hr>
                    </Box>
                    <Box display='table' sx={{
                        width: 400,
                        height: 500, p: 2,
                        boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                        bgcolor: "#FCFCFC"

                    }}>
                        <h4 style={{ textAlign: "center" }}>Initial</h4>
                        <hr></hr>
                    </Box>
                </Stack>

            </div >

            <StickyFooter></StickyFooter>
        </div >
    );
}