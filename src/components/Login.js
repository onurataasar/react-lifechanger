import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarouselSlide from "./CarouselSlide";
import { auth, db, provider } from "../firebaseConfig";
import { GoogleLoginButton } from "react-social-login-buttons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import firebase from "@firebase/app-compat";

// Google Sign-in
export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    }
    catch (err) {
        alert(err.message);
    }
};


function signin() {

    if (document.getElementById('email') != null) {
        var email = document.getElementById('email').value;
    } if (document.getElementById('password') != null) {
        var password = document.getElementById('password').value;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            //Declare user variable
            var user = auth.currentUser;
            //Add user to firebase db
            var database_ref = db.ref();

            //Create user data
            var user_data = {
                last_login: Date.now()
            }

            database_ref.child('users/' + user.uid).update(user_data)



            alert("Logged in succesfully.");
        }).catch(function (error) {
            var errorCode = error.code;
            var error_message = error.message;
            alert(error_message);
        })

    //Handle Account Status
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location = '/dashboard'; //After successful login, user will be redirected to dashboard.js
        }
    });



    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Please enter a valid email or password.')
        return;
    }


    if (validate_field(email) == false) {
        alert('Please fill all the fields')
        return;
    }

    //ValidateEmail
    function validate_email(email) {
        var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (expression.test(email) == true) {
            return true;
        } else {
            return false;
        }
    }

    //Validate Password
    function validate_password(password) {
        //firebase only accepts passwords longer than 6 chars
        if (password < 6) {
            return false;
        } else {
            return true;
        }
    }

    //validate field
    function validate_field(field) {
        if (field == null) {
            return false;
        } if (field <= 0) {
            return false;
        } return true;
    }
}


export default function Login() {

    return (
        <><div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign in</h3>


                    <div className="form-group">

                        <TextField
                            required
                            id="email"
                            label="E-mail"
                            defaultValue=""
                            margin="dense"

                        />

                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                        />

                        <p></p>
                    </div>
                    <div className="button-signup">
                        <Button variant="contained" size="large" onClick={() => {
                            signin();
                        }}>Sign In</Button>
                    </div>
                    <p></p>


                    <GoogleLoginButton onClick={() => signInWithGoogle()} />

                    <p className="forgot-password text-right">
                        Don't have an account? <Link className="tags" to={"/sign-up"}>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div><div className="slide-container">
                {CarouselSlide()}

            </div></>
    );
}