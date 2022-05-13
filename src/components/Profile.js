import React, { Component } from "react";
import Navbar from './Navbar'
import { Button, Typography } from '@mui/material';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { UserAuth } from "../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import ProfileImageBox from 'react-profile-image-box';
import { useState } from "react";




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
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    });


    return (

        <div className="dashboard" >
            <Navbar />
            <div className="question">
                <p></p>
                <Box display='table' sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "table",
                    width: 800,
                    height: 600, p: 2, border: '2px solid grey',
                    boxShadow: 8, borderRadius: 2
                }}>

                    <div className="profile-image">
                        <ProfileImageBox
                            alt="Alt Text"
                            allowUpload={true}
                            /* onFileChange={(e) => this.onFileChange(e, { type: 'user-image' })} */
                            src="https://pbs.twimg.com/profile_images/1521973541918412802/HwwZiLkL_400x400.jpg" />

                    </div>
                    <p></p>
                    <Typography variant="h4">
                        Name:
                    </Typography>
                </Box>


                <p></p>
            </div >
        </div >
    );
}
