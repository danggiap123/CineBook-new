import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon, X } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

const MovieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Lấy thêm favoritesMovies và addToFavorites từ Context
    const { image_base_url, addToFavorites, favoritesMovies } = useContext(AppContext);

    const [show, setShow] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    // Kiểm tra phim này có trong danh sách yêu thích không
    // (favoritesMovies có thể chưa load xong nên cần dấu ?)
    const isFavorite = favoritesMovies?.some(fav => fav._id === id);

    // Lấy chi tiết phim
    const getShow = async () => {
        try {
            const { data } = await axios.get(`/api/show/${id}`);
            if (data.success) {
                setShow({
                    movie: data.movie,
                    dateTime: data.dateTime
                });
            } else {
                console.error("Lỗi:", data.message);
            }
        } catch (error) {
            console.error("Lỗi kết nối API chi tiết:", error);
        }
    }

    // Lấy danh sách phim gợi ý
    const getRelatedMovies = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if (data.success) {
                const others = data.shows.filter(item => item._id !== id);
                setRelatedMovies(others);
            }
        } catch (error) {
            console.error("Lỗi kết nối API danh sách:", error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            getShow();
            getRelatedMovies();
        }
    }, [id])

    // Xử lý Trailer
    const openTrailer = () => {
        if (show?.movie?.trailer_link) {
            setIsTrailerOpen(true);
        } else {
            alert("Phim này chưa có trailer!");
        }
    }

    const closeTrailer = () => setIsTrailerOpen(false);

    const getEmbedUrl = (url) => url ? url.replace("watch?v=", "embed/") : "";

    const getImageUrl = (path) => path ? (path.startsWith('http') ? path : image_base_url + path) : "";

    return show ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-50 min-h-screen'>
            <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
                {/* Poster */}
                <img
                    src={getImageUrl(show.movie.poster_path)}
                    alt={show.movie.title}
                    className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover shadow-lg border border-gray-800'
                />

                <div className='relative flex flex-col gap-3'>
                    <BlurCircle top='-100px' left='-100px' />
                    <p className='text-primary font-bold tracking-wider'>VIETNAM</p>
                    <h1 className='text-4xl font-semibold max-w-xl text-balance leading-tight'>
                        {show.movie.title}
                    </h1>

                    <div className='flex items-center gap-2 text-gray-300'>
                        <StarIcon className='w-5 h-5 text-primary fill-primary' />
                        <span className='text-white font-medium'>{show.movie.vote_average.toFixed(1)}</span>
                        <span className='text-gray-500 text-sm'>| User Rating</span>
                    </div>

                    <p className='text-gray-400 mt-2 text-sm leading-relaxed max-w-xl'>
                        {show.movie.overview}
                    </p>

                    <p className='text-gray-300 text-sm mt-2'>
                        {timeFormat(show.movie.runtime)} •
                        <span className='mx-2 text-gray-400'>
                            {/* Sửa lỗi hiển thị genres: Kiểm tra nếu là object thì lấy .name */}
                            {show.movie.genres
                                .map(g => (typeof g === 'object' ? g.name : g))
                                .join(" , ")
                            }
                        </span>
                        • {show.movie.release_date.split("-")[0]}
                    </p>

                    <div className='flex items-center flex-wrap gap-4 mt-6'>
                        <button
                            onClick={openTrailer}
                            className='flex items-center gap-2 px-8 py-3 text-sm
                            bg-gray-800 hover:bg-gray-700 transition rounded-md font-medium
                            cursor-pointer active:scale-95 border border-gray-600 shadow-md'>
                            <PlayCircleIcon className={'w-5 h-5 text-primary'} />
                            Trailer
                        </button>

                        <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary
                        hover:bg-primary-dull transition rounded-md font-medium cursor-pointer
                        active:scale-95 text-white shadow-lg shadow-primary/20'>
                            Đặt Vé
                        </a>

                        {/* NÚT TRÁI TIM - Thêm sự kiện onClick và đổi màu */}
                        <button
                            onClick={() => addToFavorites(show.movie._id)}
                            className={`p-3 rounded-full transition cursor-pointer active:scale-95 border border-gray-600 
                            ${isFavorite ? 'bg-red-500/10 border-red-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            <Heart
                                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Trailer */}
            {isTrailerOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4' onClick={closeTrailer}>
                    <div className='relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800' onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeTrailer} className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full hover:bg-gray-800 transition text-white">
                            <X size={24} />
                        </button>
                        <div className='aspect-video w-full'>
                            <iframe width="100%" height="100%" src={getEmbedUrl(show.movie.trailer_link)} title="Movie Trailer" frameBorder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Diễn viên */}
            <p className='text-xl font-semibold mt-16 text-white'>Diễn viên</p>
            <div className='overflow-x-auto no-scrollbar mt-6 pb-4'>
                <div className='flex items-start gap-6 w-max px-2'>
                    {show.movie.casts.slice(0, 10).map((cast, index) => (
                        <div key={index} className='flex flex-col items-center text-center w-24'>
                            <div className='h-24 w-24 rounded-full overflow-hidden border-2 border-gray-800 shadow-sm mb-3'>
                                <img
                                    src={getImageUrl(cast.profile_path)}
                                    alt={cast.name}
                                    className='h-full w-full object-cover'
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </div>
                            <p className='font-medium text-xs text-gray-300 line-clamp-2'>{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id="dateSelect" className="mt-10">
                <DateSelect dateTime={show.dateTime} id={id} />
            </div>

            <p className='text-xl font-semibold mt-20 mb-8 text-white'>Có thể bạn sẽ thích</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {relatedMovies.slice(0, 8).map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>

            <div className='flex justify-center mt-16 pb-20'>
                <button
                    onClick={() => { navigate('/movies'); window.scrollTo(0, 0) }}
                    className='px-12 py-3 text-sm bg-transparent border border-gray-600 hover:border-primary hover:text-primary transition rounded-full font-medium text-gray-300'
                >
                    Xem tất cả phim
                </button>
            </div>
        </div>
    ) : <Loading />;
}

export default MovieDetails