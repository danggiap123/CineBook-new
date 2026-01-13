import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { moneyFormat } from '../lib/moneyFormat'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const MyBookings = () => {

    const { axios, getToken, user, image_base_url } = useAppContext()
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Hàm gọi API lấy danh sách vé
    const getMyBookings = async () => {
        try {
            const { data } = await axios.get('/api/user/bookings', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setBookings(data.bookings)
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi tải danh sách vé")
        }
        setIsLoading(false)
    }

    // Hàm xử lý thanh toán
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

                            {/* --- ĐÃ SỬA Ở ĐÂY --- */}
                            {!item.isPaid ? (
                                <button
                                    onClick={() => handlePayment(item._id)}
                                    className='bg-primary px-6 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-red-600 transition-all whitespace-nowrap flex-shrink-0'>
                                    Thanh toán ngay
                                </button>
                            ) : (
                                <span className='bg-green-600 text-white px-4 py-1.5 mb-3 text-sm rounded-full font-medium whitespace-nowrap flex-shrink-0'>
                                    Đã thanh toán
                                </span>
                            )}
                            {/* ------------------- */}

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