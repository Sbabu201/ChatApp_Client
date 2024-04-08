import React, { useState } from 'react'
import fb from "../assets/facebook.png"
import ButtomBar from '../components/ButtomBar'
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { URL } from '../utils/serverurl'
const backendUrl = process.env.BACKEND;

const schema = z.object({
    name: z.string(),
    phone: z.string().min(10),
    password: z.string().min(5),
    email: z.string().min(10),
});
const SignUp = () => {
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
                navigate("/login")
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log('error', error)
            setError("phone", {
                message: error.message
            })
        }
    }
    return (
        <>
            <div className='flex items-center justify-center h-screen bg-black w-full'>
                <div className='w-full md:w-1/2 h-2/3 border flex flex-col items-center justify-center rounded-md border-gray-200 shadow-md  bg-white m-4 md:m-20'>
                    <span className='py-10 h-1/6'>SOUMYAGRAM</span>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex text-center items-center justify-evenly h-3/6 gap-2 w-full flex-col'>
                        <input {...register("phone")} type="text" placeholder='phone' className='md:w-2/5 w-full px-2 h-10 outline-none border border-black' />
                        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                        <input {...register("password")} type="password" placeholder='password' className='md:w-2/5 px-2 w-full  h-10 outline-none border border-black' />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        <input {...register("name")} type="text" placeholder='name' className='md:w-2/5 w-full px-2 h-10 outline-none border border-black' />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        <input {...register("email")} type="text" placeholder='email' className='md:w-2/5 w-full px-2  h-10 outline-none border border-black' />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        <button type='submit' disabled={isSubmitting} className='md:w-2/5 w-full  h-10 outline-none  rounded-md hover:bg-blue-500 bg-blue-300 text-white font-bold '>{isSubmitting ? "loading...." : "Sign Up"}</button>
                    </form>
                    <div className='h-2/6 flex flex-col gap-4 w-full md:w-2/5'>
                        <span className='w-full h-1/6 flex gap-2 justify-between items-center'>
                            <p className='w-2/5 border-b-2 border-black '></p>
                            <p className='w-1/5 flex items-center justify-center'>OR</p>
                            <p className='w-2/5 border-b-2 border-black '></p>
                        </span>
                        <div className='h-5/6   w-full flex flex-col justify-between  items-center'>
                            <div className='w-full h-1/6 flex justify-center gap-4'>
                                <span>Login With</span>
                                <img src={fb} alt="" className='w-50 h-50 rounded-sm' />
                            </div>
                            <div className='w-full flex  justify-evenly items-center gap-4 h-5/6'>
                                <button className='md:w-3/5   h-10 outline-none border border-black' >forgot Password ?</button>
                                <button onClick={() => navigate("/login")} className='md:w-2/5   h-10 outline-none border border-black'> login here </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp