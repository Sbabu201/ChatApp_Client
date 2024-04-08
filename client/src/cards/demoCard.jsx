import React, { useState } from 'react';
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";
const DemoCard = ({ slides }) => {
    // console.log('slides', slides)
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    return (
        <div className="relative w-full  ">

            <div className="flex w-full ">
                {slides?.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full transition-opacity  duration-300 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        <img src={slide} alt="image" className="w-full  object-cover md:min-h-[400px] h-[100px] " />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemoCard;
