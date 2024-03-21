import React, { useEffect, useState } from 'react'
import ButtomBar from './ButtomBar'
import SideBar from './SideBar'
import login from "../assets/msg.png"
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/reducers/postReducer'
import allPostsCard from '../cards/allPostsCard'
import PostCard from '../cards/PostCard'
import Loader from '../utils/Loader'
const Home = () => {

    const posts = useSelector(state => state.postReducer);
    if (posts?.status === "loading") return <Loader />
    return (
        <>


            <div className='min-h-screen flex h-full w-full bg-black scrollbar-hide overflow-y-auto  scroll-smooth'>
                <div className='md:w-[20%]  h-full md:flex flex-none  text-white '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black duration-300  scroll-smooth border-white  min-h-screen'>
                    <div className='m-2 w-full h-[100px] flex items-center overflow-x-auto scrollbar-hide  scroll-smooth border-b-2'>
                        {
                            posts?.posts?.map((item, i) => (
                                <img src={login} className='object-cover rounded-full h-[70px] min-w-[70px] ' key={i}>
                                    {/* <img src="" alt="" /> */}
                                </img>
                            ))
                        }
                    </div>
                    {/* {(posts?.status === "loading") ? <Loader /> */}
                    <div className='m-2 w-full pb-40 h-full justify-start  scroll-smooth duration-300 items-center gap-4 flex flex-col  border-b-2'>
                        {
                            posts?.posts?.map((item, i) => (
                                <PostCard key={i} item={item} />

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
