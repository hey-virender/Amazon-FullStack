// eslint-disable-next-line no-unused-vars
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CategoryInstances from "../components/CategoryInstances";

const LandingCarousel = () => {
  const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"];
  return (
    <div className="h-96 relative">
      <Carousel
        showThumbs={false}
        showArrows={true}
        infiniteLoop={true}
        dynamicHeight={true}
        autoPlay={true}
        interval={4000}
        showIndicators={false}
      >
        {images.map((image, index) => (
          <div key={index} className="h-3/5 flex items-center overflow-hidden">
            <img
              className="h-full object-top aspect-video"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
      <CategoryInstances />
    </div>
  );
};

export default LandingCarousel;
