import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated } from '../store/reducers/profileReducer';
import { Outlet, useNavigate, Navigate } from "react-router-dom"
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.profileReducer.isAuthenticated);



    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute

const CheckLogin = ({ children }) => {
    const isAuthenticated = useSelector(state => state.profileReducer.isAuthenticated);
    // console.log('is', isAuthenticated)


    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <Outlet />
    )
}
export { CheckLogin };
