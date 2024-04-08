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
import { URL } from '../utils/serverurl';
import { setAuthenticated, setPost } from '../store/reducers/profileReducer';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false)
    const getUserData = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("info"))
        try {

            const { data } = await axios.get(`${URL}/user/details/${user?._id}`);
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
                    <div className='w-full md:max-h-[44%]  md:p-10 flex flex-row border-b-2 border-gray-900 '>
                        <div className='w-1/2 md:w-1/3 h-40 md:h-60  flex justify-center  items-center '>
                            <img src={profile?.profilePic} className='md:w-60 w-28 h-28 md:h-60 rounded-full object-cover' alt="" />
                        </div>
                        <div className='md:w-2/3 w-1/2 h-full md:gap-0 gap-4 flex flex-col  text-white '>
                            <div className='p-6 font-bold text-sm w-full md:text-balance flex-col md:flex-row   items-center md:justify-start justify-between flex gap-4'>
                                <span className='text-md md:text-xl'>{profile?.name}</span>
                                <div className='flex gap-4'>
                                    <button onClick={() => navigate("/edit")} className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base'>edit profile</button>
                                    <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base'>view archieve</button>
                                </div>
                                <button onClick={() => {
                                    localStorage.removeItem("info")
                                    dispatch(setAuthenticated(false))
                                }} className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base w-full md:w-fit'>Logout</button>


                            </div>
                            <div className='md:flex hidden flex-col'>
                                <div className='flex md:justify-start   md:w-full justify-between items-center md:px-6 pb-4 md:gap-6 gap-2'>
                                    <span className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{profile?.posts?.length}</p>
                                        <p>posts</p>
                                    </span>
                                    <span className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{profile?.followers?.length}</p>
                                        <p>Followers</p>
                                    </span>
                                    <span className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{profile?.following?.length}</p>
                                        <p>Followings</p>
                                    </span>
                                </div>
                                <div className='px-6'>
                                    <p className='font-bold text-xl'>{profile?.name}</p>
                                    <p>{profile?.bio}</p>
                                    {/* <p> Jay Shree Krishna❤️</p> */}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='md:hidden flex flex-col pt-2 pb-2 border-b-2 border-gray-900'>
                        <div className='flex md:justify-start   md:w-full justify-center items-center md:px-6 pb-4 md:gap-6 gap-2'>
                            <span className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{profile?.posts?.length}</p>
                                <p>posts</p>
                            </span>
                            <span className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{profile?.followers?.length}</p>
                                <p>Followers</p>
                            </span>
                            <span className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{profile?.following?.length}</p>
                                <p>Followings</p>
                            </span>
                        </div>
                        <div className='px-6'>
                            <p className='font-bold text-md'>{profile?.name}</p>
                            <p className='font-semibold text-[10px]'>{profile?.bio}</p>
                            {/* <p> Jay Shree Krishna❤️</p> */}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-5 text-center p-4 md:pb-10 pb-20 items-center'>
                        <div className=' gap-1 flex  items-center border-b-2 border-gray-600 border-dashed'>

                            <FcDataSheet className='md:text-4xl pb-2 text-2xl ' />
                            <p className='md:text-2xl pb-3 text-md '>posts</p>

                        </div>
                        <div className='flex gap-1 md:gap-4 w-[100%]  flex-wrap'>
                            {profile?.posts?.map((item, i) => (
                                <div onClick={() => {
                                    localStorage.setItem("postId", item?._id);
                                    dispatch(setPost(item?._id))
                                    navigate("/postSearch")
                                }} className='w-[32%]  flex flex-col md:max-h-[400px] md:min-h-[400px] max-h-[100px] min-h-[100px] relative group'>
                                    <DemoCard slides={item?.image} />
                                    {/* <img key={i} className='w-full max-h-[350px] min-h-[350px] object-cover' src={item?.image?.slice(0, 1)} alt="" /> */}
                                    <p className="absolute hidden md:group-hover:flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded">
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
