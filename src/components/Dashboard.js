import React, { Component } from "react";
import Navbar from './Navbar'
import { Button } from '@mui/material';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { UserAuth } from "../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import MoodSharpIcon from '@mui/icons-material/MoodSharp';
import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';

export default function Dashboard() {

    const dbRef = ref(getDatabase());

    firebase.auth().onAuthStateChanged(function (user) {

        var uid = firebase.auth().currentUser.uid
        console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
        get(child(dbRef, `users/${uid}/name`)).then((snapshot) => {
            var name = snapshot.val();
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    });

    return (

        <div className="dashboard" >
            <Navbar />
            <div className="question">
                <p></p>
                <Box display='flex' sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "table",
                    width: 700,
                    height: 80, p: 2, border: '2px solid grey',
                    boxShadow: 8, borderRadius: 2
                }}>
                    <h3>Welcome back , how do you feel today?</h3>

                    <p></p>
                    <div className="mood"  >
                        <Stack direction="row" spacing={1} display="flex">
                            <IconButton aria-label="very good" color="success">
                                <SentimentVerySatisfiedSharpIcon />
                            </IconButton>
                            <IconButton aria-label="good" color="info">
                                <MoodSharpIcon />
                            </IconButton>
                            <IconButton color="warning" aria-label="neutral">
                                <SentimentSatisfiedSharpIcon />
                            </IconButton>
                            <IconButton color="error" aria-label="bad">
                                <SentimentDissatisfiedSharpIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="very bad">
                                <SentimentVeryDissatisfiedSharpIcon />
                            </IconButton>
                        </Stack>

                    </div>
                </Box>
            </div>
        </div >
    );
}
