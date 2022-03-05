import React from "react";
import CarouselSlide from "./CarouselSlide";
import { Link } from "react-router-dom";
export default function SignUp() {
    return (
        <><div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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