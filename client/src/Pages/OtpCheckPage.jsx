import React, { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/serverurl";
import { useDispatch } from 'react-redux';
import { setAuthenticated } from "../store/reducers/profileReducer";
const OtpCheckPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const phone = localStorage.getItem("mobile")
    // console.log('phone', phone)
    const handleChange = (el, index) => {
        if (isNaN(el.value)) return false


        setOtp([...otp.map((data, i) => (i === index ? el.value : data))])

        if (el.nextSibling) {
            el.nextSibling.focus()
        }
    }
    //onClick event
    const submintOtp = async () => {
        // console.log('otp.join("") ', otp.join(""))
        try {
            const newOtp = otp.join("");
            const { data } = await axios.post(`${URL}/user/login/verify`, { otp: newOtp, phone: phone })
            if (data.success) {
                localStorage.setItem("token", data?.accessToken)
                localStorage.setItem("info", JSON.stringify(data?.info))
                localStorage.removeItem("mobile")
                toast.success(data?.message)
                dispatch(setAuthenticated(true))
                navigate("/")
            }
            else {
                toast.error(data?.message)

            }
        } catch (error) {
            console.log('error', error)
        }
    }


    return (
        <div className=" m-auto flex min-h-screen min-w-screen bg-black text-white justify-center items-center">
            <div className="border-2 w-full m-4 md:w-[40%] md:m-auto shadow-md rounded-xl py-5">
                <h1 className="text-2xl text-center font-bold   ">
                    {phone}
                </h1>
                <div className="w-[80%] m-auto flex flex-row gap-2 my-5">
                    {otp.map((data, i) => {
                        return (
                            <input
                                type="text"
                                name="otp"
                                className="border-2 text-black border-blue-600 w-12 h-8 md:w-12 md:h-12 text-2xl rounded-xl m-auto text-center"
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
