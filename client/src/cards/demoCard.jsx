import React, { useState } from 'react';

const DemoCard = ({ slides }) => {
    // console.log('slides', slides)

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

            <div className="flex w-full ">
                {slides?.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-[600px] transition-opacity md:h-[400px] h-[100px] duration-300 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        <img src={slide} style={{ minWidth: '100%', minHeight: '100%', maxHeight: "100%", width: 'auto', height: 'auto' }}
                            alt="image" className=" cursor-pointer  object-cover  " />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemoCard;
