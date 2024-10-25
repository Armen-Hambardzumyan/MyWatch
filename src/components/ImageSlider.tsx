import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import './ImageSlider.css';

interface ImageSliderProps {
  images: string[];
  onImageClick: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
        className="slider-image"
        onClick={onImageClick}
      />
      <div className="slider-buttons">
        <Button variant="surface" onClick={(e) => { e.stopPropagation(); prevImage(); }} className="slider-button">
          <ChevronLeftIcon />
        </Button>
        <Button variant="surface" onClick={(e) => { e.stopPropagation(); nextImage(); }} className="slider-button">
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ImageSlider;
