import * as React from 'react';
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
const NotificationCard = ({ notify, handleChange }) => {
    const arr = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,]
    const handle = () => {
        handleChange()
    }
    return (
        <div>
            <Drawer open={notify} onClose={() => handle}>
                {/* <ModalClose className="bg-black" /> */}

                <DialogContent className='bg-black text-gray-100 '>
                    <div className='flex justify-end m-2'>
                        <FcCancel size={32} />
                    </div>
                    <span className='text-white font-bold text-center text-2xl pb-8'>Notifications </span>
                    <div className='hide-scrollbar'>
                        {
                            arr?.map((item, i) => (
                                <div className='flex text-white w-full gap-2 px-2 hover:bg-gray-900 duration-300 ' onClick={() => alert("hello")}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                    <img src={login} className='w-10 h-10 object-cover' alt="" />
                                </div>
                            ))
                        }
                    </div>
                    {/* <List>
                        {[...new Array(100)].map((_, index) => (
                            <ListItem key={index}>
                                <ListItemButton onClick={() => handle}>
                                    Item {index}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> */}
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
                >
                    <Avatar size="lg" />
                    <div className='text-white'>
                        <p>hello</p>
                        <p>hello</p>
                    </div>
                </Box>
            </Drawer>
        </div >
    )
}

export default NotificationCard
