import React from "react";
import CarouselSlide from "./CarouselSlide";
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, db, provider } from "../firebaseConfig";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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


// Reset password
export const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
    } catch (err) {
        alert(err.message);
    }
};

function register() {
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

    if (document.getElementById('email') != null) {
        var email = document.getElementById('email').value;
    } if (document.getElementById('password') != null) {
        var password = document.getElementById('password').value;
    } if (document.getElementById('name') != null) {
        var name = document.getElementById('name').value;
    } if (document.getElementById('surname') != null) {
        var surname = document.getElementById('surname').value;
    }
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Please enter a valid email or password.')
        return;
    }

    if (validate_field(name || surname) == false) {
        alert('Please fill all the fields')
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            //Declare user variable
            var user = auth.currentUser;
            //Add user to firebase db
            var database_ref = db.ref();

            //Create user data
            var user_data = {
                email: email,
                name: name,
                surname: surname,
                last_login: Date.now()
            }

            database_ref.child('users/' + user.uid).set(user_data)



            alert("User Created");
        })
        .catch(function (error) {
            var error_code = error_code;
            var error_message = error_message;
            alert(error_message);
        })

    //redirect
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location = '/quiz'; //After successful login, user will be redirected to quiz.js
        }
    });


}

export default function SignUp() {

    return (
        <><div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>


                    <div className="form-group">
                        <TextField
                            required
                            id="name"
                            label="First Name"
                            defaultValue=""
                            margin="dense"
                        />
                        <TextField
                            required
                            id="surname"
                            label="Second Name"
                            defaultValue=""
                            margin="dense"
                        />
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

                        <TextField
                            id="password"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                        />
                        <p></p>
                    </div>
                    <div className="button-signup">
                        <Button variant="contained" size="large" onClick={() => {
                            alert('clicked');
                            register();
                        }}>Sign Up</Button>
                    </div>
                    <p></p>

                    <GoogleLoginButton onClick={() => signInWithGoogle()} />

                    <p className="forgot-password text-right">
                        Already registered <Link className="tags" to={"/sign-in"}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div><div className="slide-container">
                {<CarouselSlide />}
            </div></>
    );
}