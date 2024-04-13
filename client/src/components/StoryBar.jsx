import React, { useEffect, useState } from 'react'
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStory } from '../store/reducers/storyReducer';
import StoryCard from '../cards/StoryCard';
import StoryCarazoul from '../cards/StoryCarazoul';
import { IoAddCircleSharp } from "react-icons/io5";
const StoryBar = () => {
    const [story, setStory] = useState([])
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleStoryOpen = (data) => {
        setStory(data?.story)
        setOpen(state => !state)
    }
    const editStory = () => {
        setOpenEdit(state => !state)
    }
    const { profile } = useSelector(state => state.userReducer);
    console.log('profile?.story', profile?.story)
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === profile?.following?.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? profile?.following?.length - 1 : prevSlide - 1));
    };
    return (
        <>
            {story?.length > 0 && <StoryCard open={open} story={story} handleStoryOpen={handleStoryOpen} />}
            {openEdit && <StoryCarazoul openEdit={openEdit} editStory={editStory} />}
            <div className='bg-black border-b border-gray-900  h-[70px] w-full relative flex overflow-hidden overflow-x-auto '>
                {profile?.following?.length < 5 && <> <button onClick={prevSlide} className="absolute hidden md:flex p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white top-1/2 left-0 transform -translate-y-1/2   focus:outline-none">
                    <FcLeft className='text-xs md:text-lg' />
                </button>
                    <button onClick={nextSlide} className="absolute hidden md:flex top-1/2 right-0 transform -translate-y-1/2 p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white   focus:outline-none">
                        <FcRight className='text-xs md:text-lg' />
                    </button></>}


                <div onClick={editStory} className='min-w-[70px] ml-10 h-[70px] flex justify-center items-center'>
                    <IoAddCircleSharp className='text-white' size={32} />
                </div>
                {profile?.story?.length > 0 && <div onClick={() => { handleStoryOpen(profile) }} className='min-w-[70px] cursor-pointer h-[70px] flex justify-center items-center'>
                    <img className='w-16 h-16 object-cover rounded-full' src={profile?.profilePic} alt="" />

                </div>}
                {profile?.following?.map((item, index) => (
                    item?.story?.length > 0 && <div onClick={() => { handleStoryOpen(item) }} key={index} className='min-w-[70px] cursor-pointer h-[70px] flex justify-center items-center'>
                        <img className='w-16 h-16 object-cover rounded-full' src={item?.profilePic} alt="" />

                    </div>
                ))}
            </div></>
    )
}

export default StoryBar
