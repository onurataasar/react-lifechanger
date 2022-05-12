import React, { Component } from "react";
import Navbar from './Navbar'
import { Button } from '@mui/material';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { UserAuth } from "../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import MoodSharpIcon from '@mui/icons-material/MoodSharp';
import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import CircularSlider from '@fseehawer/react-circular-slider';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default function Profile() {

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
                    width: 700,
                    height: 80, p: 2, border: '2px solid grey',
                    boxShadow: 8, borderRadius: 2
                }}></Box>


                <p></p>
            </div >
        </div >
    );
}
