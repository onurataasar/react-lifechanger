import React, { Component, useEffect } from "react";
import Navbar from './Navbar'
import { getDatabase, ref, child, get, push, onValue } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import Stack from '@mui/material/Stack';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import { useState } from "react";
import Skeleton from '@mui/material/Skeleton';

import StickyFooter from "./StickyFooter";
import { useNavigate } from 'react-router';
import { Select, FormControl, InputLabel, MenuItem, FormHelperText, TextField, Fab, Button } from "@mui/material";
import { Search, SearchRounded } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { parseDailyData, _parseDailyData } from "../utils/date-formatter";



export default function History() {


    var today = new Date();;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;

    const submitDate = () => {

        const change_date = {
            "ch_date": ch_date
        }
    }

    const dbRef = ref(getDatabase());



    const [loading, setLoading] = useState({ initial: true, today: true, goals: true, searchDate: true });
    const [date, setDate] = useState(" ");
    const [ch_date, setCh_date] = useState(new Date());
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
    const [goal_water, setGoal_water] = useState("");
    const [goal_steps, setGoal_steps] = useState("");
    const [goal_sleep, setGoal_sleep] = useState("");
    const [goal_work, setGoal_work] = useState("");


    useEffect(() => {
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

                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    }).finally(() => setLoading(prev => ({ ...prev, today: false })));
                firebase.database().ref('users').child(uid).child('initial').get()
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setInitial_water(snapshot.val().water);
                            setInitial_steps(snapshot.val().steps);
                            setInitial_sleep(snapshot.val().sleep);
                            setInitial_work(snapshot.val().work);

                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    }).finally(() => setLoading(prev => ({ ...prev, initial: false })));

                firebase.database().ref('users').child(uid).child("date").child(parseDailyData(Number(ch_date))).get()
                    .then((snapshot) => {

                        if (!ch_date || snapshot.val() == null) {
                            setDate("No Data Available")
                            setDate_mood("No Data Available")
                            setDate_sleep("No Data Available")
                            setDate_water("No Data Available")
                            setDate_steps("No Data Available")
                            setDate_work("No Data Available")
                        } else {

                            setDate(snapshot.key)
                            setDate_mood(snapshot.val().daily_mood)
                            setDate_sleep(snapshot.val().daily_sleep)
                            setDate_water(snapshot.val().daily_water)
                            setDate_steps(snapshot.val().daily_steps)
                            setDate_work(snapshot.val().daily_work)
                        }
                    }).catch((error) => {
                        console.error(error);
                    }).finally(() => setLoading(prev => ({ ...prev, searchDate: false })));


                firebase.database().ref('users').child(uid).child("goals").get()
                    .then((snapshot) => {

                        if (snapshot.val() == null) {
                            setGoal_sleep("Haven't set yet")
                            setGoal_water("Haven't set yet")
                            setGoal_steps("Haven't set yet")
                            setGoal_work("Haven't set yet")
                        } else {
                            setGoal_sleep(snapshot.val().sleep + " hours")
                            setGoal_water(snapshot.val().water + " litres")
                            setGoal_steps(snapshot.val().steps + " steps")
                            setGoal_work(snapshot.val().work + " hours")

                        }


                    }).catch((error) => {
                        console.error(error);
                    }).finally(() => setLoading(prev => ({ ...prev, goals: false })));

            }

        });
    }, [])



    const _shouldRenderLoading = loading.goal || loading.initial || loading.searchDate || loading.today

    return (
        <>
            <div className="history" >
                <Navbar />
                <br></br>
                <div className="history-boxes">
                    <br></br>
                    <Stack spacing={6} display="flex" direction="row">
                        <Box display='table' sx={{
                            width: 400,
                            height: 500, p: 2,
                            boxShadow: "1px 1px 1px 0.5px ", borderRadius: 2,
                            bgcolor: "#FCFCFC"

                        }}> <div style={{ textAlign: "center" }}>
                                <h2 >Search Date</h2>
                                <hr></hr>
                                <FormControl sx={{ m: 1, minWidth: 350 }}>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                                        <DatePicker
                                            inputFormat="dd-MM-yyyy"
                                            label="Choose Date"
                                            value={ch_date}
                                            onChange={(newValue) => {
                                                setCh_date(newValue)
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>

                                <img
                                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/face-without-mouth_1f636.png"
                                    alt="Mood"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Mood: {date_mood} </h5>

                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/21036/water.svg"
                                    alt="Water"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Water: {date_water} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/43206/bed.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Sleep: {date_sleep} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/251868/hiker-walk.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Steps: {date_steps} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/213533/studying-work.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Work Hours: {date_work} </h5>
                            </div>
                        </Box>
                        <Box display='table' sx={{
                            width: 400,
                            height: 500, p: 2,
                            boxShadow: "1px 1px 1px 0.5px ", borderRadius: 2,
                            bgcolor: "#FCFCFC"

                        }}> <div style={{ textAlign: "center" }}>
                                <h2>Today</h2>
                                <hr></hr>
                                <img
                                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/face-without-mouth_1f636.png"
                                    alt="Mood"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Mood: {today_mood} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/21036/water.svg"
                                    alt="Water"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Water: {today_water} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/43206/bed.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Sleep: {today_sleep} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/251868/hiker-walk.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Steps: {today_steps} </h5>
                                <p></p>
                                <hr></hr>
                                <img
                                    src="https://www.svgrepo.com/show/213533/studying-work.svg"
                                    alt="Sleep"
                                    width="50"
                                    height="50" />
                                <p></p>
                                <h5>Work Hours: {today_work} </h5>
                            </div>
                        </Box>
                        {_shouldRenderLoading && <Skeleton variant="rectangular" width={210} height={118} />
                        }
                        {!_shouldRenderLoading &&

                            <Stack spacing={4} display="flex" direction="column">

                                <Box display='table' sx={{
                                    width: 400,
                                    height: 300, p: 2,
                                    boxShadow: "1px 1px 1px 0.5px ", borderRadius: 2,
                                    bgcolor: "#FCFCFC"

                                }}>
                                    <div style={{ textAlign: "center" }}>
                                        <h2>Initial</h2>
                                        <hr></hr>

                                        <h6>Before you start using LifeChanger, you were...</h6>
                                        <p></p>
                                        Drinking water between {initial_water} litres
                                        <p></p>
                                        Getting sleep between {initial_sleep} hours
                                        <p></p>
                                        Taking steps between {initial_steps}
                                        <p></p>
                                        Working between {initial_work} hours
                                        <p></p>
                                    </div>

                                </Box>
                                <Box display='table' sx={{
                                    width: 400,
                                    height: 300, p: 2,
                                    boxShadow: "1px 1px 1px 0.5px ", borderRadius: 2,
                                    bgcolor: "#FCFCFC"

                                }}>
                                    <div style={{ textAlign: "center" }}>
                                        <h2>Goals</h2>
                                        <hr></hr>

                                        <h6>The goals you have setted are... </h6>
                                        <p></p>
                                        Water goal: {goal_water}
                                        <p></p>
                                        Sleep goal: {goal_sleep}
                                        <p></p>
                                        Steps goal: {goal_steps}
                                        <p></p>
                                        Work goal: {goal_work}
                                        <p></p>
                                    </div>
                                </Box>
                            </Stack>
                        }

                    </Stack>

                </div >

                <StickyFooter></StickyFooter>
            </div >



        </>
    );
}