import React from 'react'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import firebase from "@firebase/app-compat";
import { auth, db, provider } from "../firebaseConfig";
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';



//styled item for MUI's Paper component

const Item = styled(Paper)(({ theme }) => ({
    fontVariant: "small-caps",
    backgroundColor: 'rgba(252, 202, 202, 0.925)',
    padding: theme.spacing(2),
    textAlign: 'center',
    elevation: 3,
    width: "100%",
    marginBlock: "2%",
    alignSelf: "center"
}));

export default function Quiz() {

    //defining necessary data values for the hook
    const [dob, setDob] = useState()
    const [water, setWater] = useState('');
    const [sleep, setSleep] = useState('');
    const [steps, setSteps] = useState('');
    const [work, setWork] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    //the function will update the user database after creating the user in registration 
    const updateQuiz = async (e) => {

        setError('')
        try {
            var user = auth.currentUser;
            //Add user to firebase db
            var database_ref = db.ref();

            //Create user data
            var quiz_data = {
                dob: dob,
                water: water,
                sleep: sleep,
                steps: steps,
                work: work,
            }
            //we use update instead of set here
            database_ref.child('users/' + user.uid).update(quiz_data);

            navigate('/dashboard')

        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }
    console.log(dob);
    return (
        <div className='quiz'>

            <Stack spacing={2}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.705)', width: '80%', border: '1px grey', alignSelf: "center" }}>

                    <div className="question">

                        <hr></hr>
                        <h2>Welcome to the first steps on LifeChanger!</h2>
                        <hr></hr>
                        <h3>Before you start, we have some questions about your life.</h3>
                        <h5>It is very import for you to answer them honestly.</h5>
                        <hr></hr>
                    </div>

                    <Item>
                        <FormLabel>Please enter your year of birth.</FormLabel> <p></p>
                        <TextField
                            id="dob"
                            defaultValue=""
                            onChange={(e) => setDob(e.target.value)}
                            label="Enter Year"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Item>
                    <hr></hr>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many hours do you sleep in a day?</FormLabel>
                            <RadioGroup
                                className="question"
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                                id="sleep"
                            >
                                <FormControlLabel onChange={(e) => setSleep(e.target.value)} value="less" control={<Radio />} label="Less than 5 hours" />
                                <FormControlLabel onChange={(e) => setSleep(e.target.value)} value="between" control={<Radio />} label="Between 5 hours. - 8 hours" />
                                <FormControlLabel onChange={(e) => setSleep(e.target.value)} value="more" control={<Radio />} label="More than 8 hours" />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                    <hr></hr>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many litres do you drink water in a day?</FormLabel>
                            <RadioGroup
                                className="question"
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                                id="water"
                            >
                                <FormControlLabel onChange={(e) => setWater(e.target.value)} value="less" control={<Radio />} label="Less than 1 litre" />
                                <FormControlLabel onChange={(e) => setWater(e.target.value)} value="between" control={<Radio />} label="Between 1 litre - 3 litres" />
                                <FormControlLabel onChange={(e) => setWater(e.target.value)} value="more" control={<Radio />} label="More than 3 litres" />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                    <hr></hr>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many steps do you take in a day?</FormLabel>
                            <RadioGroup
                                className="question"
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                                id="steps"
                            >
                                <FormControlLabel onChange={(e) => setSteps(e.target.value)} value="less" control={<Radio />} label="Less than 5000" />
                                <FormControlLabel onChange={(e) => setSteps(e.target.value)} value="between" control={<Radio />} label="Between 5000 - 10000" />
                                <FormControlLabel onChange={(e) => setSteps(e.target.value)} value="more" control={<Radio />} label="More than 10000" />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                    <hr></hr>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many hour do you work in a day?</FormLabel>
                            <RadioGroup
                                className="question"
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                                id="work"
                            >
                                <FormControlLabel onChange={(e) => setWork(e.target.value)} value="less" control={<Radio />} label="Less than 5 hours" />
                                <FormControlLabel onChange={(e) => setWork(e.target.value)} value="between" control={<Radio />} label="Between 5 - 8 hours" />
                                <FormControlLabel onChange={(e) => setWork(e.target.value)} value="more" control={<Radio />} label="More than 8 hours" />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                    <hr></hr>
                    <div className="question">
                        <Button onClick={() => updateQuiz()} variant="contained" size="large"> Submit </Button>
                    </div>
                    <br></br>
                </Box>
            </Stack >

        </div >
    )
}
