import React, { useState } from "react";

const OtpCheckPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    //input value get
    const handleChange = (el, index) => {
        if (isNaN(el.value)) return false


        setOtp([...otp.map((data, i) => (i === index ? el.value : data))])

        if (el.nextSibling) {
            el.nextSibling.focus()
        }
    }
    //onClick event
    const submintOtp = () => {
        otp.join("") === "111111" ? alert('verified') : alert('wrong otp')
    }


    return (
        <div className=" m-auto flex min-h-screen min-w-screen bg-black text-white justify-center items-center">
            <div className="border-2 w-full m-4 md:w-[40%] md:m-auto shadow-md rounded-xl py-5">
                <h1 className="text-2xl text-center font-bold   ">
                    OTP sent to demo@gmail.com
                </h1>
                <div className="w-[80%] m-auto flex flex-row gap-2 my-5">
                    {otp.map((data, i) => {
                        return (
                            <input
                                type="text"
                                name="otp"
                                className="border-2  border-blue-600 w-8 h-8 md:w-12 md:h-12 text-2xl rounded-xl m-auto text-center"
                                maxLength={1}
                                key={i}
                                value={data}
                                onChange={e => handleChange(e.target, i)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                </div>
                <div className="w-[80%] m-auto flex flex-row gap-2 justify-center  my-5">
                    <button onClick={submintOtp} className="bg-blue-600 px-4 py-3 md:px-10  text-white text-xl font-bold rounded-xl">
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpCheckPage;
