import React, { useState } from 'react';
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";
import { ChevronLeft, ChevronRight } from "react-feather"

const HomeImageSlide = ({ slides }) => {
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
                        className={`w-[600px] transition-opacity md:h-[500px] h-[350px] duration-300 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        <img src={slide} style={{ minWidth: '100%', minHeight: '100%', maxHeight: "100%", width: 'auto', height: 'auto' }}
                            alt="image" className="  object-contain  " />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeImageSlide;
// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "react-feather"

// export default function HomeImageSlide({
//     slides,
//     autoSlide = false,
//     autoSlideInterval = 3000,
// }) {
//     const [curr, setCurr] = useState(0)

//     const prev = () =>
//         setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
//     const next = () =>
//         setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

//     useEffect(() => {
//         if (!autoSlide) return
//         const slideInterval = setInterval(next, autoSlideInterval)
//         return () => clearInterval(slideInterval)
//     }, [])
//     return (
//         <div className="overflow-hidden relative">
//             <div
//                 className="flex transition-transform ease-out duration-500"
//                 style={{ transform: `translateX(-${curr * 100}%)` }}
//             >
//                 {slides?.map((item, index) => (
//                     <div className=" min-w-[300px] md:min-w-[600px] h-[200px]  md:min-h-[400px]" key={index}>
//                         <img src={item} alt="" className="md:min-w-[600px] min-w-[300px] h-[200px] md:min-h-[400px] object-cover" />
//                     </div>
//                 ))}
//             </div>
//             <div className="absolute inset-0 flex items-center justify-between p-4">
// <button
//     onClick={prev}
//     className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
// >
//     <ChevronLeft size={20} />
// </button>
// <button
//     onClick={next}
//     className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
// >
//     <ChevronRight size={20} />
// </button>
//             </div>

//             <div className="absolute bottom-4 right-0 left-0">
//                 <div className="flex items-center justify-center gap-2">
//                     {slides.map((_, i) => (
//                         <div
//                             className={`
//               transition-all w-3 h-3 bg-white rounded-full
//               ${curr === i ? "p-2" : "bg-opacity-50"}
//             `}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }