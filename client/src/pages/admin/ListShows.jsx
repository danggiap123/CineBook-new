import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { moneyFormat } from '../../lib/moneyFormat';
import { useAppContext } from '../../context/AppContext'

const ListShows = () => {

    const { axios, getToken, user } = useAppContext()
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true)

    const getAllShows = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-shows', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setShows(data.shows)
            } else {
                console.error("Failed to fetch shows:", data.message)
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching shows:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getAllShows();
        }
    }, [user])

    return !loading ? (
        <>
            <Title text1="List" text2="Shows" />
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>Tên Phim</th>
                            <th className='p-2 font-medium'>Thời Gian Chiếu</th>
                            <th className='p-2 font-medium'>Số Vé</th>
                            <th className='p-2 font-medium'>Doanh Thu</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm font-light'>
                        {shows.map((show, index) => (
                            <tr key={index} className='border-b border-primary/10 bg-primary/5
                            even:bg-primary/10 hover:bg-primary/20 transition-colors'>

                                {/* 1. Check an toàn cho tên phim */}
                                <td className='p-2 min-w-45 pl-5'>
                                    {show.movie?.title || <span className="text-red-500 italic">Phim đã bị xóa</span>}
                                </td>

                                <td className='p-2'>{dateFormat(show.showDateTime)}</td>

                                {/* 2. Check an toàn cho danh sách ghế */}
                                <td className='p-2'>
                                    {show.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0}
                                </td>

                                {/* 3. Check an toàn khi tính tiền */}
                                <td className='p-2'>
                                    {show.occupiedSeats
                                        ? moneyFormat(Object.keys(show.occupiedSeats).length * show.showPrice)
                                        : moneyFormat(0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListShows