import React, { Component } from "react";
import Navbar from './Navbar'
import { Button, Typography } from '@mui/material';
import { getDatabase, ref, child, get, push, onValue } from "firebase/database";
import firebase from "@firebase/app-compat";
import 'firebase/compat/database';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/system";
import { useState } from "react";
import StickyFooter from "./StickyFooter";
import { useNavigate } from 'react-router';
import { auth, db } from "../firebaseConfig";
import NavItem from "rsuite/esm/Nav/NavItem";
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { toast, ToastContainer } from "react-toastify";

export default function Goals() {

    const PrettoSlider = styled(Slider)({
        color: 'red',
        height: 12,
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: 'red',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });


    const dbRef = ref(getDatabase());
    const [error, setError] = useState();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)

        }
    });

    const [sliderValue, setSliderValue] = useState({
        water: "",
        sleep: "",
        steps: "",
        work: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSliderValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const { water, sleep, steps, work } = sliderValue;

    const updateGoals = async (e) => {

        setError('')
        try {
            var user = auth.currentUser;
            //Add user to firebase db
            var database_ref = db.ref().child('users/' + user.uid + '/goals');

            //Create user data
            var goals_data = {
                water: water,
                sleep: sleep,
                steps: steps,
                work: work,

            }
            //we use update instead of set here
            if (database_ref == null) {
                database_ref.set(goals_data);
                toast.success('Goals added', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                database_ref.update(goals_data);
                toast.success('Goals updated', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }

    console.log(water, sleep)


    return (

        <div className="dashboard" >
            <Navbar />
            <br></br>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="question">
                <br></br>
                <Box display='table' sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "table",
                    width: 450,
                    height: 500, p: 2,
                    boxShadow: "1px 1px 1px 1px ", borderRadius: 2,
                    bgcolor: "#FCFCFC"

                }}>  <img src="https://www.svgrepo.com/show/256071/goal.svg" className="goalimage"></img>
                    <p></p>
                    <h3>You can set your goals with sliders!</h3>
                    <hr></hr>
                    <p></p>
                    <Box sx={{ m: 3 }} />
                    <Typography gutterBottom>Water</Typography>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={0}
                        max={6}
                        name="water"
                        value={water}
                        onChange={handleChange}

                    />
                    <Box sx={{ m: 3 }} />
                    <Typography gutterBottom>Sleep</Typography>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={0}
                        max={12}
                        name="sleep"
                        onChange={handleChange}
                        value={sleep}
                    />
                    <Box sx={{ m: 3 }} />
                    <Typography gutterBottom>Steps</Typography>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={0}
                        max={50000}
                        name="steps"
                        step={1000}
                        onChange={handleChange}
                        value={steps}
                    />
                    <Box sx={{ m: 3 }} />
                    <Typography gutterBottom>Work</Typography>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={0}
                        max={12}
                        name="work"
                        onChange={handleChange}
                        value={work}
                    />
                    <p></p>
                    <Button onClick={updateGoals} style={{ backgroundColor: "#e52b50", width: "100%", height: "80px", marginTop: "10%" }} variant="contained" color="success">Update Goals</Button>
                </Box>
            </div >
            <StickyFooter></StickyFooter>
        </div >
    );
}