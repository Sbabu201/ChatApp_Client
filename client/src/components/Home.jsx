import React, { useEffect, useState } from 'react'
import ButtomBar from './ButtomBar'
import SideBar from './SideBar'
import login from "../assets/msg.png"
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/reducers/postReducer'
import { useLocation } from 'react-router-dom';
import allPostsCard from '../cards/allPostsCard'
import PostCard from '../cards/PostCard'
import Loader from '../utils/Loader'
import { URL } from '../utils/serverurl'
import NavBar from './NavBar'
const Home = () => {
    const history = useLocation();
    const posts = useSelector(state => state.postReducer);
    const [shuffledPost, setShuffledPost] = useState(null);
    // console.log('shuffledPost', shuffledPost)
    const shuffleArray = (array) => {
        const shuffledArray = [...array]; // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    useEffect(() => {
        if (posts.status === "succeeded" && posts.posts) {
            // console.log('posts', posts)
            const data = shuffleArray(posts?.posts);
            setShuffledPost(data)
        }
    }, [posts, history])

    if (posts?.status === "loading") return <Loader />
    return (
        <>


            <div className='min-h-screen flex h-full w-full bg-black '>
                <div className='md:w-[20%]  h-full md:flex hidden text-white '>
                    <SideBar />

                </div>
                <div className='md:w-[80%] w-full bg-black duration-300   h-full '>
                    <div className='md:w-[20%]  h-full flex md:hidden text-white '>
                        <NavBar />

                    </div>
                    {/* {(posts?.status === "loading") ? <Loader /> */}
                    <div className='md:m-2 m-0 w-full pb-20   h-full justify-start duration-300 overflow-y-auto items-center gap-4 flex flex-col border-b-2'>
                        {
                            shuffledPost?.map((item, i) => (
                                <PostCard key={i} item={item} />

                            ))
                        }
                    </div>
                </div >

            </div >
            <div className='flex md:hidden '>
                <ButtomBar />
            </div>


        </>
    )
}

export default Home
