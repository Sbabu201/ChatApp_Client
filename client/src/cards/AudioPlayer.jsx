import React, { useRef, useState } from 'react';
import { FcLike } from "react-icons/fc";
const AudioPlayer = () => {
    const [open, setOpen] = useState(false)
    const audioRef = useRef(null);
    const showAndHide = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 1000); // 3000 milliseconds = 3 seconds
    };
    const playAudio = () => {
        // Play the audio
        audioRef.current.play();
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div>
                <div className={`text-4xl transition-all  animate-bounce duration-500 ${open ? 'opacity-100' : 'opacity-0'} `}  >
                    <FcLike className='text-4xl transition-all  animate-pulse duration-500 ' />
                </div>
            </div>
            <button className='text-white' onClick={showAndHide}>change</button>
        </div>
    );
}

export default AudioPlayer;
