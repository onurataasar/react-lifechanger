import React, { Component } from "react";
import { Link } from "react-router-dom";
import FadeSlide from "./FadeSlide";
export default class Login extends Component {
    render() {
        return (
            <><div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Don't have an account?<Link className="tags" to={"/sign-up"}>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div><div className="slide-container">
                    <FadeSlide />

                </div></>
        );
    }
}