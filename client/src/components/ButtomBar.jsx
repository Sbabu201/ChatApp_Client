import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
const ButtomBar = () => {
    const navigate = useNavigate()
   
    return (
        <div className='flex  fixed bottom-0  z-10 justify-evenly items-center text-white  border-gray-50  border-t bg-black shadow-md w-full h-10 '>
            <HomeRoundedIcon onClick={() => navigate("/otp")} />
            <AddBoxOutlinedIcon onClick={() => navigate("/otp")} />
            <ChatBubbleOutlinedIcon onClick={() => navigate("/otp")} />
            <AccountCircleIcon onClick={() => navigate("/otp")} />
        </div>
    )
}

export default ButtomBar
