import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarouselSlide from "./CarouselSlide";
import Box from "@mui/material/Box";
import Footer from "./FooterComponent";
import FooterComponent from "./FooterComponent";
import Button from "@mui/material/Button"
import StandardImageList from "./StandartImageList";
import { useNavigate } from "react-router";



export default function Welcome() {
    const navigate = useNavigate();
    return (

        <div className="welcome">
            <div className="welcome-text">
                <br></br>
                <h1>LifeChanger</h1>
                <h2>A brand new experience to make your life better</h2>
                <h3>LifeChanger is planned as a website idea that aims for the user
                    profiles which would like to follow the changes of their personal
                    life on a daily basis. The main purpose of this website is to keep
                    track of and show users how their moods, psychology and their
                    life change day by day.</h3>
                <br></br>
                <Button className="button-welcome" onClick={() => navigate('/sign-up')} variant="contained" color="error">Create an Account Now!</Button>
                <p className="forgot-password text-right">
                    Already have an account? <Link className="tags" to={"/sign-in"}>Sign in</Link>
                </p>

            </div>
            <div className="image">
                <StandardImageList />
            </div>

            {/*            <Box component="span" sx={{ p: 2, border: '1px dashed gray' }}></Box>
            {CarouselSlide()} */}
            <FooterComponent />

        </div>
    )
}