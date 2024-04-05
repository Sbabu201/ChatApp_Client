import React, { useEffect, useState, useRef } from 'react'
import SideBar from './SideBar'
import ButtomBar from "./ButtomBar"
import { IoSendOutline } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from "../utils/Loader"
import { v4 as uuidv4 } from "uuid"
import { IoIosNotifications } from "react-icons/io";
import chatImage from "../assets/451.png"
import { FcAbout } from "react-icons/fc";
import { useSocket } from '../Pages/SocketProvider';
import { deleveArrivalMessage, getAllArrivalMessage } from '../store/reducers/socketReducer';
const backendUrl = process.env.BACKEND;

const Chatting = () => {
    const arrival = useSelector(state => state.socketReducer.arrivalMessage)
    const singleArrival = useSelector(state => state.socketReducer.singleMessage)
    const dispatch = useDispatch()
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const socket = useSocket();
    const scrollRef = useRef()
    const allUsers = useSelector(state => state.userReducer.users);
    const allUsersStatus = useSelector(state => state.userReducer.status);
    const [currentChatUser, setCurrentChatUser] = useState({});
    const [arrivalMssage, setArrivalMssage] = useState(null);
    const [AllArrivalMssage, setAllArrivalMssage] = useState([]);
    const [togle, setTogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allMessages, setAllMessages] = useState([]);
    console.log('allMessages', allMessages)
    const [message, setMessage] = useState("");

    const loggedUser = JSON.parse(localStorage.getItem("info"));
    let loggeduserDetails = allUsers.filter((item) => {
        return item._id === loggedUser?._id;
    })

    const getAllMessagesData = async () => {
        setLoading(true)
        const { data } = await axios.post(`https://chatapp-uqzh.onrender.com/message/allMessage`, {
            from: loggedUser?._id,
            to: currentChatUser?._id
        });
        setAllMessages(data?.projectMessages);
        setLoading(false)
    }
    const handleSendMEssage = async (e) => {
        e.preventDefault()
        const { data } = await axios.post(`https://chatapp-uqzh.onrender.com/message/addMessage`, {
            from: loggedUser?._id,
            to: currentChatUser?._id,
            message: message
        });
        setMessage("");
        socket.current.emit("send-msg", {
            from: loggedUser?._id,
            to: currentChatUser?._id,
            message: message
        })
        const msgs = [...allMessages];
        msgs.push({
            fromSelf: true,
            message: message
        })
        setAllMessages(msgs)

    }
    useEffect(() => {
        getAllMessagesData()
        // setAllArrivalMssage((prev) => {
        //     return prev?.filter((item) => {
        //         return item?.from !== currentChatUser?._id;
        //     })
        // })
        dispatch(deleveArrivalMessage(currentChatUser?._id))

    }, [currentChatUser])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("catch", (data) => {
                setArrivalMssage({ from: data.from, message: { fromSelf: false, message: data.message } })
            })
        }
    }, [socket.current])
    useEffect(() => {
        singleArrival && setAllMessages((prev) => [...prev, singleArrival]);

    }, [singleArrival])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [allMessages])


    if (loading) {
        return <Loader />
    }

    return (
        <>


            <div className=''>

                <div className='min-h-screen flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                    <div className='md:w-[20%]  w-0 h-full md:flex hidden  text-white '>
                        <SideBar />

                    </div>


                    <div className='md:w-[80%] w-full bg-black flex md:flex-row  flex-col-reverse text-white border-white h-screen'>

                        {/* <div className='overflow-x-auto border-b-2  w-full border-l-2 p-10 border-gray-700  flex md:hidden h-[7%] scrollbar-hide overflow-hidden gap-4 scroll-smooth'>
                            {loggeduserDetails[0]?.following?.map((following, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setCurrentChatUser(following);
                                        setTogle(true);
                                        setSelectedItemIndex(index); // Update the selected item index
                                    }}
                                    className={`flex  gap-8  duration-300 items-center bg-red-500 rounded-md hover:bg-gray-600 cursor-pointer ${selectedItemIndex === index ? 'bg-gray-800' : ''
                                        }`}
                                >
                                    <div className='w-full flex   flex-col items-center gap-2 '>
                                        <img src={following?.profilePic} className='object-cover rounded-full h-[30px] w-[30px]' />
                                        <span className='flex items-center gap-1 text-sm text-center'>
                                            {following?.name}

                                        </span>
                                    </div>
                                    {arrival?.filter((item) => {
                                        return item?.sender === following._id;
                                    }).length > 0 ?
                                        <span className='flex w-full justify-end  '><span className='text-red-800'><IoIosNotifications size={22} /></span><sub className='font-bold text-yellow-500 '>{
                                            arrival?.filter((item) => {
                                                return item?.sender === following._id;
                                            }).length}</sub></span>
                                        : ""
                                    }
                                </div>
                            ))}
                        </div> */}
                        {togle ?
                            <div className='md:w-[70%] w-full h-[90%]  md:h-screen '>
                                <div className='flex w-full gap-8 h-[9%] border-b-2 border-gray-800 overflow-hidden items-center cursor-pointer ' >
                                    <img src={currentChatUser?.profilePic} className='object-cover rounded-full h-[40px] w-[40px] ml-8 ' />
                                    <span className='flex items-center gap-1 text-center'>{currentChatUser?.name} <FcApproval size={22} /></span>
                                </div>
                                <div className='overflow-y-auto scrollbar-thumb-rounded-full   scrollbar-thumb-y-0 flex flex-col gap-2 md:h-[84%] h-[74%] scrollbar-hide overflow-hidden  scroll-smooth p-4 '>
                                    {allMessages?.map((msg, index) => (
                                        <div key={index} className=''>
                                            <span className={`flex  items-start ${msg?.fromSelf ? "justify-end " : "justify-start"} `}>
                                                <p className={` ${msg?.fromSelf ? "bg-blue-700 " : "bg-gray-700"} px-4 py-2 rounded-full`}>{msg?.message}</p>

                                            </span>

                                        </div>
                                    ))}
                                    <div ref={scrollRef} key={uuidv4()}></div>
                                </div>


                                <form onSubmit={handleSendMEssage} className='w-[100%] h-[7%] flex   shadow-lg border-2 rounded-full border-gray-700 '>
                                    <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='message' className='bg-transparent outline-none w-[90%] h-full px-8 ' />
                                    <button type="submit" className='w-[10%] p-2 flex justify-center items-center'><IoSendOutline size={32} /></button>
                                </form>

                            </div>
                            : <div className='w-[70%] md:h-screen h-[90%] flex flex-col items-center justify-center '>
                                <p className='text-3xl w-60 flex text-end items-end justify-end glow text-sky-200 '>Hello</p>
                                <img src={chatImage} className='w-[59%] h-[60%] animate-pulse ease-in-out duration-500 object-cover' alt="" />

                            </div>}

                        <div className='md:overflow-y-auto overflow-x-auto w-full  md:w-[30%] border-l-2 p-10 border-gray-700 md:min-h-screen h-[10%] flex flex-row   md:flex-col scrollbar-hide overflow-hidden md:gap-2 gap-4 scroll-smooth'>
                            {loggeduserDetails[0]?.following?.map((following, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setCurrentChatUser(following);
                                        setTogle(true);
                                        setSelectedItemIndex(index); // Update the selected item index
                                    }}
                                    className={`flex md:w-full w-1/6 gap-8 h-1/12 duration-300 items-center rounded-md hover:bg-gray-600 cursor-pointer ${selectedItemIndex === index ? 'bg-gray-800' : ''
                                        }`}
                                >
                                    <div className='w-full flex md:flex-row flex-col h-[60px] items-center gap-2 '>
                                        <img src={following?.profilePic} className='object-cover rounded-full md:h-[40px] md:w-[40px] h-[30px] w-[30px]' />
                                        <span className='flex items-center   gap-1 text-center'>
                                            {following?.name}
                                            <p className='md:block hidden'> <FcApproval size={22} /></p>

                                        </span>
                                    </div>
                                    {arrival?.filter((item) => {
                                        return item?.sender === following._id;
                                    }).length > 0 ?
                                        <span className='flex w-full justify-end  '><span className='text-red-800'><IoIosNotifications size={22} /></span><sub className='font-bold text-yellow-500 '>{
                                            arrival?.filter((item) => {
                                                return item?.sender === following._id;
                                            }).length}</sub></span>
                                        : ""
                                    }
                                </div>
                            ))}
                        </div>
                    </div>


                </div>


                <div className='flex md:hidden '>
                    <ButtomBar />
                </div>
            </div>

        </>
    )
}

export default Chatting

