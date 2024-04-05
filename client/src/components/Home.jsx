import React, { useEffect, useState } from 'react'
import ButtomBar from './ButtomBar'
import SideBar from './SideBar'
import login from "../assets/msg.png"
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/reducers/postReducer'
import allPostsCard from '../cards/allPostsCard'
import PostCard from '../cards/PostCard'
import Loader from '../utils/Loader'
import { URL } from '../utils/serverurl'
const Home = () => {
    console.log('URL', URL)
    const posts = useSelector(state => state.postReducer);
    if (posts?.status === "loading") return <Loader />
    return (
        <>


            <div className='min-h-screen flex h-full w-full bg-black '>
                <div className='md:w-[20%]  h-full md:flex hidden text-white '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black duration-300   border-white  h-full '>

                    {/* {(posts?.status === "loading") ? <Loader /> */}
                    <div className='m-2 w-full pb-40 h-full justify-start duration-300 items-center gap-4 flex flex-col border-b-2'>
                        {
                            posts?.posts?.map((item, i) => (
                                <PostCard key={i} item={item} />

                            ))
                        }
                    </div>
                </div >

            </div >
            <div className='flex md:hidden '>
                <ButtomBar />
            </div>


        </>
    )
}

export default Home
