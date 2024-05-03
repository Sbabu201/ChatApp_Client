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
import login from "../assets/login.jpg"
import logo from "../assets/3.png"

const schema = z.object({
    name: z.string(),
    phone: z.string().min(10),
    password: z.string().min(5),
    email: z.string().min(10),
});
const SignUp = () => {
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
            console.log('value', value)
            const { data } = await axios.post(`${URL}/user/signup`, value);
            if (data?.success) {

                toast.success(data?.message)
                localStorage.setItem("signup", JSON.stringify(value))
                navigate("/otp")
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log('error', error)
            setError("phone", {
                message: error?.response?.data?.message
            })
        }
    }
    return (
        <>
            <div className='flex items-center justify-center h-screen bg-white font-times md:bg-black w-full'>
                <div className='w-full md:w-2/3 h-2/3 border flex  items-center justify-center rounded-md border-gray-200 shadow-md  bg-white m-4 md:m-20'>
                    <div className='w-full md:w-[50%] hidden justify-center items-center  md:flex  overflow-hidden '>
                        <img src={login} className='object-cover rounded-md w-fit p-4 h-fit' alt="" />
                    </div>
                    <div className='w-full md:w-[50%] flex flex-col  h-full justify-center items-center '>
                        <span className='py-10 text-xl flex items-center gap-4 justify-between w-[50%] font-extrabold font-italic h-1/6'><img src={logo} className='w-12 h-12 rounded-md' alt="" /> FunZone</span>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex text-center items-center justify-evenly h-[70%] gap-2 w-full flex-col'>
                            <input {...register("phone")} type="text" placeholder='phone' className='md:w-3/5 w-[90%] px-2 h-10 outline-none border border-black' />
                            {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                            <div className='md:w-3/5 w-[90%] px-2 flex  h-10 outline-none border border-black'>
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
                            <input {...register("name")} type="text" placeholder='name' className='md:w-3/5 w-[90%] px-2 h-10 outline-none border border-black' />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            <input {...register("email")} type="text" placeholder='email' className='md:w-3/5 w-[90%] px-2  h-10 outline-none border border-black' />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            <button type='submit' disabled={isSubmitting} className='md:w-3/5 w-[90%]  h-10 outline-none  text-sm md:text-base rounded-md hover:bg-blue-900 bg-blue-600 text-white font-bold '>{isSubmitting ? "loading...." : "Sign Up"}</button>
                        </form>
                        <div className='h-[20%] flex flex-col gap-4 w-full md:w-3/5'>
                            <span className='w-full h-[50%] flex gap-2 justify-between items-center'>
                                <p className='w-2/5 border-b-2 border-black '></p>
                                <p className='w-1/5 flex items-center justify-center'>OR</p>
                                <p className='w-2/5 border-b-2 border-black '></p>
                            </span>
                            <div className='h-[50%]   w-full flex flex-col justify-between  items-center'>

                                <div className='w-full flex  justify-center items-center gap-4 h-5/6'>
                                    <span className='md:w-3/5   h-10 outline-none flex justify-center items-center ' >Alredy have an account ?</span>
                                    <button onClick={() => navigate("/login")} className='md:w-2/5  text-blue-600 font-bold  h-10 outline-none '> login here </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp
