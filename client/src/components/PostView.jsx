import React from 'react'

const PostView = ({ item, handleComment }) => {
    return (
        <div className='fixed flex items-center justify-center z-50 text-white inset-0 bg-opacity-30  bg-black backdrop-blur-sm'>
            <div className='bg-transparent flex w-[85%] h-[95%]'>
                <img src="" alt="" className='w-[60%] min-h-full max-h-full' />
                <div className='w-[40%]  bg-black text-white h-full'>
                    {/* <div className='flex gap-2 h-[5%]  mx-8'>
                        {likedByuser?.length > 0 ? <FcLike size={32} onClick={handleDislike} /> :
                            <FcLikePlaceholder size={32} onClick={handlelike} />}
                        <FcComments onClick={handleComment} size={32} />
                        <FcShare size={32} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PostView
