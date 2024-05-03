import React, { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/serverurl";
import { useDispatch } from 'react-redux';
import { setAuthenticated } from "../store/reducers/profileReducer";
const OtpCheckPage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const value = JSON.parse(localStorage.getItem("signup"));
    console.log('value', value)
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
            setLoading(true)
            const newOtp = otp.join("");
            const { data } = await axios.post(`${URL}/user/login/verify`, { otp: newOtp, name: value?.name, email: value?.email, password: value?.password, phone: value?.phone, })
            if (data.success) {

                toast.success(data?.message)
                navigate("/login")
            }
            else {
                toast.error(data?.message)

            }

        } catch (error) {
            console.log('error', error)
            toast.error(error?.response?.data?.message)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="  flex h-screen  bg-black text-white justify-center items-center">
            <div className="border-2 border-gray-800 w-full h-[40%] m-4 md:w-[40%] flex flex-col justify-center gap-3 md:justify-between shadow-md rounded-xl py-5">
                <h1 className="md:text-lg text-sm text-center font-bold   ">
                    {"otp sent to " + value?.email}
                </h1>
                <div className="w-[80%] m-auto  flex flex-row gap-2 my-5">
                    {otp.map((data, i) => {
                        return (
                            <input
                                type="text"
                                name="otp"
                                className="border-b-2 outline-none bg-gray-900 text-sm md:text-base text-white border-blue-600 w-12 h-8 md:w-12 md:h-12  rounded-xl m-auto text-center"
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
                    <button disabled={loading} onClick={submintOtp} className="bg-blue-600 px-4 py-2 md:px-10  text-white text-xs md:text-base font-bold rounded-xl">
                        {loading ? "verifying..." : "verify"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpCheckPage;



