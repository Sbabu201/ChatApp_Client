
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
import { TbMessageCircle2 } from "react-icons/tb";

import SearchCard from '../cards/SearchCard';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../Pages/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { getAllArrivalMessage, setSocket } from '../store/reducers/socketReducer';
import notificationsound from "../assets/itune.mp3"
import toast from 'react-hot-toast';
import { useSocket } from '../Pages/SocketProvider';
import { getAllPosts } from '../store/reducers/postReducer';

const NavBar = () => {
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


            <div className='flex flex-row fixed top-0 cursor-pointer z-10 justify-evenly items-center text-white   bg-black shadow-md w-full h-16 '>
                <div className='flex  justify-end    w-full  '>


                    <div onClick={() => setNotify(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/12 justify-center '>
                        <FcLike size={32} />

                        {notify && <NotificationCard notify={notify} handleChange={handleChange} />}
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



                </div>

            </div>
        </>
    )
}

export default NavBar
