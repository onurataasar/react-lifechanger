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



export default function Profile() {
    /*     state = {
            src: "http://test.com/avatar_images_by_user/72"
        } */

    /*     function onFileChange(e, additionalParams) {
            console.log(e.target.files);
            console.log(additionalParams);
            this.setState({ src: "http://arranzed2.com/avatar_images_by_user/70" });
        } */

    const dbRef = ref(getDatabase());

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid
            console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
            get(child(dbRef, `users/${uid}/name`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const name = snapshot.val();
                    console.log(name);
                    document.getElementById("pn").innerHTML = name;

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            get(child(dbRef, `users/${uid}/surname`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const surname = snapshot.val();
                    console.log(surname);
                    document.getElementById("ps").innerHTML = surname;

                } else {
                    console.log("No data available");
                }
            })

            get(child(dbRef, `users/${uid}/dob`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const dob = snapshot.val();
                    console.log(dob);
                    var currentTime = new Date();
                    var year = currentTime.getFullYear();
                    document.getElementById("pa").innerHTML = "Age: " + (year - dob);

                } else {
                    console.log("No data available");
                }
            })
        }
    });

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {

            var user = auth.currentUser;
            var database_ref = db.ref();
            user.delete();
            //deleting the user to users database with firebase ref
            database_ref.child('users/' + user.uid).remove()
            navigate('/welcome')
            console.log("You deleted.")
        } catch (e) {
            console.log(e.message)
        }
        localStorage.clear();
    }


    return (

        <div className="dashboard" >
            <Navbar />
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

                    <div className="profile-image">
                        <img style={{ width: "20%", borderRadius: "50%" }}
                            alt="Alt Text"
                            allowUpload={true}
                            /* onFileChange={(e) => this.onFileChange(e, { type: 'user-image' })} */
                            src="https://pbs.twimg.com/profile_images/1521973541918412802/HwwZiLkL_400x400.jpg" />

                    </div>
                    <p></p>
                    <Typography id="pn" variant="h4" style={{ marginTop: "8%" }}>


                    </Typography>
                    <Typography id="ps" variant="h5"></Typography>
                    <hr></hr>

                    <Typography id="pe" variant="h5">
                        Email: {firebase.auth().currentUser.email}

                    </Typography>
                    <p></p>
                    <Typography id="pa" variant="h5">
                    </Typography>
                    <br></br>
                    <p></p>
                    <Button onClick={handleDelete} className="button-delete" variant="contained" color="error">Delete Account</Button>
                </Box>


                <p></p>
            </div >
            <StickyFooter></StickyFooter>
        </div >
    );
}