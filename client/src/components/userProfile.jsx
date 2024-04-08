// import React, { useEffect, useState } from 'react'
// import SideBar from '../components/SideBar'
// import ButtomBar from '../components/ButtomBar'
// import Facebook from '../assets/facebook.png'
// import Loader from "../utils/Loader";
// import { FcSettings } from "react-icons/fc";
// import { FcDataSheet } from "react-icons/fc";
// import { FcApproval } from "react-icons/fc";

// import axios from 'axios';
// import { FcLike } from "react-icons/fc";
// import { FcComments } from "react-icons/fc";
// import toast from 'react-hot-toast';
// import DemoCard from '../cards/demoCard';
// import { getAllUsers } from '../store/reducers/userReducer';
// import { useDispatch, useSelector } from 'react-redux';
// import ProfilePageLoader from '../utils/ProfilePageLoader';
// import { URL } from '../utils/serverurl';
// const UserProfile = () => {
// const dispatch = useDispatch()
// let userId = useSelector(state => state.profileReducer.userId) || localStorage.getItem("userId");
// const loggedUser = JSON.parse(localStorage.getItem("info"));
// const users = useSelector(state => state.userReducer.users);
// let existUser = users.filter((item) => {
//     return item._id === userId;
// })
// let loggeduserDetails = users.filter((item) => {
//     return item._id === loggedUser?._id;
// })
// // console.log('loggeduserDetails', loggeduserDetails)
// useEffect(() => {
//     dispatch(getAllUsers())
//     existUser = users.filter((item) => {
//         return item._id === userId;
//     })
// }, [userId])

// if (existUser.length === 0) {
//     return <ProfilePageLoader />
// }
// const checkIdExists = (array, id) => {
//     return array.some(item => item._id === id);
// };
// const idExists = checkIdExists(loggeduserDetails[0]?.following, userId);

// // console.log('idExists', idExists)
// const handleFollowing = async () => {
//     try {
//         if (loggedUser._id === existUser[0]._id) {
//             toast.error("you cant follow yourself")
//             return
//         }
//         const form = {
//             user: loggedUser._id,
//             follower: existUser[0]._id
//         }

//         // idExists ? alert("hey") : alert("hello");
//         const { data } = !idExists ? await axios.put(`${URL}/user/addfollow`, form) : await axios.put(`${URL}/user/removefollow`, form);
//         console.log('data', data)
//         if (data.success) {
//             toast.success(data.message);
//             dispatch(getAllUsers());
//         }
//     } catch (error) {
//         toast.error(error.message)
//     }

// }
//     return (
//         <>
//             <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
//                 <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
//                     <SideBar />

//                 </div>
//                 <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
//                     <div className='w-full max-h-[44%] md:p-10 flex flex-col md:flex-row border-b-2 border-gray-900 '>
//                         <div className='md:w-1/3 w-full h-full flex justify-center items-center '>
//                             <img src={existUser[0]?.profilePic} className='w-60 h-60 rounded-full object-cover' alt="" />
//                         </div>
//                         <div className='md:w-2/3 w-full h-full md:gap-0 gap-4 flex flex-col text-white '>
//                             <div className='p-6 font-bold text-sm w-full md:text-balance text-small items-center md:justify-start justify-between flex gap-4'>
//                                 <span className='flex justify-center items-center gap-2 text-xl'>{existUser[0]?.name}<FcApproval size={22} /></span>
//                                 <button onClick={handleFollowing} className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>{!idExists ? "follow" : "following"}</button>
//                                 <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>message</button>
//                                 <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md'>add tool</button>
//                                 <FcSettings className=' cursor-pointer' size={32} />

//                             </div>
//                             <div className='flex md:justify-start w-full justify-between md:px-6 pb-4 md:gap-10 gap-2'>
//                                 <span className='flex gap-2 '>
//                                     <p>{existUser[0]?.posts?.length}</p>
//                                     <p>posts</p>
//                                 </span>
//                                 <span className='flex gap-2 '>
//                                     <p>{existUser[0]?.followers?.length}</p>
//                                     <p>Followers</p>
//                                 </span>
//                                 <span className='flex gap-2 '>
//                                     <p>{existUser[0]?.following?.length}</p>
//                                     <p>Followings</p>
//                                 </span>
//                             </div>
//                             <div className='px-6'>
//                                 <p className='font-bold text-xl'>{existUser[0]?.name}</p>
//                                 <p>{existUser[0]?.bio}</p>
//                                 {/* <p> Jay Shree Krishna❤️</p> */}
//                             </div>
//                             <div>

//                             </div>
//                         </div>
//                     </div>
//                     <div className='flex flex-col justify-center gap-5 text-center p-4 items-center'>
//                         <div className=' gap-1 flex  items-center border-b-2 border-gray-600 border-dashed'>

//                             <FcDataSheet size={22} />
//                             <p className='text-2xl pb-2  '>posts</p>

