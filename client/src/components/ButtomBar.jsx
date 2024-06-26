
import { useEffect, useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import msg from "../assets/msg.webp"
import { IoHomeSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { FiPlusCircle } from "react-icons/fi";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import NotificationCard from '../cards/NotificationCard';
import SearchCard from '../cards/SearchCard';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../Pages/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { TbMessageCircle2 } from "react-icons/tb";

import { io } from "socket.io-client";
import { getAllArrivalMessage, setSocket } from '../store/reducers/socketReducer';
import notificationsound from "../assets/itune.mp3"
import toast from 'react-hot-toast';
import { useSocket } from '../Pages/SocketProvider';
import { getAllPosts } from '../store/reducers/postReducer';

const ButtomBar = () => {
    const messages = useSelector(state => state.socketReducer.arrivalMessage);
    const loggedUser = useSelector(state => state.userReducer.profile);
    const dispatch = useDispatch();
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



            <div className='flex flex-row fixed bottom-0 cursor-pointer z-10 justify-evenly items-center text-white  border-gray-50  border-t bg-black shadow-md w-full h-16 '>
                <div className='flex  justify-between    w-full  '>
                    <div onClick={() => navigate("/")} className='flex  w-1/6 p-2 justify-center items-center  font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 '>
                        <IoHomeOutline size={26} />

                    </div>
                    <div onClick={() => setNotify(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/12 justify-center '>
                        <FaRegHeart size={32} />
                        {notify && <NotificationCard notify={notify} handleChange={handleChange} />}
                    </div>




                    <div onClick={() => setSearchOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <FaSearch size={24} />

                        <SearchCard searchOpen={searchOpen} handleSearchOpen={handleSearchOpen} />
                    </div>
                    <div onClick={() => setOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <FiPlusCircle size={28} />

                    </div>
                    <div onClick={() => navigate("/chat")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        {/* <div className='flex'>
                            <FcSms size={32} />{messages?.length > 0 && <p className='bg-red-500 w-4 h-4 text-xs rounded-full items-center justify-center flex'>{messages?.length}</p>}

                        </div> */}
                        <div className='flex relative'>
                            <TbMessageCircle2 size={32} />
                            {messages?.length > 0 && <p className='bg-red-500 absolute  right-[-5px] w-5 h-5 font-normal text-[12px] rounded-full items-center justify-center flex'>{messages?.length}</p>}

                        </div>

                    </div>


                    <div onClick={() => navigate("/profile")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <img src={loggedUser?.profilePic} className='w-8 h-8 object-cover rounded-full' alt="" />

                    </div>
                </div>

            </div >
        </>
    )
}

export default ButtomBar
