import React, { useEffect, useState } from 'react'
import ButtomBar from '../components/ButtomBar'
import SideBar from '../components/SideBar'
import login from "../assets/msg.png"
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/reducers/postReducer'
import { FcLike } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcShare } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import { FcLikePlaceholder } from "react-icons/fc";

import allPostsCard from '../cards/allPostsCard'
import PostCard from '../cards/PostCard'
import Loader from '../utils/Loader'
import axios from 'axios'
import { createLikes, deleteLike, getAllLikes } from '../store/reducers/likeReducer'
import { getAllComments } from '../store/reducers/commentReducer'
import PostImageSlide from '../slides/PostImageSlide'
const SearchPostView = () => {
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem("info"));
    const postId = localStorage.getItem("postId");
    const [post, setPost] = useState({})
    const likes = useSelector(state => state.likeReducer.likes);
    const comments = useSelector(state => state.commentReducer.comments);
    const status = useSelector(state => state.likeReducer.status);
    const likesForPost = likes?.filter(like => like.post._id === post?._id);
    const commentsForPost = comments?.filter(like => like.post._id === post?._id);
    const likedByuser = likes?.filter(like => like.user._id === user?._id && like.post._id === post?._id);
    const getPostDetails = async () => {
        try {
            const { data } = await axios.get(`/post/post/${postId}`);
            setPost(data?.existUser)
            console.log('data', data)
        } catch (error) {

        }
    }



    const posts = useSelector(state => state.postReducer);

    const handleSubmitComment = (e) => {
        e.preventDefault()
        const form = {
            user: user?._id,
            post: post?._id,
            comment: comment
        }
    }
    const handlelike = () => {
        const formData = {
            post: post?._id,
            user: user?._id
        }
        // console.log('formData', formData)
        dispatch(createLikes(formData))

    }
    const handleDislike = () => {
        const formData = {
            post: post?._id,
            user: user?._id
        }
        // console.log('formData', formData)
        dispatch(deleteLike(formData))

    }
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const handleComment = () => {
        localStorage.setItem("postId", post?._id);
        setOpen(state => !state)
        // navigate("/postview");

    }
    useEffect(() => {
        dispatch(getAllLikes())
        dispatch(getAllComments())
        getPostDetails()
    }, [dispatch])

    if (posts?.status === "loading") return <Loader />
    return (
        <>


            <div className='h-screen flex w-full bg-black '>
                <div className='md:w-[20%]   h-full md:flex flex-none  text-white '>
                    <SideBar />

                </div>
                <div className='fixed flex  items-center justify-center w-full text-white  bg-opacity-30   backdrop-blur-sm'>
                    <div className='bg-transparent flex w-full  pt-10 h-screen shadow-2xl '>
                        <div className='h-[95%] w-[60%]'>
                            <PostImageSlide slides={post?.image} />
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
                </div>

            </div>
            <div className='visible md:invisible '>
                <ButtomBar />
            </div>


        </>
    )
}

export default SearchPostView
