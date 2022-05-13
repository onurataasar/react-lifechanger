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
import ProfileImageBox from "react-profile-image-box";
import StickyFooter from "./StickyFooter";

export default function Dashboard() {

    const dbRef = ref(getDatabase());

    //function to check is the user is authorized for the page in console log 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid
            console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
            //with snapshot we can see the user's name from the database
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

    //Graph chart for mood
    const data = [
        { day: 1, mood: "happy" },
        { day: 2, mood: "neutral" },
        { day: 3, mood: "very happy" },
        { day: 4, mood: "bad" },
        { day: 5, mood: "happy" }
    ];

    return (

        <div className="dashboard" >
            <Navbar /> {/* the navbar component we exported in navbar.js */}

            <div className="question">
                <p></p>
                {/* I have used a lot of MUI's box component to enhance the UI */}
                <Box display='table' sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "table",
                    width: 700,
                    height: 80, p: 2, border: '2px solid grey',
                    boxShadow: 8, borderRadius: 2
                }}> {/* Profile Image component allows user to update the photo 
                but it is preferred to use in user profile page */}
                    <h3> <ProfileImageBox
                        alt="profile photo"
                        allowUpload={false}
                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" /> Welcome back, how do you feel today? </h3>

                    <p></p>
                    <div className="mood"  >
                        {/* The user will be choosen a mood daily with icon buttons */}
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
            <div className="chart">
                <VictoryChart domainPadding={{ x: 50, y: 40 }} width="650" height="350" theme={VictoryTheme.material}>
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed

                        tickFormat={["bad", "very bad", "neutral", "happy", "very happy"]}
                    />
                    <VictoryBar
                        style={{ data: { fill: "#e5155c" } }}
                        data={data}
                        // data accessor for x values
                        x="day"
                        // data accessor for y values
                        y="mood"
                    />
                </VictoryChart>
            </div>
            <br></br> <hr></hr> <br></br>
            <Stack spacing={6} display="flex">
                <div className="sliders">
                    <Stack spacing={6} display="flex" direction="row">
                        <div className="waterslider">
                            <CircularSlider
                                label="Water"
                                labelColor="#005a58"
                                knobColor="#e5155c"
                                progressColorFrom="#e5155c"
                                progressColorTo="#e5155c"
                                progressSize={8}
                                max={3}
                                trackColor="#eeeeee"
                                trackSize={3}
                                data={["0 L", "1 L", "2 L", "3 L"]} //...
                                dataIndex={0}
                            />
                        </div>
                        <div className="sleepslider">
                            <CircularSlider
                                label="Sleep"
                                labelColor="#005a58"
                                knobColor="#e5155c"
                                progressColorFrom="#e5155c"
                                progressColorTo="#e5155c"
                                progressSize={8}
                                max={12}
                                trackColor="#eeeeee"
                                trackSize={3}
                                data={["0 hours", "1 hours", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10 hours", "11 hours", "12 hours"]} //...
                                dataIndex={0}
                            />
                        </div>
                    </Stack>
                </div>
                <div className="sliders">
                    <Stack spacing={6} display="flex" direction="row">
                        <div className="stepslider">
                            <CircularSlider
                                label="Steps"
                                labelColor="#005a58"
                                knobColor="#e5155c"
                                progressColorFrom="#e5155c"
                                progressColorTo="#e5155c"
                                progressSize={8}
                                max={10000}
                                trackColor="#eeeeee"
                                trackSize={3}
                                dataIndex={0}
                            />
                        </div>
                        <div className="workslider">
                            <CircularSlider
                                label="Hours of Work"
                                labelColor="#005a58"
                                knobColor="#e5155c"
                                progressColorFrom="#e5155c"
                                progressColorTo="#e5155c"
                                progressSize={8}
                                max={12}
                                trackColor="#eeeeee"
                                trackSize={3}
                                data={["0 hours", "1 hours", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10 hours", "11 hours", "12 hours"]} //...
                                dataIndex={0}
                            />
                        </div>
                    </Stack>
                </div>
                <Button variant="contained" style={{ background: '#e5155c' }} className="button-daily"> Submit Progress </Button>
            </Stack><br></br>
            <StickyFooter></StickyFooter>
        </div >
    );
}
