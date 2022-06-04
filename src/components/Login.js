import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarouselSlide from "./CarouselSlide";
import { auth, db, gprovider } from "../firebaseConfig";
import { GoogleLoginButton } from "react-social-login-buttons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import firebase from "@firebase/app-compat";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// async Google Sign-in method by using the provider we have declared in FirebaseConfig.js. 
//Google auth is an adventage that comes with firebase
export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(gprovider);
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

export default function Login() {

    //assign useState() hooks to get email password and to catch error

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    //assigned signIn constant to userAuth function component to process the login function

    const { signIn } = UserAuth();

    //useNavigate hook to redirect user after login

    const navigate = useNavigate();

    //implemented async handleSubmit function, used preventDefault function to stop the default browser
    //behaviour if something goes off in the event

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password);
            navigate('/dashboard')

        } catch (error) {
            setError(error.message)
            console.log(error.message)
            alert(error.message)
        }
    }

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">

                    <form onSubmit={handleSubmit}>
                        <h3>Sign in</h3>


                        <div className="form-group">

                            <TextField
                                required
                                id="email"
                                label="E-mail"
                                defaultValue=""
                                margin="dense"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                id="password"
                                label="Password*"
                                type="password"
                                autoComplete="current-password"
                                margin="dense"
                                defaultValue=""
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <p></p>
                        </div>
                        <div className="button-signup">
                            <Button variant="contained" size="large" label="Submit" type="submit">Sign In</Button>
                        </div>
                        <p></p>


                        <GoogleLoginButton onClick={() => signInWithGoogle()} />

                        <p className="forgot-password text-right">
                            Don't have an account? <Link className="tags" to={"/sign-up"}>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>{/* <div className="slide-container">
                {CarouselSlide()}

            </div> */}</>
    );
}