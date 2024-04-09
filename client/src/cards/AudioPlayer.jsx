import React, { useRef } from 'react';

const AudioPlayer = () => {
    const audioRef = useRef(null);

    const playAudio = () => {
        // Play the audio
        audioRef.current.play();
    }

    return (
        <div>
            {/* Audio element */}
            <audio ref={audioRef} controls>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Button to play audio */}
            <button onClick={playAudio}>Play Audio</button>
        </div>
    );
}

export default AudioPlayer;
