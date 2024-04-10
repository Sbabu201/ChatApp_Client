// FollowerReducer.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { setSocket } from './socketReducer';
const backendUrl = process.env.BACKEND;

const FollowerReducer = ({ sendSocket }) => {
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    const socket = useSelector(state => state.socketReducer.socket);

    useEffect(() => {
        if (loggedUser) {
            const newSocket = io(`${backendUrl}`);
            newSocket.emit("add-user", loggedUser?._id);
            sendSocket(newSocket);
            return () => {
                // Cleanup socket connection
                newSocket.disconnect();
            };
        }
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on("catch", (data) => {
                alert("hey")
                // console.log('catch', data)
                // setArrivalMssage({ from: data.from, message: { fromSelf: false, message: data.message } })
            })
        }
    }, [socket])
    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
}

export default FollowerReducer;
