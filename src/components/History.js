import React, { Component } from "react";
import Navbar from './Navbar'
import { getDatabase, ref, child, get, push, onValue } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import { useState } from "react";
import StickyFooter from "./StickyFooter";
import { useNavigate } from 'react-router';
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from "@mui/material";


export default function History() {


    var today = new Date();;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);

    const dbRef = ref(getDatabase());

    const [date, setDate] = useState([]);
    const [ch_date, setCh_date] = useState("");
    const [date_mood, setDate_mood] = useState("");
    const [date_water, setDate_water] = useState("");
    const [date_steps, setDate_steps] = useState("");
    const [date_sleep, setDate_sleep] = useState("");
    const [date_work, setDate_work] = useState("");
    const [today_mood, setToday_mood] = useState("");
    const [today_water, setToday_water] = useState("");
    const [today_steps, setToday_steps] = useState("");
    const [today_sleep, setToday_sleep] = useState("");
    const [today_work, setToday_work] = useState("");
    const [initial_work, setInitial_work] = useState("");
    const [initial_water, setInitial_water] = useState("");
    const [initial_steps, setInitial_steps] = useState("");
    const [initial_sleep, setInitial_sleep] = useState("");
    var keys = [];
    const chooseDate = (event) => {
        setCh_date(event.target.value);
    };
    console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid

            firebase.database().ref('users').child(uid).child("date").child(today).get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setToday_mood(snapshot.val().daily_mood);
                        setToday_water(snapshot.val().daily_water);
                        setToday_steps(snapshot.val().daily_steps);
                        setToday_sleep(snapshot.val().daily_sleep);
                        setToday_work(snapshot.val().daily_work);
                        console.log(snapshot.val());

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            firebase.database().ref('users').child(uid).get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setInitial_water(snapshot.val().water);
                        setInitial_steps(snapshot.val().steps);
                        setInitial_sleep(snapshot.val().sleep);
                        setInitial_work(snapshot.val().work);
                        console.log(snapshot.val());

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            firebase.database().ref('users').child(uid).child("date").get()
                .then((snapshot) => {

                    /* console.log(snapshot.exportVal()); */
                    for (var i = 0; i < snapshot.numChildren(); i++) {
                        keys.push(Object.keys(snapshot.val())[i]);

                    }
                    return keys;

                }).catch((error) => {
                    console.error(error);
                });

        }
    });


    console.log(keys);
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
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <Select
                                value={ch_date}
                                onChange={chooseDate}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Date' }}
                            >
                                <MenuItem value={"keys"}>
                                </MenuItem>
                            </Select>
                            <FormHelperText>Date</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box display='table' sx={{
                        width: 400,
                        height: 500, p: 2,
                        boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                        bgcolor: "#FCFCFC"

                    }}> <div style={{ textAlign: "center" }}>
                            <h4>Today</h4>
                            <hr></hr>
                            Daily Mood: {today_mood}
                            <p></p>
                            Water: {today_water}
                            <p></p>
                            Sleep: {today_sleep}
                            <p></p>
                            Steps: {today_steps}
                            <p></p>
                            Work Hours: {today_work}
                        </div>
                    </Box>
                    <Box display='table' sx={{
                        width: 400,
                        height: 500, p: 2,
                        boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                        bgcolor: "#FCFCFC"

                    }}>
                        <div style={{ textAlign: "center" }}>
                            <h4>Initial</h4>
                            <hr></hr>

                            <h6>Before you start using LifeChanger, you were...</h6>
                            <p></p>
                            Drinking water {initial_water} than 3 litres
                            <p></p>
                            Getting sleep {initial_sleep} 5 - 8 hours
                            <p></p>
                            Taking steps {initial_steps} more than 10.000
                            <p></p>
                            Working {initial_work} than 8 hours
                            <p></p>
                        </div>

                    </Box>
                </Stack>

            </div >

            <StickyFooter></StickyFooter>
        </div >
    );
}