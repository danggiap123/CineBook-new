import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { moneyFormat } from '../lib/moneyFormat'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

// --- COMPONENT CON: XỬ LÝ ĐẾM NGƯỢC VÀ NÚT THANH TOÁN ---
const PaymentSection = ({ booking, handlePayment }) => {
    // Thời gian hết hạn = Thời gian tạo vé (booking.date) + 5 phút
    const expiryTime = new Date(booking.date).getTime() + 5 * 60 * 1000;

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = expiryTime - now;
        return difference > 0 ? difference : 0;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Nếu đã thanh toán hoặc đã hủy từ trước thì không cần chạy đồng hồ
        if (booking.isPaid || booking.status === 'Failed' || timeLeft === 0) return;

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);
            if (remaining <= 0) clearInterval(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, [booking, timeLeft]);

    // Format mili-giây sang MM:SS
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // --- LOGIC HIỂN THỊ TRẠNG THÁI ---

    // 1. Đã thanh toán
    if (booking.isPaid || booking.status === 'Success') {
        return (
            <span className='bg-green-600 text-white px-4 py-1.5 mb-3 text-sm rounded-full font-medium whitespace-nowrap flex-shrink-0'>
                Đã thanh toán
            </span>
        );
    }

    // 2. Hết giờ (Do đồng hồ về 0 hoặc trạng thái từ DB là Failed)
    if (timeLeft <= 0 || booking.status === 'Failed') {
        return (
            <span className='bg-red-500 text-white px-4 py-1.5 mb-3 text-sm rounded-full font-medium whitespace-nowrap flex-shrink-0'>
                Đã hủy (Hết hạn)
            </span>
        );
    }

    // 3. Vẫn còn hạn -> Hiện nút thanh toán kèm đồng hồ
    return (
        <div className='flex flex-col items-end'>
            <span className='text-red-400 text-xs font-mono mb-1'>
                Hết hạn sau: {formattedTime}
            </span>
            <button
                onClick={() => handlePayment(booking._id)}
                className='bg-primary px-6 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-red-600 transition-all whitespace-nowrap flex-shrink-0'>
                Thanh toán ngay
            </button>
        </div>
    );
};
// ---------------------------------------------------------

const MyBookings = () => {

    const { axios, getToken, user, image_base_url } = useAppContext()
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getMyBookings = async () => {
        try {
            const { data } = await axios.get('/api/user/bookings', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                // Sắp xếp vé mới nhất lên đầu
                const sortedBookings = data.bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBookings(sortedBookings);
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi tải danh sách vé")
        }
        setIsLoading(false)
    }

    const handlePayment = async (bookingId) => {
        try {
            toast.info("Đang tạo cổng thanh toán...")
            const { data } = await axios.post('/api/booking/payment',
                { bookingId },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );

            if (data.success) {
                window.location.href = data.paymentUrl;
            } else {
                toast.error(data.message);
                // Nếu backend báo lỗi (ví dụ hết hạn), load lại trang để cập nhật trạng thái
                getMyBookings();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getMyBookings()
        }
    }, [user])

    return !isLoading ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='100px' />
            <div>
                <BlurCircle bottom='0px' left='600px' />
            </div>
            <h1 className='text-lg font-semibold mb-4'>Vé của tôi</h1>
            {bookings.map((item, index) => (
                <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8
                border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
                    <div className='flex flex-col md:flex-row'>
                        <img src={image_base_url + item.show.movie.poster_path} alt="" className='md:max-w-45
                        aspect-video h-auto object-cover object-bottom rounded' />
                        <div className='flex flex-col p-4'>
                            <p className='text-lg font-semibold'>{item.show.movie.title}</p>
                            <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
                            <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                        <div className='flex items-center gap-4'>
                            <p className='text-xl font-semibold mb-3 whitespace-nowrap'>{moneyFormat(item.amount)}</p>

                            {/* Sử dụng Component mới ở đây */}
                            <PaymentSection booking={item} handlePayment={handlePayment} />

                        </div>
                        <div className='text-sm'>
                            <p><span className='text-gray-400'>Số lượng vé: </span>{item.bookedSeats.length}</p>
                            <p><span className='text-gray-400'>Số ghế: </span>{item.bookedSeats.join(', ')}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : <Loading />
}

export default MyBookings