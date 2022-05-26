import React, { useState } from "react";
import Navbar from './Navbar'
import { Button } from '@mui/material';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import { UserAuth } from "../context/AuthContext";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import CircularSlider from '@fseehawer/react-circular-slider';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import ProfileImageBox from "react-profile-image-box";
import StickyFooter from "./StickyFooter";
import { auth, db } from "../firebaseConfig";
import { RadioGroup } from "@mui/material";
import { Navigate, useNavigate } from "react-router";

export default function Dashboard() {

    const dbRef = ref(getDatabase());

    //function to check is the user is authorized for the page in console log 

    if (auth.currentUser) {
        let uid = firebase.auth().currentUser.uid;
        console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
        //with snapshot we can see the user's name from the database
        get(child(dbRef, `users/${uid}/name`)).then((snapshot) => {

            if (snapshot.exists()) {
                var name = snapshot.val()
                console.log(name);
                document.getElementById("wel-back").innerHTML = "Welcome back " + name + ". How do you feel today?";
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const [daily_water, setdWater] = useState();
    const [daily_sleep, setdSleep] = useState();
    const [daily_steps, setdSteps] = useState();
    const [daily_work, setdWork] = useState();
    const [daily_mood, setdMood] = useState("");
    const [e, setError] = useState('');
    const [an, setA] = useState("");

    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;



    const setDaily = async (e) => {

        setError('')
        try {
            var user = auth.currentUser;
            //Add user to firebase db
            var database_ref = db.ref();

            //Create user data
            var daily_data = {
                daily_water: daily_water,
                daily_sleep: daily_sleep,
                daily_steps: daily_steps,
                daily_work: daily_work,
                daily_mood: daily_mood,

            }



            database_ref.child('users/' + user.uid).child(today).set(daily_data);
            alert("Day updated.")
            this.render();

        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }


    if (auth.currentUser) {
        var id = firebase.auth().currentUser.uid;
        firebase.database().ref('users').child(id).child(today).child("daily_mood").get()
            .then((snapshot) => {
                setA(snapshot.val());
            });
    }

    function clickButton() {
        setDaily();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    console.log(an)
    //Graph chart for mood
    const data = [
        { day: 1, mood: an },
        { day: 2, mood: an },
        { day: 3, mood: an },
        { day: 4, mood: an },
        { day: 5, mood: an }
    ];

    return (

        <div className="dashboard" >
            <Navbar /> {/* the navbar component we exported in navbar.js */}
            <form>
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
                        <h3 id="wel-back">  </h3>

                        <p></p>
                        <hr></hr>
                        <div className="mood"  >
                            {/* The user will be choosen a mood daily with icon buttons */}
                            <Stack direction="row" spacing={1} display="flex">
                                <RadioGroup
                                    row
                                    name="radio-buttons-group"
                                    id="daily-mood"
                                >
                                    <input
                                        type="radio" name="emotion"
                                        id="very-happy" class="input-hidden"
                                        value="very happy"
                                        onChange={(e) => setdMood(e.target.value)} />
                                    <label for="very-happy">
                                        <img
                                            src="https://openmoji.org/data/color/svg/1F60D.svg"
                                            alt="I'm sad" />
                                    </label>

                                    <input
                                        type="radio" name="emotion"
                                        id="happy" class="input-hidden"
                                        value="happy"
                                        onChange={(e) => setdMood(e.target.value)} />
                                    <label for="happy">
                                        <img
                                            src="https://openmoji.org/data/color/svg/263A.svg"
                                            alt="I'm happy" />
                                    </label>
                                    <input
                                        type="radio" name="emotion"
                                        id="neutral" class="input-hidden"
                                        value="neutral"
                                        onChange={(e) => setdMood(e.target.value)} />
                                    <label for="neutral">
                                        <img
                                            src="https://openmoji.org/data/color/svg/1F610.svg"
                                            alt="I'm happy" />
                                    </label>
                                    <input
                                        type="radio" name="emotion"
                                        id="bad" class="input-hidden"
                                        value="bad"
                                        onChange={(e) => setdMood(e.target.value)} />
                                    <label for="bad">
                                        <img
                                            src="https://openmoji.org/data/color/svg/1F625.svg"
                                            alt="I'm happy" />
                                    </label>
                                    <input
                                        type="radio" name="emotion"
                                        id="very-bad" class="input-hidden"
                                        value="very bad"
                                        onChange={(e) => setdMood(e.target.value)} />
                                    <label for="very-bad">
                                        <img
                                            src="https://openmoji.org/data/color/svg/1F628.svg"
                                            alt="I'm happy" />
                                    </label>
                                </RadioGroup>
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
                            tickFormat={["Today", "Yesterday", "3 days ago", "4 days ago", "5 days ago"]}
                        />
                        <VictoryAxis
                            dependentAxis
                            // tickFormat specifies how ticks should be displayed
                            tickValues={["very bad", "bad", "neutral", "happy", "very happy"]}
                            tickFormat={["very bad", "bad", "neutral", "happy", "very happy"]}
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
                                    id="daily_water"
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
                                    onChange={value => setdWater(value)}

                                ></CircularSlider>
                            </div>
                            <div className="sleepslider">
                                <CircularSlider
                                    id="daily_sleep"
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
                                    onChange={value => setdSleep(value)}
                                />
                            </div>
                        </Stack>
                    </div>
                    <div className="sliders">
                        <Stack spacing={6} display="flex" direction="row">
                            <div className="stepslider">
                                <CircularSlider
                                    id="daily_steps"
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
                                    value={1}
                                    onChange={value => setdSteps(value)}
                                />
                            </div>
                            <div className="workslider">
                                <CircularSlider
                                    id="daily_work"
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
                                    value={1}
                                    onChange={value => setdWork(value)}
                                />
                            </div>
                        </Stack>
                    </div>
                    <Button onClick={() => clickButton()} variant="contained" style={{ background: '#e5155c' }} className="button-daily"> Submit Progress </Button>

                </Stack><br></br>
            </form>
            <StickyFooter></StickyFooter>
        </div >
    );
}
