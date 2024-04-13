
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FcApproval } from "react-icons/fc";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/reducers/postReducer';
import { createStory } from '../store/reducers/storyReducer';
import { IoAddCircleSharp } from "react-icons/io5";
import { URL } from '../utils/serverurl';
import { setUserDetails } from '../store/reducers/userReducer';


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
    '@media (max-width: 768px)': {
        width: '100%', // Change width to 100% on screens smaller than 768px
        height: '80%', // Adjust height as needed
    },
};

export default function StoryCarazoul({ openEdit, editStory }) {
    const loggedUser = JSON.parse(localStorage.getItem("info"));

    const [loading, setLoading] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('info'));
    const dispatch = useDispatch()
    const [images, setImages] = React.useState([]);
    const handleClose = () => editStory();
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: form.title,
            content: images[0],
            user: user?._id,
        }
        // console.log('formData', formData)
        setLoading(true)
        dispatch(createStory(formData))
        try {
            // console.log('bagItemData', bagItemData)
            const { data } = await axios.post(`${URL}/user/addstory`, formData);
            setUserDetails(data?.updateStory);
            console.log('response', data?.updateStory)
        } catch (error) {
            console.log('error', error)
        }
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
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {
                        loading ? <div className='bg-transparent h-full w-full flex items-center justify-center text-white '>
                            <div className='bg-white w-20 h-20 flex items-center justify-center animate-spin rounded-full border-t-8 border-red-500   '>
                                <div className='bg-sky-400 w-5 h-5  animate-spin  duration-100  ease-linear'>

                                </div>
                            </div>
                        </div> :
                            <form className='w-full h-full flex flex-col gap-4 text-white items-center ' onSubmit={handleSubmit}>
                                <span className='h-[5%] w-full flex justify-center text-white font-semibold items-center '>Add story</span>
                                <div className='h-[95%] w-full flex flex-col md:flex-row '>
                                    <div className='md:w-2/3 flex justify-center  items-center w-full md:h-full h-[70%] '>
                                        {images.length === 0 &&
                                            <div className='w-full flex justify-center items-center'>
                                                <label htmlFor='fileInput' className='cursor-pointer p-2 bg-blue-500 rounded-md'>
                                                    Choose File
                                                </label>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                    className='hidden'
                                                />
                                            </div>
                                        }

                                        {
                                            images.length > 0 &&
                                            <div className='w-full h-[90%]  flex flex-row md:flex-col overflow-x-auto scroll-smooth scrollbar-hide'>
                                                {images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Uploaded ${index}`}

                                                        className=' w-full md:w-[90%] h-[90%] md:m-4 m-0 rounded-md object-cover'
                                                    />
                                                ))}
                                            </div>
                                        }

                                    </div>
                                    {images.length > 0 && <div className='flex  items-center flex-col gap-4  md:h-full h-[30%] w-full md:w-1/3'>
                                        <div className='flex gap-4 h-[20%] md:h-[10%] w-full pt-2  md:pt-12 cursor-pointer items-center pb-4 mx-0 md:mx-8'>
                                            <img src={loggedUser?.profilePic} className='object-cover rounded-full md:h-[32px] md:min-w-[32px] h-[25px] min-w-[25px] ' />
                                            <span className='flex items-center font-semibold text-xs md:text-[16px] gap-1 text-center'>{loggedUser?.name} <FcApproval className='text-xs md:text-lg' /></span>

                                        </div>
                                        <div className='flex flex-col md:gap-8 gap-3  items-center    h-full md:h-1/2 w-full'>

                                            <div className='w-full    h-10'>
                                                <input value={form.title} type="text" name="title" className=' outline-none bg-transparent border-b-2 border-gray-900 h-full rounded-md w-full' placeholder='Write a Caption' required onChange={handleChange} />
                                            </div>
                                            <button className='w-1/2 bg-sky-500 py-2 md:py-3 rounded-md hover:bg-sky-900 text-white text-xs md:text-md font-bold uppercase' type="submit">Upload</button>
                                        </div>
                                    </div>}
                                </div>

                            </form>
                    }
                </Box>
            </Modal>
        </div>
    );
}
