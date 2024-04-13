import React, { useState } from 'react';
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";

const HomeImageSlide = ({ slides }) => {
    // console.log('slides.length', slides.length)
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    return (
        <div className="relative w-full  ">
            {slides?.length > 1 && <> <button onClick={prevSlide} className="absolute p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white top-1/2 left-0 transform -translate-y-1/2   focus:outline-none">
                <FcLeft className='text-xs md:text-lg' />
            </button>
                <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white   focus:outline-none">
                    <FcRight className='text-xs md:text-lg' />
                </button></>}
            <div className="flex w-full ">
                {slides?.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-[600px] transition-opacity md:h-[500px] h-[350px] duration-300 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        <img src={slide} style={{ minWidth: '100%', minHeight: '100%', maxHeight: "100%", width: 'auto', height: 'auto' }}
                            alt="image" className=" cursor-pointer  object-contain  " />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeImageSlide;
