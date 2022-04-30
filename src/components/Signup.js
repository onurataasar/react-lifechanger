import React from "react";
import CarouselSlide from "./CarouselSlide";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, db, provider } from "../firebaseConfig";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";

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
                <form name='registration_form'>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="firstName" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="lastName" placeholder="Last name" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="password" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="confirmPassword" placeholder="Re-write your password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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