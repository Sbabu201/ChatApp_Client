
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URL } from '../utils/serverurl';
import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "50%",
    borderRadius: '100%',

    p: 4,
    '@media (max-width: 768px)': {
        width: '100%', // Change width to 100% on screens smaller than 768px
        height: '50%', // Adjust height as needed
    },
};

export default function UserDp({ open, profilePic, handleOpen }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('profilePic', profilePic)
    const handleClose = () => handleOpen();





    return (
        <div>
            <Modal
                key={profilePic}

                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} >
                    {

                        <div className='w-full h-full flex flex-col gap-4 text-white items-center md:justify-center ' >

                            <img src={profilePic} className='md:w-[70%] w-full rounded-md md:h-full h-60 object-cover' alt="" />

                        </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}
