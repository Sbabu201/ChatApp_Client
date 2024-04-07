import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import { Login } from '@mui/icons-material';
import { FcPrevious } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import login from "../assets/msg.png"
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../store/reducers/commentReducer';
import { getAllLikes } from '../store/reducers/likeReducer';
import { useEffect } from 'react';
import { getAllPosts } from '../store/reducers/postReducer';
import { useNavigate } from 'react-router-dom';
import { setPost } from '../store/reducers/profileReducer';
const NotificationCard = ({ notify, handleChange }) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("info"))
    const posts = useSelector(state => state.postReducer.posts);
    let userPosts = posts?.filter((item) => {
        return item?.user?._id === user?._id;
    })
    const navigate = useNavigate()

    const handle = () => {
        handleChange()
    }

    useEffect(() => {
        userPosts = posts?.filter((item) => {
            return item?.user?._id === user?._id;
        })
    }, [posts])

    return (
        <div>
            <Drawer open={notify} onClose={() => handle}>
                {/* <ModalClose className="bg-black" /> */}

                <DialogContent className='bg-black text-gray-100 '>
                    <div className='flex justify-end m-2'>
                        <FcCancel size={32} />
                    </div>
                    <span className='text-white font-bold text-center text-2xl pb-8'>Notifications </span>
                    <div className='hide-scrollbar flex flex-col gap-2 items-center'>
                        {
                            userPosts?.map((item, i) => (
                                <>
                                    {item?.likes?.length > 0 && <div className='flex text-white w-full h-12 gap-2 px-2 hover:bg-gray-900 duration-300  justify-between items-center' onClick={() => {
                                        localStorage.setItem("postId", item?._id);
                                        dispatch(setPost(item?._id))
                                        navigate("/postSearch")
                                    }}>
                                        <p className='flex pl-2 text-xs md:text-base gap-2'> {item?.likes[0]?.user?.name}  {item?.likes?.length - 1 >= 1 ? ` and ${item?.likes?.length - 1} others Liked your photo. ` : `Liked your photo .`}  </p>

                                        <img src={item?.image[0]} className='w-8 h-8 object-cover' alt="" />
                                    </div>}
                                    {item?.comments?.length > 0 && <div className='flex text-white w-full h-12 gap-2 px-2 hover:bg-gray-900 duration-300  justify-between items-center' onClick={() => {
                                        localStorage.setItem("postId", item?._id);
                                        dispatch(setPost(item?._id))
                                        navigate("/postSearch")
                                    }}>
                                        <p className='flex pl-2 text-xs md:text-base gap-2'> {item?.comments[0]?.user?.name}  {item?.comments?.length - 1 >= 1 ? ` and ${item?.comments?.length - 1} others commented on your photo.` : `commented on your photo .`}  </p>

                                        <img src={item?.image[0]} className='w-8 h-8 object-cover' alt="" />
                                    </div>}
                                </>
                            ))
                        }
                    </div>
                </DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        p: 1.5,
                        pb: 2,
                        borderTop: '1px solid ',
                        borderColor: 'gray',
                        backgroundColor: "black",


                    }}
                    onClick={() => navigate("/profile")}
                >
                    <Avatar size="lg" src={user?.profilePic} />
                    <div className='text-white '>
                        <p>{user?.name}</p>
                        {/* <p>hello</p> */}
                    </div>
                </Box>
            </Drawer>
        </div >
    )
}

export default NotificationCard
