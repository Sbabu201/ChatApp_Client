import React, { useRef, useState } from 'react';
import { FcLike } from "react-icons/fc";
const AudioPlayer = () => {
    const [open, setOpen] = useState(false)
    const audioRef = useRef(null);
    const showAndHide = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000); // 3000 milliseconds = 3 seconds
    };
    const playAudio = () => {
        // Play the audio
        audioRef.current.play();
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div>
                <div className={`text-4xl transition-all  animate-ping duration-100 ${open ? 'opacity-100' : 'opacity-0'} `}  >
                    <img className='text-4xl transition-all w-20 h-20 animate-pulse duration-500 ' src="https://imgs.search.brave.com/uzQ9ERbBTQvBIEqrtsZLtpqaOv3OJXoobnxaiWLF0as/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2hlYXJ0LXBu/Zy1oZWFydC1wbmct/aW1hZ2UtZnJlZS1k/b3dubG9hZC0yNTU1/LnBuZw" alt="" />
                </div>
            </div>
            <button className='text-white' onClick={showAndHide}>change</button>
        </div>
    );
}

export default AudioPlayer;