//                         </div>
//                         <div className='flex gap-4 w-[90%]  flex-wrap'>
//                             {existUser[0]?.posts?.map((item, i) => (
//                                 <div className='md:w-[31%] w-full flex flex-col max-h-[400px] min-h-[400px] relative group'>
//                                     <DemoCard slides={item?.image} />
//                                     {/* <img key={i} className='w-full max-h-[350px] min-h-[350px] object-cover' src={item?.image?.slice(0, 1)} alt="" /> */}
//                                     <p className="absolute hidden group-hover:flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded">
//                                         <FcLike size={24} />{item?.likes?.length}
//                                         <FcComments size={24} />{item?.comments?.length}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className='visible md:invisible '>
//                 <ButtomBar />
//             </div>
//         </>
//     )
// }

// export default UserProfile
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
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import FollowersPage from './../Pages/FollowersPage';
import FollowingPage from './../Pages/FollowingPage';
import { getAllUsers, getProfile } from '../store/reducers/userReducer';
const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profile = useSelector(state => state.userReducer.profile);
    // const loading = useSelector(state => state.userReducer.status2);
    const [openFollower, setOpenFollower] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);

    const handleFollowers = () => {
        setOpenFollower(state => !state)
    }

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
    const handleFollowing2 = async () => {
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

    const handleFollowing = () => {
        setOpenFollowing(state => !state)
    }

    // console.log('loggedUser[0]', loggedUser[0])
    // if (loading === "loading") { return <UserProfileLoader /> }
    return (
        <>
            {openFollower && <FollowersPage openFollower={openFollower} profile={existUser[0]} handleFollowers={handleFollowers} />}
            {openFollowing && <FollowingPage openFollowing={openFollowing} profile={existUser[0]} handleFollowing={handleFollowing} />}
            <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black  border-white min-h-screen'>
                    <div className='w-full md:max-h-[44%]  md:p-10 flex flex-row border-b-2 border-gray-900 '>
                        <div className='w-1/2 md:w-1/3 h-40 md:h-60  flex justify-center  items-center '>
                            <img src={existUser[0]?.profilePic} className='md:w-60 w-28 h-28 md:h-60 rounded-full object-cover' alt="" />
                        </div>
                        <div className='md:w-2/3 w-1/2 h-full md:gap-0 gap-4 flex flex-col  text-white '>
                            <div className='p-6 font-bold text-sm w-full md:text-balance flex-col md:flex-row   items-center md:justify-start justify-between flex gap-4'>
                                <span className='text-md md:text-xl'>{existUser[0]?.name}</span>
                                <div className='flex gap-4'>
                                    <button onClick={handleFollowing2} className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base'>{!idExists ? "follow" : "following"}</button>
                                    <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base'>message</button>
                                </div>
                                <button className='bg-gray-700 hover:bg-gray-900 py-1 px-2 rounded-md text-xs md:text-base w-full md:w-fit'>Archieve</button>


                            </div>
                            <div className='md:flex hidden flex-col'>
                                <div className='flex md:justify-start   md:w-full justify-between items-center md:px-6 pb-4 md:gap-6 gap-2'>
                                    <span className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{existUser[0]?.posts?.length}</p>
                                        <p>posts</p>
                                    </span>
                                    <span onClick={() => setOpenFollower(state => !state)} className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{existUser[0]?.followers?.length}</p>
                                        <p>Followers</p>
                                    </span>
                                    <span onClick={() => {
                                        console.log("hello")
                                        setOpenFollowing(state => !state)
                                    }} className='flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                        <p>{existUser[0]?.following?.length}</p>
                                        <p>Followings</p>
                                    </span>
                                </div>
                                <div className='px-6'>
                                    <p className='font-bold text-xl'>{existUser[0]?.name}</p>
                                    <p>{existUser[0]?.bio}</p>
                                    {/* <p> Jay Shree Krishna❤️</p> */}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='md:hidden flex flex-col pt-2 pb-2 border-b-2 border-gray-900'>
                        <div className='flex md:justify-start   md:w-full justify-center items-center md:px-6 pb-4 md:gap-6 gap-2'>
                            <span className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{existUser[0]?.posts?.length}</p>
                                <p>posts</p>
                            </span>
                            <span onClick={() => setOpenFollower(state => !state)} className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{existUser[0]?.followers?.length}</p>
                                <p>Followers</p>
                            </span>
                            <span onClick={() => {
                                console.log("hello")
                                setOpenFollowing(state => !state)
                            }} className='flex md:flex-row flex-col w-1/3 items-center cursor-pointer md:gap-2 gap-1 text-xs md:text-base '>
                                <p>{existUser[0]?.following?.length}</p>
                                <p>Followings</p>
                            </span>
                        </div>
                        <div className='px-6'>
                            <p className='font-bold text-md'>{existUser[0]?.name}</p>
                            <p className='font-semibold text-[10px]'>{existUser[0]?.bio}</p>
                            {/* <p> Jay Shree Krishna❤️</p> */}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-5 text-center p-4 md:pb-10 pb-20 items-center'>
                        <div className=' gap-1 flex  items-center border-b-2 border-gray-600 border-dashed'>

                            <FcDataSheet className='md:text-4xl pb-2 text-2xl ' />
                            <p className='md:text-2xl pb-3 text-md '>posts</p>

                        </div>
                        <div className='flex gap-1 md:gap-4 w-[100%]  flex-wrap'>
                            {existUser[0]?.posts?.map((item, i) => (
                                <div key={i} onClick={() => {
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

export default UserProfile
