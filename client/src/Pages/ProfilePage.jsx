import React from 'react'
import SideBar from '../components/SideBar'
import ButtomBar from '../components/ButtomBar'
import Facebook from '../assets/facebook.png'
import { FcSettings } from "react-icons/fc";
import { FcDataSheet } from "react-icons/fc";
const ProfilePage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <>
            <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
                    <div className='w-full max-h-[44%] p-10 flex border-b-2 border-gray-900 '>
                        <div className='w-1/3 h-full flex justify-center items-center '>
                            <img src={Facebook} className='w-60 h-60 rounded-full object-cover' alt="" />
                        </div>
                        <div className='w-2/3 h-full text-white '>
                            <div className='p-6 font-bold text-sm w-full items-center flex gap-4'>
                                <span className=' text-xl'>UserName</span>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>edit profile</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>view archieve</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>add tool</button>
                                <FcSettings className=' cursor-pointer' size={32} />

                            </div>
                            <div className='flex px-6 pb-4 gap-10'>
                                <span className='flex gap-2 '>
                                    <p>4</p>
                                    <p>posts</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>4</p>
                                    <p>Followers</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>4</p>
                                    <p>Followings</p>
                                </span>
                            </div>
                            <div className='px-6'>
                                <p className='font-bold text-xl'>Soumya Mohapatra</p>
                                <p>Exploring the beauty of life .</p>
                                <p> Jay Shree Krishna❤️</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-5 text-center p-4 items-center'>
                        <div className=' gap-1 flex  items-center border-b-2 border-gray-600 border-dashed'>

                            <FcDataSheet size={22} />
                            <p className='text-2xl pb-2  '>posts</p>

                        </div>
                        <div className='flex gap-4 w-[90%] flex-wrap'>
                            {arr?.map((item, i) => (
                                <img key={i} className='w-[31%] object-cover ' src={Facebook} alt="" />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div className='visible md:invisible '>
                <ButtomBar />
            </div>
        </>
    )
}

export default ProfilePage
