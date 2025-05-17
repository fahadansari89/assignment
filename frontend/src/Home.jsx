import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from './utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { setUser } from './redux/authSlice';

const home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            .then((result) => {
                if (result.data.success) {
                    dispatch(setUser(null))
                    navigate('/')
                    toast.success(result.data.message)


                }
            }).catch((err) => {
                toast.error(err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong")
            });
    }
    const { user } = useSelector(store => store.auth)

    return (
        <div>
            <h1 className='text-3xl text-center mt-10 '> Welcome <span className='text-cyan-500'>{user?.name}</span>  </h1>
            <center>
                <h1 className='mt-5 text-2xl'>email</h1>
                <h1 className='text-cyan-500mt-1'>{user?.email}</h1>
                <h1 className='mt- text-2xl mt-3'>role</h1>
                <h1 className='text-cyan-50 mt-1' >{user?.role}</h1>
                <div>
                    <button className='w-52 bg-cyan-500 mt-5 rounded p-2' onClick={logoutHandler}>logout</button>
                </div>
            </center>
        </div>
    )
}

export default home