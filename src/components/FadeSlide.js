import React, { Component } from 'react'
import { Fade } from "react-slideshow-image";

const fadeImages = [
    "images/benetton.jpg",
    "images/happygirl.png",
    "images/people.png"
  ];
  
export default class FadeSlide extends Component { 
    render(){
    return (
        <div>
        <Fade >
          <div className="each-fade">
            <img src={fadeImages[0]} />
          </div>
          <div className="each-fade">
            <img src={fadeImages[1]} />
          </div>
          <div className="each-fade">
            <img src={fadeImages[2]} />
          </div>
        </Fade>
      </div>
  )
}
}
