import { useEffect, useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import msg from "../assets/msg.webp"
import { FcHome } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcSms } from "react-icons/fc";
import NotificationCard from '../cards/NotificationCard';
import SearchCard from '../cards/SearchCard';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../Pages/CreatePost';
import { getAllUsers } from '../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { getAllArrivalMessage, setSocket } from '../store/reducers/socketReducer';
import notificationsound from "../assets/itune.mp3"
import toast from 'react-hot-toast';
import { useSocket } from '../Pages/SocketProvider';
import { getAllPosts } from '../store/reducers/postReducer';

const SideBar = () => {
    const messages = useSelector(state => state.socketReducer.arrivalMessage);
    const dispatch = useDispatch();
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    const socket = useSocket();

    const navigate = useNavigate()
    const [notify, setNotify] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const handleChange = () => {
        setNotify(state => !state)
    }
    const handleOpen = () => {
        setOpen(state => !state)
    }
    const handleSearchOpen = () => {
        setSearchOpen(state => !state)
    }

    useEffect(() => {
        dispatch(getAllArrivalMessage({ to: loggedUser?._id }))
    }, [])
    return (
        <>
            {open && <CreatePost open={open} handleOpen={handleOpen} />
            }

            <div className='w-[20%] fixed z-10  text-lg cursor-pointer  font-maison  bg-black border-r-2 border-gray-600 flex flex-col justify-start items-start md:p-10 gap-10 text-white  min-h-screen'>

                <span className=' font-extrabold  px-4  '>
                    SOUMYAGRAM
                </span>

                <div className='flex w-full items-center  h-full'>
                    <div className='flex gap-10  flex-col   w-full min-h-screen'>
                        <div onClick={() => navigate("/")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1'>
                            <FcHome size={32} />
                            <p>Home</p>
                        </div>

                        <div onClick={() => setNotify(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1 '>
                            <FcLike size={32} />
                            <p>Notifications</p>
                            <NotificationCard notify={notify} handleChange={handleChange} />
                        </div>
                        <div onClick={() => setSearchOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1'>
                            <FcSearch size={32} />
                            <p>Search</p>
                            <SearchCard searchOpen={searchOpen} handleSearchOpen={handleSearchOpen} />
                        </div>
                        <div onClick={() => setOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1'>
                            <FcPlus size={32} />
                            <p>Create</p>
                        </div>
                        <div onClick={() => navigate("/chat")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1'>
                            <div className='flex relative'>
                                <img src={msg} className='w-8 h-8 object-cover rounded-full' alt="" />
                                {messages?.length > 0 && <p className='bg-red-500 absolute  right-[-5px] w-5 h-5 font-normal text-[12px] rounded-full items-center justify-center flex'>{messages?.length}</p>}

                            </div>
                            <p>Chat</p>

                        </div>


                        <div onClick={() => navigate("/profile")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 p-1'>
                            <img src={loggedUser?.profilePic} className='w-8 h-8 object-cover rounded-full' alt="" />
                            <p>Profile</p>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default SideBar
