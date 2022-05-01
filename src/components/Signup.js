import React from "react";
import CarouselSlide from "./CarouselSlide";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, db, provider } from "../firebaseConfig";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UserRegistration = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

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

export default function SignUp() {
    return (
        <><div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>


                    <div className="form-group">
                        <TextField
                            required
                            id="outlined-required"
                            label="Full Name"
                            defaultValue=""
                            margin="dense"
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail"
                            defaultValue=""
                            margin="dense"

                        />

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                        />

                        <TextField
                            id="outlined-password-input"
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