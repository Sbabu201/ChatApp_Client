import React from 'react'

const HomePageLoader = () => {
    return (
        <div className='bg-black h-screen w-full flex items-center justify-center text-white '>
            <div className='bg-white w-20 h-20 flex items-center justify-center animate-spin rounded-full border-t-8 border-red-500   '>
                <div className='bg-sky-400 w-5 h-5  animate-spin  duration-100  ease-linear'>

                </div>
            </div>
        </div>
    )
}

export default HomePageLoader
