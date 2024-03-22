import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import ButtomBar from '../components/ButtomBar'
import Facebook from '../assets/facebook.png'
import { FcSettings } from "react-icons/fc";
import { FcDataSheet } from "react-icons/fc";
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import toast from 'react-hot-toast';
import DemoCard from '../cards/demoCard';
import ProfilePageLoader from '../utils/ProfilePageLoader';
const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false)
    const getUserData = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("info"))
        try {

            const { data } = await axios.get(`user/details/${user?._id}`);
            // console.log('data', data.existUser)
            setProfile(data?.existUser)
        } catch (error) {
            console.log('error', error)
            toast.error(error.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        getUserData();
    }, [])

    if (loading) { return <ProfilePageLoader /> }
    return (
        <>
            <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
                    <div className='w-full md:max-h-[44%]  md:p-10 flex flex-col md:flex-row border-b-2 border-gray-900 '>
                        <div className='md:w-1/3 w-full h-full flex justify-center items-center '>
                            <img src={profile?.profilePic} className='w-60 h-60 rounded-full object-cover' alt="" />
                        </div>
                        <div className='md:w-2/3 w-full h-full md:gap-0 gap-4 flex flex-col text-white '>
                            <div className='p-6 font-bold text-sm w-full md:text-balance text-small items-center md:justify-start justify-between flex gap-4'>
                                <span className=' text-xl'>{profile?.name}</span>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>edit profile</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>view archieve</button>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>add tool</button>
                                <FcSettings className=' cursor-pointer' size={32} />

                            </div>
                            <div className='flex md:justify-start w-full justify-between md:px-6 pb-4 md:gap-10 gap-2'>
                                <span className='flex gap-2 '>
                                    <p>{profile?.posts?.length}</p>
                                    <p>posts</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>{profile?.followers?.length}</p>
                                    <p>Followers</p>
                                </span>
                                <span className='flex gap-2 '>
                                    <p>{profile?.following?.length}</p>
                                    <p>Followings</p>
                                </span>
                            </div>
                            <div className='px-6'>
                                <p className='font-bold text-xl'>{profile?.name}</p>
                                <p>{profile?.bio}</p>
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
                        <div className='flex gap-4 w-[90%] flex-wrap'>
                            {profile?.posts?.map((item, i) => (
                                <div className='md:w-[31%] w-full flex flex-col max-h-[400px] min-h-[400px] relative group'>
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

export default ProfilePage
