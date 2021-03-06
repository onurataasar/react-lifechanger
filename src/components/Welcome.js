import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import StandardImageList from "./StandartImageList";
import { useNavigate } from "react-router";
import StickyFooter from "./StickyFooter";
import { AppBar } from "@mui/material";
import { Typography } from "@mui/material";


export default function Welcome() {
    const navigate = useNavigate();
    return (

        <div className="welcome">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{ background: '#e5155c' }} position="static" >
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        display="flex"
                        sx={{ display: { xs: 'none', sm: 'block', textAlign: "center" } }}
                    >   <p></p>
                        LifeChanger
                        <p></p>
                    </Typography>
                </AppBar>
            </Box>
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

            <StickyFooter />
        </div>

    )
}