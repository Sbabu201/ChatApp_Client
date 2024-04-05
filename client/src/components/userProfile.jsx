import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import ButtomBar from '../components/ButtomBar'
import Facebook from '../assets/facebook.png'
import Loader from "../utils/Loader";
import { FcSettings } from "react-icons/fc";
import { FcDataSheet } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";

import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import toast from 'react-hot-toast';
import DemoCard from '../cards/demoCard';
import { getAllUsers } from '../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePageLoader from '../utils/ProfilePageLoader';
import { URL } from '../utils/serverurl';
const UserProfile = () => {
    const backendUrl = process.env.BACKEND;
    console.log('backend', backendUrl)
    const dispatch = useDispatch()
    let userId = useSelector(state => state.profileReducer.userId) || localStorage.getItem("userId");
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    const users = useSelector(state => state.userReducer.users);
    let existUser = users.filter((item) => {
        return item._id === userId;
    })
    let loggeduserDetails = users.filter((item) => {
        return item._id === loggedUser?._id;
    })
    // console.log('loggeduserDetails', loggeduserDetails)
    useEffect(() => {
        dispatch(getAllUsers())
        existUser = users.filter((item) => {
            return item._id === userId;
        })
    }, [userId])

    if (existUser.length === 0) {
        return <ProfilePageLoader />
    }
    const checkIdExists = (array, id) => {
        return array.some(item => item._id === id);
    };
    const idExists = checkIdExists(loggeduserDetails[0]?.following, userId);

    // console.log('idExists', idExists)
    const handleFollowing = async () => {
        try {
            if (loggedUser._id === existUser[0]._id) {
                toast.error("you cant follow yourself")
                return
            }
            const form = {
                user: loggedUser._id,
                follower: existUser[0]._id
            }

            // idExists ? alert("hey") : alert("hello");
            const { data } = !idExists ? await axios.put(`${URL}/user/addfollow`, form) : await axios.put(`${URL}/user/removefollow`, form);
            console.log('data', data)
            if (data.success) {
                toast.success(data.message);
                dispatch(getAllUsers());
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <>
            <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
                    <div className='w-full max-h-[44%] p-10 flex border-b-2  border-gray-900 '>
                        <div className='w-1/3 h-full flex justify-center items-center '>
                            <img src={existUser[0]?.profilePic} className='w-60 h-60 rounded-full object-cover' alt="" />
                        </div>
                        <div className='w-2/3 h-full text-white '>
                            <div className='p-6 font-bold text-sm w-full items-center flex gap-4'>
                                <span className='flex justify-center items-center gap-2 text-xl'>{existUser[0]?.name}<FcApproval size={22} /></span>
                                <button onClick={handleFollowing} className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>{!idExists ? "follow" : "following"}</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>message</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>add tool</button>
                                <FcSettings className=' cursor-pointer' size={32} />

                            </div>
                            <div className='flex px-6 pb-4 gap-10'>
                                <span className='flex gap-2 '>
                                    <p>{existUser[0]?.posts?.length}</p>
                                    <p>posts</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>{existUser[0]?.followers?.length}</p>
                                    <p>Followers</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>{existUser[0]?.following?.length}</p>
                                    <p>Followings</p>
                                </span>
                            </div>
                            <div className='px-6'>
                                <p className='font-bold text-xl'>{existUser[0]?.name}</p>
                                <p>{existUser[0]?.bio}</p>
                                {/* <p> Jay Shree Krishna❤️</p> */}
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
                        <div className='flex gap-4 w-[90%]  flex-wrap'>
                            {existUser[0]?.posts?.map((item, i) => (
                                <div className='w-[31%] flex flex-col max-h-[400px] min-h-[400px] relative group'>
                                    <DemoCard slides={item?.image} />
                                    {/* <img key={i} className='w-full max-h-[350px] min-h-[350px] object-cover' src={item?.image?.slice(0, 1)} alt="" /> */}
                                    <p className="absolute hidden group-hover:flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded">
                                        <FcLike size={24} />{item?.likes?.length}
                                        <FcComments size={24} />{item?.comments?.length}
                                    </p>
                                </div>
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

export default UserProfile
