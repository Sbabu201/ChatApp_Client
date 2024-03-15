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
import { useNavigate } from 'react-router-dom';
import PostView from '../components/PostView';
import { GrClose } from "react-icons/gr";
import { createComments, getAllComments } from '../store/reducers/commentReducer';
import HomePageLoader from '../utils/HomePageLoader';
import HomeImageSlide from '../slides/HomeImageSlide';
import PostImageSlide from '../slides/PostImageSlide';
const PostCard = ({ item }) => {
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem("info"));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const likes = useSelector(state => state.likeReducer.likes);
    const comments = useSelector(state => state.commentReducer.comments);
    console.log('comments', comments)
    const status = useSelector(state => state.likeReducer.status);
    console.log('item', item)
    const likesForPost = likes?.filter(like => like.post === item?._id);
    const commentsForPost = comments?.filter(like => like.post === item?._id);
    const likedByuser = likes?.filter(like => like.user._id === user?._id && like.post === item?._id);
    console.log('commentsForPost', commentsForPost)

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
        console.log('formData', formData)
        dispatch(createLikes(formData))

    }
    useEffect(() => {
        dispatch(getAllLikes())
        dispatch(getAllComments())
    }, [dispatch])
    // console.log('likes', likes)
    return (
        <>
            {open && <div className='fixed flex items-center justify-center z-50 text-white inset-0 bg-opacity-30  bg-black backdrop-blur-sm'>
                <div className='bg-transparent flex w-[85%] pt-10 h-screen shadow-2xl '>
                    <div className='h-[95%] w-[60%]'>
                        <PostImageSlide slides={item?.image} />
                    </div>
                    <div className='w-[40%] px-8  bg-black text-white h-[90vh]  '>
                        <div className='w-full flex h-[2%] mt-2 items-end justify-end'>
                            <button onClick={handleComment}><GrClose className=' font-bold' /></button>
                        </div>
                        <div className='border-b-2 border-gray-700 my-2 h-[5%]'>
                            profile
                        </div>
                        <div className='flex flex-col h-[70%] scrollbar-hide  scroll-smooth  overflow-y-auto shadow-xl '>
                            {commentsForPost?.length === 0 ?
                                <p>
                                    no comments are there   ..........
                                </p>
                                :
                                <div className='flex flex-col gap-4 justify-center'>
                                    {commentsForPost?.map((com, i) => (

                                        <div className='flex gap-4  items-center mx-8  '>
                                            <img src={com?.user?.profilePic} className='object-cover rounded-full h-[20px] min-w-[20px] ' />
                                            <span className='flex items-center gap-1 text-center'>{com?.user?.name} <FcApproval size={12} /></span>
                                            <p>{com?.comment}</p>

                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='flex gap-2 h-[5%]  '>

                            {likedByuser?.length > 0 ? <FcLike size={32} onClick={handleDislike} /> :
                                <FcLikePlaceholder size={32} onClick={handlelike} />}
                            <FcComments onClick={handleComment} size={32} />
                            <FcShare size={32} />
                        </div>
                        <span className='flex gap-2 h-[5%]  '>
                            {likesForPost?.length} likes
                        </span>
                        <div className='h-[5%] border-t-2 border-gray-700 flex justify-between items-center w-full'>
                            <input type="text" name="comment" value={comment} onChange={handleChange} placeholder='Add a comment......' className='w-2/3 h-10  bg-transparent outline-none ' />
                            <button className='w-1/3' onClick={handleSubmitComment}>post</button>
                        </div>
                    </div>
                </div>
            </div>}
            {
                (status === "loading") ? <HomePageLoader />
                    : <div className='md:w-3/6  w-full p-4 flex-col  h-2/5 text-white flex border justify-start scrollbar-hide  scroll-smooth'>
                        <div className='flex gap-4 h-[10%] items-center mx-8'>
                            <img src={item?.user?.profilePic} className='object-cover rounded-full h-[60px] min-w-[60px] ' />
                            <span className='flex items-center gap-1 text-center'>{item?.user?.name} <FcApproval size={22} /></span>

                        </div>

                        <HomeImageSlide slides={item?.image} />
                        <div className='flex gap-2 h-[5%]   mx-8'>
                            {likedByuser?.length > 0 ? <FcLike size={32} className=' cursor-pointer' onClick={handleDislike} /> :
                                <FcLikePlaceholder className=' cursor-pointer' size={32} onClick={handlelike} />}
                            <FcComments className=' cursor-pointer' onClick={handleComment} size={32} />
                            <FcShare className=' cursor-pointer' size={32} />
                        </div>
                        <p className='h-[5%] flex gap-2  pt-2 mx-8'> {likesForPost?.length} likes</p>
                        <div className='flex gap-2 h-[10%] pt-2 mx-8'>
                            {item?.title}
                        </div>

                    </div>
            }
        </>
    )
}

export default PostCard
