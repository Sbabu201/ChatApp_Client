import React from 'react';

const DemoCard = ({ slides }) => {
    // console.log('slides', slides)




    return (
        <div className="relative w-full  ">

            <div className="flex w-full ">
                {slides?.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full transition-opacity  duration-300 ease-in-out  'opacity-100'
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
