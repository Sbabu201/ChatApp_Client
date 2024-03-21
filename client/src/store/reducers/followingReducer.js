import React, { useRef } from 'react'
import FollowerReducer from './followerReducer'

const followingReducer = () => {
    let socket = useRef(null)
    const sendSocket = (data) => {
        socket = data;
    }
    return (
        <div>
            <FollowerReducer sendSocket={sendSocket} />
        </div>
    )
}

export default followingReducer
