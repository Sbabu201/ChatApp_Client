
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FcApproval } from "react-icons/fc";

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/reducers/postReducer';
import Loader from '../utils/Loader';
import HomePageLoader from '../utils/HomePageLoader';
import { setUser } from '../store/reducers/profileReducer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height: "70%",
    bgcolor: '#333333',
    borderRadius: '8px',

    // boxShadow: 24,
    p: 4,
};

export default function CreatePost({ open, handleOpen }) {
    const loggedUser = JSON.parse(localStorage.getItem("info"));

    const [loading, setLoading] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('info'));
    const dispatch = useDispatch()
    const [images, setImages] = React.useState([]);
    const handleClose = () => handleOpen();
    const [form, setForm] = React.useState({
        name: "",
        title: ""
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleFileUpload = async (e) => {


        const files = e.target.files;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
            formData.append("upload_preset", "soumya");

            try {
                // Upload image to Cloudinary
                setLoading(true)
                const res = await axios.post("https://api.cloudinary.com/v1_1/dwztqzfeh/image/upload", formData)
                // Add the uploaded image URL to the images array
                setImages(prevImages => [...prevImages, res.data.url]);
                setLoading(false)

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: form.name,
            title: form.title,
            image: images,
            user: user?._id,
        }
        // console.log('formData', formData)
        setLoading(true)
        dispatch(createPost(formData))
        setLoading(false)
        setForm({
            name: "",
            title: ""
        });
        setImages([]);

    }


    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {
                        loading ? <div className='flex w-full h-full justify-center items-center'>
                            <HomePageLoader />
                        </div> :
                            <form className='w-full h-full flex flex-col gap-4 text-white items-center ' onSubmit={handleSubmit}>
                                <span className='h-[5%] w-full flex justify-center text-white font-semibold items-center '>create post</span>
                                <div className='h-[95%] w-full flex '>
                                    <div className='md:w-2/3  w-full md:h-full h-1/2 '>
                                        {!images && <input
                                            type="file"
                                            accept="image/*"
                                            // name='click'
                                            multiple
                                            onChange={handleFileUpload}
                                            className='h-[10%]  w-full'
                                        />}

                                        <div className='w-full h-[95%] flex flex-row md:flex-col overflow-x-auto scroll-smooth scrollbar-hide'>
                                            {images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Uploaded ${index}`}
                                                    style={{ width: '90%', height: '90%', margin: '10px', objectFit: "cover" }}
                                                    className='rounded-md object-cover'
                                                />
                                            ))}
                                        </div>

                                    </div>
                                    <div className='flex  items-center flex-col justify-center md:h-full h-1/2 w-full md:w-1/3'>
                                        <div className='flex gap-4 h-[10%] w-full cursor-pointer items-center pb-4 mx-0 md:mx-8'>
                                            <img src={loggedUser?.profilePic} className='object-cover rounded-full md:h-[32px] md:min-w-[32px] h-[10px] min-w-[10px] ' />
                                            <span className='flex items-center font-semibold text-xs md:text-[16px] gap-1 text-center'>{loggedUser?.name} <FcApproval className='text-xs md:text-lg' /></span>

                                        </div>
                                        <div className='flex flex-col md:gap-4 gap-1 mx-0 md:mx-4 items-center justify-evenly  bg-white h-full md:h-1/2 w-full'>
                                            <div className='w-full  border-gray-400 border-2  h-10 px-4 md:mt-10 mt-0 '>
                                                <input type="text" value={form.name} name="name" onChange={handleChange} className=' outline-none h-full rounded-md w-full' placeholder='name' />
                                            </div>
                                            <div className='w-full  border-gray-400 border-2  h-10 px-4'>
                                                <input value={form.title} type="text" name="title" className=' outline-none h-full rounded-md w-full' placeholder='title' onChange={handleChange} />
                                            </div>
                                            <button className='w-1/2 bg-sky-500 py-2 md:py-3 rounded-md hover:bg-sky-900 text-white font-bold uppercase' type="submit">create</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                    }
                </Box>
            </Modal>
        </div>
    );
}
