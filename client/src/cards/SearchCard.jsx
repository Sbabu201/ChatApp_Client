import * as React from 'react';
import Drawer from '@mui/joy/Drawer';

import { FcCancel } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";


export default function SearchCard({ searchOpen, handleSearchOpen }) {
    // const [open, setOpen] = React.useState(false);
    const handle = () => {
        handleSearchOpen();
    }
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

                <div className='bg-black text-white h-screen w-full border-r-2 border-gray-600'>
                    <span className='uppercase mt-10 px-8 w-full flex justify-between font-bold text-2xl text-center'>search <FcCancel className=' cursor-pointer' size={32} onClick={() => handle} /></span>
                    <form className='my-16 mx-16 bg-gray-600 w-2/3 h-12 rounded-md' action="">
                        <div className='flex items-center justify-between'><input type="text" className='h-12 w-4/5 bg-transparent outline-none' onClick={(e) => e.stopPropagation()} placeholder='search' /> < FcSearch className='pr-2' size={40} /></div>
                    </form>
                </div>

            </Drawer>
        </>
    );
}