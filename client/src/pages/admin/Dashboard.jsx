import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react'
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import BlurCircle from '../../components/BlurCircle';
import { moneyFormat } from '../../lib/moneyFormat';
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Dashboard = () => {

    const { axios, getToken, user, image_base_url } = useAppContext()

    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0
    });
    const [loading, setLoading] = useState(true);

    // Dữ liệu hiển thị cho các thẻ thống kê
    const dashboardCards = [
        { title: 'Tổng vé đã đặt', value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
        { title: 'Tổng doanh thu', value: moneyFormat(dashboardData.totalRevenue) || "0", icon: CircleDollarSignIcon },
        { title: 'Phim đang chiếu', value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
        { title: 'Người dùng', value: dashboardData.totalUser || "0", icon: UserIcon },
    ]

    // Hàm gọi API lấy dữ liệu Dashboard
    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setDashboardData(data.dashboardData)
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Error fetching dashboard data")
            console.error(error)
            setLoading(false)
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user])

    // Logic gom nhóm các suất chiếu theo phim (Lọc trùng)
    const uniqueMovies = useMemo(() => {
        const movieMap = new Map();

        // Kiểm tra nếu activeShows tồn tại thì mới chạy vòng lặp
        if (dashboardData.activeShows && dashboardData.activeShows.length > 0) {
            dashboardData.activeShows.forEach((show) => {
                if (show.movie) { // Kiểm tra safety
                    const movieId = show.movie._id;
                    if (!movieMap.has(movieId)) {
                        movieMap.set(movieId, {
                            movieInfo: show.movie,
                            shows: [show]
                        });
                    } else {
                        movieMap.get(movieId).shows.push(show);
                    }
                }
            });
        }
        return Array.from(movieMap.values());
    }, [dashboardData.activeShows]);

    // Render giao diện
    return !loading ? (
        <div className='w-full'>
            <Title text1="Admin" text2="Dashboard" />

            {/* --- PHẦN 1: CÁC THẺ THỐNG KÊ (CARDS) --- */}
            <div className='relative flex flex-wrap gap-4 mt-6'>
                <BlurCircle top='-100px' left='0' />
                <div className='flex flex-wrap gap-4 w-full'>
                    {dashboardCards.map((card, index) => (
                        <div key={index} className='flex items-center justify-between
                        px-4 py-3 bg-primary/10 border border-primary/20
                         rounded-md min-w-52 flex-1'>
                            <div>
                                <h1 className='text-sm text-gray-400'>{card.title}</h1>
                                <p className='text-2xl font-bold mt-1'>{card.value}</p>
                            </div>
                            <card.icon className='w-8 h-8 text-primary opacity-80' />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- PHẦN 2: DANH SÁCH PHIM GOM NHÓM --- */}
            <p className='mt-10 text-xl font-bold text-gray-200'>Danh sách phim & Lịch chiếu</p>

            <div className='relative flex flex-wrap gap-6 mt-6 pb-10'>
                <BlurCircle top='100px' left='-10%' />

                {uniqueMovies.map((item) => {
                    // Logic sắp xếp giờ chiếu tăng dần
                    const sortedShows = item.shows.sort((a, b) => new Date(a.showDateTime) - new Date(b.showDateTime));

                    // Logic chỉ hiện tối đa 4 khung giờ, còn lại hiện số dư
                    const maxDisplay = 4;
                    const displayShows = sortedShows.slice(0, maxDisplay);
                    const remainingCount = sortedShows.length - maxDisplay;

                    return (
                        <div key={item.movieInfo._id} className='w-60 rounded-xl overflow-hidden
                        bg-[#1a1a1a] border border-gray-800 shadow-lg
                        hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative'>

                            {/* KHUNG ẢNH & OVERLAY */}
                            <div className="relative h-80 w-full overflow-hidden">
                                <img src={image_base_url + item.movieInfo.poster_path} alt=""
                                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' />

                                {/* Overlay hiển thị danh sách giờ khi Hover */}
                                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 flex flex-col items-center justify-center p-4">

                                    <p className="text-white font-bold mb-3 text-sm uppercase tracking-wider border-b border-primary pb-1">
                                        Lịch chiếu ({item.shows.length})
                                    </p>

                                    <div className="flex flex-wrap gap-2 justify-center w-full">
                                        {displayShows.map((show, idx) => {
                                            const dateObj = new Date(show.showDateTime);
                                            const time = dateObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                                            const date = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

                                            return (
                                                <div key={idx} className="bg-primary hover:bg-red-600 text-white 
                                                text-xs px-2 py-1.5 rounded-md text-center shadow-sm w-[45%]">
                                                    <span className="font-bold block text-sm">{time}</span>
                                                    <span className="text-[10px] opacity-80">{date}</span>
                                                </div>
                                            )
                                        })}

                                        {/* Nút "+ Xem thêm" nếu quá nhiều */}
                                        {remainingCount > 0 && (
                                            <div className="bg-gray-700 text-white text-xs px-2 py-2 rounded-md 
                                            text-center w-[45%] flex items-center justify-center font-bold border border-gray-500">
                                                +{remainingCount} khác
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* THÔNG TIN DƯỚI CARD */}
                            <div className='p-3'>
                                <h3 className='font-bold text-white truncate text-base mb-1' title={item.movieInfo.title}>
                                    {item.movieInfo.title}
                                </h3>

                                <div className='flex items-center justify-between'>
                                    <p className='text-primary font-bold'>{moneyFormat(item.shows[0].showPrice)}</p>
                                    <div className='flex items-center gap-1 bg-gray-800 px-1.5 py-0.5 rounded text-xs text-yellow-500'>
                                        <StarIcon className='w-3 h-3 fill-yellow-500' />
                                        <span>{item.movieInfo.vote_average.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className='mt-3 flex justify-between items-center text-[11px] text-gray-400 border-t border-gray-800 pt-2'>
                                    <span>
                                        {new Date(sortedShows[0].showDateTime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                                        {item.shows.length > 1 && ` ➔ ${new Date(sortedShows[item.shows.length - 1].showDateTime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`}
                                    </span>
                                    <span className='bg-primary/20 text-primary px-2 py-0.5 rounded'>
                                        {item.shows.length} suất
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    ) : <Loading />
}

export default Dashboard