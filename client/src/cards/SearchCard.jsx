import * as React from 'react';
import Drawer from '@mui/joy/Drawer';
import { FcApproval } from "react-icons/fc";

import { FcCancel } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/reducers/profileReducer';


export default function SearchCard({ searchOpen, handleSearchOpen }) {
    const navigate = useNavigate()
    const [search, setSearch] = React.useState();
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users);
    // console.log('users', users)
    let filteredUsers = users.filter(user => {
        const lowerCaseName = user?.name?.toLowerCase();
        if (search?.length === 0)
            return
        return lowerCaseName?.includes(search?.toLowerCase());
    });
    // console.log('filteredUsers', filteredUsers)
    const handle = () => {
        handleSearchOpen();
    }

    React.useEffect(() => {
        filteredUsers = users.filter(user => {
            const lowerCaseName = user?.name?.toLowerCase();
            return lowerCaseName?.includes(search?.toLowerCase());
        });
    }, [search])
    return (


        <>
            <Drawer
                open={searchOpen}
                onClose={handle}
                sx={{
                    '--Drawer-transitionDuration': searchOpen ? '0.4s' : '0.2s',
                    '--Drawer-transitionFunction': searchOpen
                        ? 'cubic-bezier(0.79,0.14,0.15,0.86)'
                        : 'cubic-bezier(0.77,0,0.18,1)',
                }}
            >

                <div className='bg-black text-white h-screen scrollbar-hide overflow-hidden  scroll-smooth  w-full border-r-2 border-gray-600'>
                    <span className='uppercase mt-10 px-8 w-full flex justify-between font-bold text-2xl text-center'>search <FcCancel className=' cursor-pointer' size={32} onClick={() => handle} /></span>
                    <form className='md:mt-16 md:ml-16 md:mb-4 m-4 mt-10  bg-gray-600 w-[90%] md:w-2/3 h-[6%]  rounded-md' action="">
                        <div className='flex items-center text-center justify-between'>
                            <input type="text" name="search" value={search} onChange={handleChange} className='md:h-12 h-6 px-2 w-4/5 bg-transparent outline-none' onClick={(e) => e.stopPropagation()} placeholder='search' /> < FcSearch className='pr-2' size={40} /></div>
                    </form>
                    <div className='flex flex-col scrollbar-hide overflow-hidden m-4 gap-2 rounded-md scroll-smooth bg-black  overflow-y-auto h-[90%]'>
                        {
                            filteredUsers?.map((item) => (
                                <div className='flex gap-4 h-[8%] items-center cursor-pointer md:mx-12 rounded-md hover:bg-gray-600 ' onClick={() => {
                                    navigate(`/userprofile/${item?._id}`)
                                }}>
                                    <img src={item?.profilePic} className='object-cover rounded-full md:h-[40px] md:w-[40px] h-[20px] w-[20px] ' />
                                    <span className='flex items-center gap-1 text-xs md:text-base text-center'>{item?.name} <FcApproval size={22} /></span>

                                </div>
                            ))
                        }
                    </div>
                </div>

            </Drawer>
        </>
    );
}