// SocketContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { URL } from '../utils/serverurl';
const backendUrl = process.env.BACKEND;
console.log('URL', URL)
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("info"));
    const socket = useRef()


    useEffect(() => {

        socket.current = io(`${URL}`); // Your server URL
        // console.log('socket', socket)
        socket.current.emit("add-user", user?._id);
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
