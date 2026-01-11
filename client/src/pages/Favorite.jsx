import React from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Favorite = () => {

    // SỬA: Thêm chữ 's' vào favoritesMovies cho đúng với Context
    const { favoritesMovies } = useAppContext()

    // SỬA: Thêm "favoritesMovies &&" để bảo vệ, tránh lỗi crash nếu dữ liệu null
    return (favoritesMovies && favoritesMovies.length > 0) ? (
        <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>

            <BlurCircle top='150px' left='0px' />
            <BlurCircle bottom='50px' right='50px' />

            <h1 className='text-lg font-medium my-4'>Your Favorite Movies</h1>

            <div className='flex flex-wrap max-sm:justify-center gap-8'>
                {favoritesMovies.slice(0, 6).map((movie) => (
                    <MovieCard movie={movie} key={movie._id} />
                ))}
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
            {/* Nếu chưa có phim, hiện thông báo đẹp hơn chút */}
            <div className='text-center opacity-50'>
                <h2 className='text-3xl font-bold mb-2'>Chưa có phim yêu thích</h2>
                <p>Hãy thêm vài bộ phim vào danh sách nhé!</p>
            </div>
        </div>
    )
}

export default Favorite