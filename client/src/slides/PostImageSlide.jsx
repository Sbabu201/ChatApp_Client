import React, { useState } from 'react';
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";
const PostImageSlide = ({ slides }) => {
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
            <button onClick={prevSlide} className="absolute p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white top-1/2 left-0 transform -translate-y-1/2   focus:outline-none">
                <FcLeft className='text-xs md:text-lg' />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white   focus:outline-none">
                <FcRight className='text-xs md:text-lg' />
            </button>
            <div className="flex w-full ">
                {slides?.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full transition-opacity  duration-300 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        <img src={slide} alt="image" className="w-full object-contain md:min-h-[80vh] md:max-h-[80vh] min-h-[40vh] max-h-[40vh]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostImageSlide;
