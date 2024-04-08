import React, { useEffect, useState } from 'react'
import { FcLike } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcShare } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { createLikes, deleteLike, getAllLikes } from '../store/reducers/likeReducer';
import { FcLikePlaceholder } from "react-icons/fc";
import Loader from '../utils/Loader';
import DemoCard from './demoCard';
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { BsChat } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { GrClose } from "react-icons/gr";
import { createComments, getAllComments } from '../store/reducers/commentReducer';
import HomePageLoader from '../utils/HomePageLoader';
import HomeImageSlide from '../slides/HomeImageSlide';
import PostImageSlide from '../slides/PostImageSlide';
import { setUser } from '../store/reducers/profileReducer';
import { useSocket } from '../Pages/SocketProvider';
const PostCard = ({ item }) => {
    // console.log('item', item)
    const socket = useSocket();

    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem("info"));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const likes = useSelector(state => state.likeReducer.likes);
    const comments = useSelector(state => state.commentReducer.comments);
    const status = useSelector(state => state.likeReducer.status);
    const likesForPost = likes?.filter(like => like.post._id === item?._id);
    const commentsForPost = comments?.filter(like => like.post._id === item?._id);
    const likedByuser = likes?.filter(like => like?.user?._id === user?._id && like?.post?._id === item?._id);


    const handleDislike = () => {
        const formData = {
            post: item?._id,
            user: user?._id
        }
        // console.log('formData', formData)
        dispatch(deleteLike(formData))

    }
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const handleSubmitComment = (e) => {
        e.preventDefault()
        const form = {
            user: user?._id,
            post: item?._id,
            comment: comment
        }

        dispatch(createComments(form))
        socket.current.emit("send-notify", {
            user: user?.name,
            owner: item?.user?._id,
            message: "commented on your photo"
        })
        setComment("")
    }
    const handleComment = () => {
        localStorage.setItem("postId", item?._id);
        setOpen(state => !state)
        // navigate("/postview");

    }
    const handlelike = () => {
        const formData = {
            post: item?._id,
            user: user?._id
        }
        // console.log('formData', formData)
        dispatch(createLikes(formData))
        socket.current.emit("send-notify", {
            user: user?.name,
            owner: item?.user?._id,
            message: "liked  your photo"
        })
    }
    useEffect(() => {
        dispatch(getAllLikes())
        dispatch(getAllComments())
    }, [dispatch])
    // console.log('likes', likes)
    return (
        <>
            {open && <div className='fixed flex  items-center justify-center z-50 text-white inset-0 bg-opacity-30  bg-black backdrop-blur-sm'>
                <div className='bg-transparent flex-col md:flex-row flex w-[85%] pt-10  h-screen shadow-2xl '>
                    <div className='w-full   h-[2%] mt-2 md:hidden flex items-end justify-end'>
                        <button onClick={handleComment}><GrClose className=' font-bold' /></button>
                    </div>
                    <div className='md:h-[95%] h-[40%] md:w-[60%] w-full'>
                        <PostImageSlide slides={item?.image} />
                    </div>
                    <div className='md:w-[40%] w-full px-8 pt-4 md:pt-0 bg-black text-white md:h-[83%] h-[60%] '>
                        <div className='w-full  hidden md:flex h-[2%] mt-2 items-end justify-end'>
                            <button onClick={handleComment}><GrClose className=' font-bold' /></button>
                        </div>
                        <div className='border-b-2 border-gray-700 my-2 h-[5%]'>
                            profile
                        </div>
                        <div className='flex flex-col md:h-[70%] h-[50%] scrollbar-hide  scroll-smooth  overflow-y-auto shadow-xl '>
                            {commentsForPost?.length === 0 ?
                                <p>
                                    no comments are there   ..........
                                </p>
                                :
                                <div className='flex text-xs md:text-lg py-2  flex-col gap-4 justify-center'>
                                    {commentsForPost?.map((com, i) => (

                                        <div className='flex md:gap-4 gap-1 w-full  items-center md:mx-8 mx-1 '>
                                            <div onClick={() => {
                                                localStorage.setItem("userId", item?.user?._id)
                                                dispatch(setUser(item?.user?._id))
                                                navigate("/userprofile")
                                            }} className='flex items-center md:gap-4 gap-1  cursor-pointer'>
                                                <img src={com?.user?.profilePic} className='object-cover rounded-full h-[20px] min-w-[20px] md:h-[30px] md:min-w-[30px]' />
                                                <span className='flex items-center gap-1 text-center'>{com?.user?.name} <FcApproval size={12} /></span>
                                            </div>
                                            <p className='px-2'>{com?.comment}</p>

                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='flex gap-2 h-[5%]   '>

                            {likedByuser?.length > 0 ? <FaHeart className=' cursor-pointer text-xl md:text-3xl text-red-600' onClick={handleDislike} /> :
                                <LuHeart className=' cursor-pointer text-xl md:text-3xl' onClick={handlelike} />}
                            <BsChat className=' cursor-pointer text-xl md:text-3xl' onClick={handleComment} />
                            <TbSend className=' cursor-pointer text-xl md:text-3xl' />
                        </div>
                        <span className='flex gap-2 h-[5%] mt-2 text-xs md:text-lg '>
                            {likesForPost?.length} likes
                        </span>
                        <form onSubmit={handleSubmitComment} className='md:h-[5%] h-[10%] border-t-2 pt-4 border-gray-700 flex justify-between items-center w-full'>
                            <input type="text" name="comment" value={comment} onChange={handleChange} placeholder='Add a comment......' className='w-2/3 h-10  bg-transparent outline-none ' />
                            <button type='submit' className='w-1/3' >post</button>
                        </form>
                    </div>
                </div>
            </div>}
            {
                (status === "loading") ? <HomePageLoader />
                    : <div className='md:w-4/6 lg:w-3/6  w-full p-4 flex-col  h-2/5 text-white flex border border-gray-800 justify-start scrollbar-hide  scroll-smooth'>
                        <div onClick={() => {
                            localStorage.setItem("userId", item?.user?._id)
                            dispatch(setUser(item?.user?._id))
                            navigate("/userprofile")
                        }} className='flex gap-4 h-[10%] cursor-pointer items-center pb-4 mx-0 md:mx-8'>
                            <img src={item?.user?.profilePic} className='object-cover rounded-full md:h-[40px] md:w-[40px] h-[25px] w-[25px] ' />
                            <span className='flex items-center text-xs md:text-lg gap-1 text-center'>{item?.user?.name} <FcApproval className='text-xs md:text-lg' /></span>

                        </div>

                        <HomeImageSlide slides={item?.image} />
                        <div className='flex gap-2 h-[5%] pt-3 md:mx-0 mx-2'>
                            {likedByuser?.length > 0 ? <FaHeart className=' cursor-pointer text-xl md:text-3xl text-red-600' onClick={handleDislike} /> :
                                <LuHeart className=' cursor-pointer text-xl md:text-3xl' onClick={handlelike} />}
                            <BsChat className=' cursor-pointer text-xl md:text-3xl' onClick={handleComment} />
                            <TbSend className=' cursor-pointer text-xl md:text-3xl' />
                        </div>
                        <p className='h-[5%] flex gap-2 mx-2 text-xs  md:text-sm pt-2 md:mx-0'> {likesForPost?.length} likes</p>
                        <span className='flex gap-2 h-[10%] text-[13px]  md:text-base mx-2 pt-2 md:mx-0'>
                            {item?.title}
                        </span>

                    </div>
            }
        </>
    )
}

export default PostCard
