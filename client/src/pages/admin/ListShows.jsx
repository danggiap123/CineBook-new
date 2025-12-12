import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { moneyFormat } from '../../lib/moneyFormat';
const ListShows = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true)
    const getAllShows = async () => {
        try {
            setShows([
                {
                    movie: dummyShowsData[0],
                    showDateTime: "2025-06-25T15:30:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_1",
                        A2: "user_2",
                        A3: "user_3"
                    }
                },
                {
                    movie: dummyShowsData[1],
                    showDateTime: "2025-06-30T15:30:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_4",
                        A2: "user_5"
                    }
                },
                {
                    movie: dummyShowsData[2],
                    showDateTime: "2025-06-30T03:30:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_6"
                    }
                },
                {
                    movie: dummyShowsData[3],
                    showDateTime: "2025-07-15T16:30:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_7",
                        A2: "user_8"
                    }
                },
                {
                    movie: dummyShowsData[4],
                    showDateTime: "2025-06-05T15:30:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_9",
                        A2: "user_10"
                    }
                },
                {
                    movie: dummyShowsData[5],
                    showDateTime: "2025-06-20T16:00:00.000Z",
                    showPrice: 50000,
                    occupiedSeats: {
                        A1: "user_11",
                        A2: "user_12"
                    }
                }]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
    }
    useEffect(() => {
        getAllShows();
    }, [])

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
                            even:bg-primary/10'>
                                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                                <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                                <td className='p-2'>{moneyFormat(Object.keys(show.occupiedSeats).length * show.showPrice)}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListShows
