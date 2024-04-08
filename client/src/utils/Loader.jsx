import React from 'react'

const Loader = () => {
    return (



        <div className='h-screen flex w-full overflow-hidden bg-black '>
            <div className='md:w-[20%] h-screen w-0 border-r-2  flex-col pt-20 flex text-white '>
                <div className='w-full h-[10%] bg-gray-800 duration-100 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse duration-75 ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>
                <div className='w-full h-[10%] bg-gray-800 animate-pulse ease-linear'>

                </div>



            </div>
            <div className='md:w-[80%] w-full bg-black  h-screen  border-white '>
                <div className='m-2 w-full h-[10%] bg-gray-800  animate-pulse duration-75 ease-linear flex items-center  border-b-2'>

                    <div className='object-cover rounded-full bg-gray-800  animate-pulse duration-75 ease-linear h-[70px] w-[70px] '>
                        {/* <img src="" alt="" /> */}
                    </div>

                </div>
                <div className='md:m-2 w-full pb-40 md:h-[90%] h-[80%] justify-start items-center bg-gray-500  animate-pulse duration-75 ease-linear  gap-4 flex flex-col    border-b-2'>
                    <div className='m-2 w-[90%] md:w-[50%] mt-20 pb-40 h-full bg-gray-800  animate-pulse duration-75 ease-linear  justify-start items-center gap-4 flex flex-col scrollbar-hide  scroll-smooth    border-b-2'>

                    </div>
                </div>
                <div className='w-full h-[10%] flex md:hidden animate-pulse duration-75 ease-linear'>
                    <div className='flex  justify-between    w-full  '>
                        <div className='flex  w-1/6 p-2 justify-center items-center  font-bold shadow-md bg-gray-500 rounded-sm  duration-300 '>


                        </div>

                        <div className='flex gap-6 items-center font-bold shadow-md animation-pulse bg-gray-500 rounded-sm  duration-300  w-1/6 justify-center '>

                        </div>
                        <div className='flex gap-6 items-center font-bold shadow-md animation-pulse bg-gray-500 rounded-sm  duration-300  w-1/6 justify-center'>

                        </div>
                        <div className='flex gap-6 items-center font-bold shadow-md animation-pulse bg-gray-500 rounded-sm  duration-300  w-1/6 justify-center'>


                        </div>
                        <div className='flex gap-6 items-center font-bold shadow-md animation-pulse bg-gray-500 rounded-sm  duration-300  w-1/6 justify-center'>


                        </div>


                        <div className='flex gap-6 items-center font-bold shadow-md animation-pulse bg-gray-500 rounded-sm  duration-300  w-1/6 justify-center'>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Loader
