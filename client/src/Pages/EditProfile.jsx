import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../components/SideBar'
import ButtomBar from '../components/ButtomBar'
import Facebook from '../assets/facebook.png'
import { FcSettings } from "react-icons/fc";
import { FcDataSheet } from "react-icons/fc";
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import toast from 'react-hot-toast';
import DemoCard from '../cards/demoCard';
import ProfilePageLoader from '../utils/ProfilePageLoader';
import { URL } from '../utils/serverurl';
import { setAuthenticated, setPost } from '../store/reducers/profileReducer';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {
    const [images, setImages] = useState(null);
    const inputFileRef = useRef(null);
    console.log('images', images)
    const handleButtonClick = () => {
        inputFileRef.current.click();
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false)
    const [bio, setBio] = useState("");
    const handleChange = async (e) => {
        // Trigger click event on the input element
        const files = e.target.files[0];
        console.log('files', files)

        const formData = new FormData();

        formData.append('file', files);
        formData.append("upload_preset", "soumya");

        try {
            // Upload image to Cloudinary
            setLoading(true)
            const res = await axios.post("https://api.cloudinary.com/v1_1/dwztqzfeh/image/upload", formData)
            console.log('res', res)
            // Add the uploaded image URL to the images array
            setImages([res.data.url]);
            setLoading(false)


        } catch (error) {
            console.error('Error uploading image:', error);
            alert("hi")
        }


    };

    const getUserData = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("info"))
        try {

            const { data } = await axios.get(`${URL}/user/details/${user?._id}`);
            // console.log('data', data.existUser)
            setProfile(data?.existUser)
            setBio(data?.existUser?.bio)
        } catch (error) {
            console.log('error', error)
            toast.error(error.message)
        }
        setLoading(false)
    }
    const handleFormSubmit = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("info"))
        try {

            const { data } = await axios.put(`${URL}/user/editProfile/${user?._id}`, {
                profilePic: images[0],
                bio: bio
            });
            console.log('data', data)
            toast.success(data.message)
            localStorage.setItem("info", JSON.stringify(data?.updateUser))
            setProfile(data?.updateUser)
            setBio(data?.updateUser?.bio)
            setImages(null)
        } catch (error) {
            console.log('error', error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUserData();
    }, [])

    if (loading) { < ProfilePageLoader /> }
    return (
        <>
            <div className='min-h-screen text-white flex h-full w-full scrollbar-hide overflow-hidden  scroll-smooth'>
                <div className='md:w-[20%]  w-0 h-full md:visible invisible   '>
                    <SideBar />


                </div>










                <div className='md:w-[80%] w-full bg-black flex justify-center items-center    border-white min-h-screen'>
                    <div className='md:w-[70%] w-[90%]  h-[60%] border border-gray-800'>
                        <div className='w-full h-20 flex items-center justify-center '>
                            <span className='font-bold text-xl '>Edit profile</span>
                        </div>
                        <div className='w-full md:h-20 h-12 flex items-center justify-center '>
                            <div className='md:w-[80%] w-full flex rounded-full bg-gray-800 md:h-20 h-12 '>
                                <div className='md:w-[10%] w-[30%] h-full flex justify-center items-center '>
                                    <img src={images !== null ? images : profile?.profilePic} className='md:w-16 w-10 h-10 md:h-16 rounded-full object-cover' alt="" />
                                </div>
                                <div className='md:w-[50%] w-[30%] h-full flex flex-col gap-1 md:pl-4 pl-2 justify-center  '>
                                    <span className='font-bold text-sm md:text-lg'>{profile.name}</span>
                                    <span className='md:textbase text-xs font-semibold'>{profile.name}</span>
                                </div>
                                <div className='flex w-[40%] h-full items-center justify-center'>
                                    <input


                                        type="file"
                                        ref={inputFileRef}
                                        // name='click'
                                        multiple
                                        onChange={handleChange}
                                        className='h-[10%] hidden justify-center items-center   w-[50%]'

                                    />
                                    <button disabled={loading} onClick={handleButtonClick} className='md:w-[65%] w-[90%] h-1/2  rounded-md text-xs md:text-base font-semibold hover:bg-blue-700 bg-blue-500'>change Photo</button>

                                </div>
                            </div>
                        </div>
                        <div className='w-full h-20 flex items-center justify-center md:justify-start md:px-40 '>
                            <span className='font-bold text-lg '>Bio</span>
                        </div>
                        <div className='w-full md:h-20 h-12 flex items-center justify-center '>
                            <div className='md:w-[80%] w-full flex border-2 border-gray-600  md:h-20 h-12 '>
                                <input type="text" name='bio' className='bg-transparent px-4 w-full h-full outline-none' placeholder='bio' value={bio} onChange={(e) => setBio(e.target.value)} />

                            </div>
                        </div>
                        <div className='w-full md:h-20 h-12 pt-4 flex items-center justify-center '>
                            <div className='md:w-[80%] w-full flex justify-end items-center   md:h-20 h-12 '>
                                <button disabled={loading} onClick={handleFormSubmit} className='w-[30%] md:w-[20%] h-[70%] bg-sky-500 rounded-md text-xs md:text-base font-semibold md:font-bold ' >Submit</button>

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

export default EditProfile
