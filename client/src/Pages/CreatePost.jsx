
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/reducers/postReducer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "70%",
    bgcolor: 'black',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
};

export default function CreatePost({ open, handleOpen }) {
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
                const res = await axios.post("https://api.cloudinary.com/v1_1/dwztqzfeh/image/upload", formData)
                // Add the uploaded image URL to the images array
                setImages(prevImages => [...prevImages, res.data.url]);
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
        dispatch(createPost(formData))
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
                    <form className='w-full h-full flex text-black' onSubmit={handleSubmit}>
                        <div className='w-2/3  '>
                            <input
                                type="file"
                                accept="image/*"
                                // name='click'
                                multiple
                                onChange={handleFileUpload}
                            />

                            <div className='w-full h-full flex overflow-x-hidden scroll-smooth scrollbar-hide'>
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Uploaded ${index}`}
                                        style={{ width: '100%', height: '100%', margin: '10px' }}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className='flex flex-col gap-4 mx-4 bg-white w-1/3'>
                            <div className='w-full border border-white bg-gray-600 h-10 px-4 mt-20 '>
                                <input type="text" value={form.name} name="name" onChange={handleChange} className=' outline-none bg-transparent w-full' placeholder='name' />
                            </div>
                            <div className='w-full border border-white bg-gray-600 h-10 px-4'>
                                <input value={form.title} type="text" name="title" className=' outline-none bg-transparent w-full' placeholder='title' onChange={handleChange} />
                            </div>
                            <button type="submit">create</button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}
