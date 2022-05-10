import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarouselSlide from "./CarouselSlide";
import Box from "@mui/material/Box";

export default function Welcome() {
    return (

        <div className="question">
            <h1>Welcome to LifeChanger</h1>
            <h2>A brand new experience to make your life better</h2>
            <h3> Please login or signup</h3>
            <Box component="span" sx={{ p: 2, border: '1px dashed gray' }}></Box>
            {CarouselSlide()}
        </div>
    )
}