import React from 'react'
import SideBar from '../components/SideBar'
import ButtomBar from '../components/ButtomBar'
import { useNavigate } from 'react-router-dom'
import login from "../assets/msg.png"
const NotificationPage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 2, 1, 2, 3, 1, 2, 3, 1, 1, 2, 3, 4,]
    const navigate = useNavigate()
    return (
        <>
            <div className='min-h-screen flex h-full w-full'>
                <div className='md:w-1/5 w-0 h-full md:visible invisible  text-white '>
                    <SideBar />

                </div>
                <div className='md:w-3/5 w-full flex flex-col gap-4  bg-black justify-center items-center    min-h-screen'>
                    {arr?.map((item, i) => (
                        <div className=' px-6 flex text-white items-center justify-start gap-8  '>
                            <p className=' text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor.</p>
                            <img src={login} className='w-10 h-10 object-cover' alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className='visible md:invisible '>
                <ButtomBar />
            </div>
        </>
    )
}

export default NotificationPage
