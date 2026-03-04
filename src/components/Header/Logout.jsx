import React from "react";
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logouthandler = async () => {
        await authService.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        })

    }

    return (<>
        <button className="inline-block px-6 py-2 duration-200 
            hover:bg-white rounded-full"
            onClick={logouthandler}>Logout</button>
    </>)
}

export default Logout