// SocketContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("info"));
    const socket = useRef()


    useEffect(() => {

        socket.current = io('http://localhost:8080'); // Your server URL
        // console.log('socket', socket)
        socket.current.emit("add-user", user?._id);
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
