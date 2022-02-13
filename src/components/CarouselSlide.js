import React, { Component } from 'react'
import { Fade } from "react-slideshow-image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const caroImages = [
    "images/benetton.jpg",
    "images/happygirl.png",
    "images/people.png",
    "images/smiley.jpg",
  ];
  
export default class CarouselSlide extends Component { 
    render(){
    return (

      <Carousel dynamicHeight="false" width="40%" thumbWidth="3%" showIndicators="false" autoPlay="true" infiniteLoop="true" emulateTouch="true" >
                <div>
                    <img src={caroImages[0]} />
                    
                </div>
                <div>
                    <img src={caroImages[3]} />
                    
                </div>
                <div>
                    <img src={caroImages[2]} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
       /*  <div>
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
      </div> */
  )
}
}
