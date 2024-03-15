import React from 'react'

const allPostsCard = ({ item }) => {
    console.log('item', item)
    return (
        <div className='w-3/6 h-3/4 bg-red-500 flex border justify-center scrollbar-hide  scroll-smooth'>
            <img src={item?.image[0]} className='object-cover mt-10  w-[60%] h-[60%] ' key={item?._id} />
            {/* <img src="" alt="" /> */}

        </div>
    )
}

export default allPostsCard
