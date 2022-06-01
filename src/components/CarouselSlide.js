import React, { Component } from 'react'
import { Fade } from "react-slideshow-image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import useWindowSize from './useWindowSize';

const caroImages = [
  "images/benetton.jpg",
  "images/happygirl.png",
  "images/people.png",
  "images/smiley.jpg",
];

function CarouselSlide() {
  const { width } = useWindowSize();
  return (

    <div>
      {width > 1000 && (
        <Fade autoPlay transition={1000} arrows={true}  >
          <div className="each-fade">
            <img src={caroImages[0]} />
          </div>
          <div className="each-fade">
            <img src={caroImages[1]} />
          </div>
          <div className="each-fade">
            <img src={caroImages[3]} />
          </div>
        </Fade>
      )}
    </div>

  )
}

export default CarouselSlide