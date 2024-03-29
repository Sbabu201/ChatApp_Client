// import React from 'react'
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';
// const ButtomBar = () => {
//     const navigate = useNavigate()

//     return (
//         <div className='flex  fixed bottom-0  z-10 justify-evenly items-center text-white  border-gray-50  border-t bg-black shadow-md w-full h-10 '>
//             <HomeRoundedIcon onClick={() => navigate("/otp")} />
//             <AddBoxOutlinedIcon onClick={() => navigate("/otp")} />
//             <ChatBubbleOutlinedIcon onClick={() => navigate("/otp")} />
//             <AccountCircleIcon onClick={() => navigate("/otp")} />
//         </div>
//     )
// }

// export default ButtomBar
import { useEffect, useState } from 'react'
import { IoIosNotifications } from "react-icons/io";

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

const ButtomBar = () => {
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

            <div className='flex flex-row fixed bottom-0 cursor-pointer z-10 justify-evenly items-center text-white  border-gray-50  border-t bg-black shadow-md w-full h-16 '>
                <div className='flex  justify-between    w-full  '>
                    <div onClick={() => navigate("/")} className='flex gap-6 w-1/6 p-2 justify-center items-center  font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300 '>
                        <FcHome size={32} />

                    </div>

                    <div onClick={() => setNotify(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center '>
                        <FcLike size={32} />

                        <NotificationCard notify={notify} handleChange={handleChange} />
                    </div>
                    <div onClick={() => setSearchOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <FcSearch size={32} />

                        <SearchCard searchOpen={searchOpen} handleSearchOpen={handleSearchOpen} />
                    </div>
                    <div onClick={() => setOpen(state => !state)} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <FcPlus size={32} />

                    </div>
                    <div onClick={() => navigate("/chat")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <div className='flex'>
                            <FcSms size={32} />{messages?.length > 0 && <p className='bg-red-500 w-4 h-4 text-xs rounded-full items-center justify-center flex'>{messages?.length}</p>}

                        </div>


                    </div>


                    <div onClick={() => navigate("/profile")} className='flex gap-6 items-center font-bold shadow-md hover:bg-slate-600 rounded-sm  duration-300  w-1/6 justify-center'>
                        <FcBusinessman size={32} />

                    </div>
                </div>

            </div>
        </>
    )
}

export default ButtomBar
