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
import { confirm } from "react-confirm-box";
import NavItem from "rsuite/esm/Nav/NavItem";



export default function Profile() {


    const dbRef = ref(getDatabase());
    const [name, setName] = useState("");
    const [surname, setsName] = useState("");
    const [dob, setDob] = useState();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid
            console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous)
            get(child(dbRef, `users/${uid}/name`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setName(snapshot.val());
                    console.log(snapshot.val());

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            get(child(dbRef, `users/${uid}/surname`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setsName(snapshot.val());
                    console.log(snapshot.val());

                } else {
                    console.log("No data available");
                }
            })

            get(child(dbRef, `users/${uid}/initial/dob`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setDob(snapshot.val());
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
        }
    });
    const email = firebase.auth().currentUser.email
    /*
         const [pp, setPp] = useState();
         const setPhoto = async (e) => {
    
            setError('')
            try {
                var user = auth.currentUser;
                //Add user to firebase db
                var database_ref = db.ref();
    
                //Create user data
                var photo_data = {
                    pp: pp,
    
                }
    
                database_ref.child('users/' + user.uid).set(photo_data);
                console.log("Photo updated.")
                this.render();
    
            } catch (e) {
                setError(e.message)
                console.log(e.message)
            }
        } */

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    const navigate = useNavigate();
    const options = {
        closeOnOverlayClick: true,
        labels: {
            confirmable: "Delete",
            cancellable: "Cancel"
        }
    }
    const handleDelete = async () => {
        const result = await confirm("Are you sure?", options);
        if (result) {
            try {

                var user = auth.currentUser;
                var database_ref = db.ref();
                user.delete();
                //deleting the user to users database with firebase ref
                database_ref.child('users/' + user.uid).remove()
                navigate('/welcome')
                console.log("You are deleted.")
            } catch (e) {
                console.log(e.message)
            }
            localStorage.clear();
        }
        console.log("You click No!");
    }


    return (

        <div className="dashboard" >
            <Navbar />
            <br></br>
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

                    <div className="profile-image" >
                        <input
                            type="button" name="emotion"
                            id="profile-photo" class="input-hidden"
                            value="user-image"
                        />
                        <label htmlFor="photo-upload">
                            <img style={{ width: "33%", borderRadius: "50%" }}
                                src="https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-user-web-flaticons-flat-flat-icons-2.png"
                                alt="Profile Photo"
                                /* onChange={(e) => setPp(e.target.value)} */ />
                        </label>

                    </div>
                    <p></p>
                    <Typography id="pn" variant="h4" style={{ marginTop: "8%" }}>
                        {name}

                    </Typography>
                    <Typography id="ps" variant="h5"> {surname}</Typography>
                    <hr></hr>

                    <Typography id="pe" variant="h5">
                        Email: {email}

                    </Typography>
                    <p></p>
                    <Typography id="pa" variant="h5">
                        Age: {(year - dob)}
                    </Typography>
                    <br></br>
                    <p></p>
                    <Button onClick={handleDelete} className="button-delete" variant="contained" color="error">Delete Account</Button>
                </Box>
            </div >
            <StickyFooter></StickyFooter>
        </div >
    );
}