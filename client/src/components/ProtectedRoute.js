import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from "../redux/features/userSlice";
export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    //get user

    const getUser = async () => {
        try {
            const res = await axios.post('/api/v1/user/getUserData',
                { token: localStorage.getItem('token') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            )
            if (res.data.success) {
                dispatch(setUser(res.data.data));

            }
            else {
                <Navigate to="/login" />
                localStorage.clear();
            }

        } catch (error) {
            console.log(error);
            localStorage.clear();
        }


    };
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);



    if (localStorage.getItem("token"))
        return children;
    else {
        return <Navigate to='/login'></Navigate>
    }
}