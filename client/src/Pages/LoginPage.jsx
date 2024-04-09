import React, { useState } from 'react'
import fb from "../assets/facebook.png"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { URL } from '../utils/serverurl'

const schema = z.object({
    phone: z.string().min(10),
    password: z.string().min(5)
});
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (value) => {
        try {
            const { data } = await axios.post(`${URL}/user/login`, value);
            console.log('data', data)
            if (data?.success) {
                console.log('data', data)
                localStorage.setItem("mobile", value.phone.toLowerCase());
                toast.success(data?.message)
                navigate("/otp")
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log('error', error.response.data.message)
            setError("password", {
                message: error?.response?.data?.message
            })
        }
    }
    return (
        <>
            <div className='flex items-center justify-center h-screen font-times bg-white md:bg-black w-full'>
                <div className='w-full md:w-1/2 h-2/3 border flex flex-col items-center justify-center rounded-md border-gray-200 shadow-md  bg-white m-4 md:m-20'>
                    <span className='py-10 text-xl font-extrabold font-italic h-1/6'>SOUMYAGRAM</span>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex text-center text-xs md:text-sm items-center justify-evenly h-3/6 gap-2 w-full flex-col'>
                        <input {...register("phone")} type="text" placeholder='Email' className='md:w-2/5 w-[90%] px-2  h-10 outline-none border border-black' />
                        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                        <div className='md:w-2/5 w-[90%] px-2 flex  h-10 outline-none border border-black'>
                            <input {...register("password")} type={showPassword ? 'text' : 'password'} placeholder='Password' className=' w-[90%]  h-full outline-none ' />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="w-10% h-10"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        <button type='submit' disabled={isSubmitting} className='md:w-2/5 w-[90%]  h-10 outline-none text-sm md:text-base rounded-md hover:bg-blue-900 bg-blue-600 text-white font-bold '>{isSubmitting ? "loading...." : "Log in"}</button>
                    </form>
                    <div className='h-2/6 flex flex-col gap-4 w-full md:w-2/5'>
                        <span className='w-full h-1/6 flex gap-2 justify-between items-center'>
                            <p className='w-2/5 border-b-2 border-black '></p>
                            <p className='w-1/5 flex items-center justify-center'>OR</p>
                            <p className='w-2/5 border-b-2 border-black '></p>
                        </span>
                        <div className='h-5/6   w-[full] flex flex-col justify-between  items-center'>
                            <div className='w-[90%] h-1/6 flex justify-end gap-4'>
                                <button className='text-blue-600 '>forgot Password ? </button>

                            </div>
                            <div className='w-[90%]  flex  justify-evenly items-center h-5/6'>
                                <button className='md:w-[70%]   h-10 outline-none  ' >Don't have an account ?</button>
                                <button onClick={() => navigate("/signup")} className='md:w-[30%]  font-bold text-blue-600 h-10 outline-none '> Sign up </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage
