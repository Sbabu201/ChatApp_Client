import React, { useState } from 'react'
import ButtomBar from './ButtomBar'
import SideBar from './SideBar'
import login from "../assets/msg.png"
const Home = () => {
    const arr = [1, 2, 3, 4, 4, 5, 6, 6, 4, 3, 2, , 1, 1, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    return (
        <>
            <div className='min-h-screen flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible  text-white '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
                    <div className='m-2 w-full h-[100px] flex items-center overflow-x-auto scrollbar-hide  scroll-smooth border-b-2'>
                        {
                            arr?.map((item, i) => (
                                <img src={login} className='object-cover rounded-full h-[70px] min-w-[70px] ' key={i}>
                                    {/* <img src="" alt="" /> */}
                                </img>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className='visible md:invisible '>
                <ButtomBar />
            </div>
        </>
    )
}

export default Home
