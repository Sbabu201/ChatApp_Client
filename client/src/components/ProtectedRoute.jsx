import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated } from '../store/reducers/profileReducer';
import { Outlet, useNavigate, Navigate } from "react-router-dom"
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.profileReducer.isAuthenticated);
    let checkObj = JSON.parse(localStorage.getItem("info"));
    console.log('isAuthenticated', isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        checkObj = JSON.parse(localStorage.getItem("info"));
        if (checkObj === null || checkObj === undefined) { dispatch(setAuthenticated(false)); }
        else {
            dispatch(setAuthenticated(true))
        }
    }, [checkObj, dispatch])

    if (isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
