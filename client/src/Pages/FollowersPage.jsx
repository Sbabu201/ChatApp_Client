
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URL } from '../utils/serverurl';
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from '../store/reducers/userReducer';
import { setUser } from '../store/reducers/profileReducer';
import { useNavigate } from "react-router-dom"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "70%",
    bgcolor: '#333333',
    borderRadius: '8px',

    p: 4,
    '@media (max-width: 768px)': {
        width: '100%', // Change width to 100% on screens smaller than 768px
        height: '80%', // Adjust height as needed
    },
};

export default function FollowersPage({ profile, openFollower, handleFollowers }) {
    console.log('profile', profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const loggedProfile = useSelector(state => state.userReducer.profile);

    const handleClose = () => handleFollowers();





    return (
        <div>
            <Modal
                key={profile?._id}

                open={openFollower}
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
                            <div className='w-full h-full flex flex-col gap-4 text-white items-center ' >
                                <span className='h-[5%] w-full flex justify-center text-white font-semibold items-center '>followers</span>
                                <div className='flex flex-col gap-4 w-full h-[95%] overflow-y-scroll '>
                                    {
                                        profile?.followers?.length > 0 ?
                                            profile?.followers?.map((item, index) => (
                                                <div key={index} className='flex items-center justify-between w-full gap-4'>

                                                    <div onClick={() => {
                                                        handleClose()
                                                        navigate(`/userprofile/${item?._id}`)
                                                    }} className='w-[70%] h-full cursor-pointer flex gap-6 items-center'>
                                                        <img className='md:w-10 w-7 h-7 md:h-10 rounded-full' src={item?.profilePic} alt="" />
                                                        <span className='text-xs md:text-base'>{item?.name}</span>
                                                    </div>
                                                    {profile._id === loggedProfile._id && <button onClick={async () => {
                                                        {
                                                            try {

                                                                const form = {
                                                                    user: item._id,
                                                                    follower: profile._id
                                                                }

                                                                const { data } = await axios.put(`${URL}/user/removefollow`, form);
                                                                // console.log('data', data)
                                                                if (data.success) {
                                                                    toast.success("removed from the followers");
                                                                    dispatch(setUserDetails(data?.updateFollower))
                                                                }
                                                            } catch (error) {
                                                                toast.error(error.message)
                                                            }

                                                        }
                                                    }} className='md:w-[20%] w-[30%] h-full bg-gray-600 text-xs md:text-base font-bold mr-6 rounded-md hover:bg-gray-900'>
                                                        remove</button>}
                                                </div>
                                            )) :
                                            <div className='flex w-full h-full justify-center items-center'>You dont have any followers</div>
                                    }
                                </div>

                            </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}
