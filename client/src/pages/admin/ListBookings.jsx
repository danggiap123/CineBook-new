import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { moneyFormat } from '../../lib/moneyFormat'
const ListBookings = () => {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getAllBookings = async () => {
        setBookings(dummyBookingData)
        setIsLoading(false)
    }
    useEffect(() => {
        getAllBookings();
    }, [])
    return !isLoading ? (
        <>
            <Title text1="List" text2="Bookings" />
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md
                overflow-hidden text-nowrap'>
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>Người dùng</th>
                            <th className='p-2 font-medium'>Tên Phim</th>
                            <th className='p-2 font-medium'>Thời gian chiếu</th>
                            <th className='p-2 font-medium'>Ghế ngồi</th>
                            <th className='p-2 font-medium'>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm font-light'>
                        {bookings.map((item, index) => (
                            <tr key={index} className='border-b border-primary/20
                            bg-primary/5 even:bg-primary/10'>
                                <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                                <td className='p-2 '>{item.show.movie.title}</td>
                                <td className='p-2 '>{dateFormat(item.show.showDateTime)}</td>
                                <td className='p-2 '>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(', ')}</td>
                                <td className='p-2 '>{moneyFormat(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListBookings
