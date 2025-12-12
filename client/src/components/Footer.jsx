import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
                <div className="md:max-w-96">
                    <img alt="" class="h-50 w-50" src={assets.logo} />
                    <p className="mt-6 text-sm">
                        CineBook là nền tảng đặt vé xem phim trực tuyến hiện đại, giúp bạn dễ dàng tìm kiếm lịch chiếu,
                        cập nhật thông tin phim mới nhất và lựa chọn chỗ ngồi yêu thích chỉ trong vài cú nhấp chuột. Chúng tôi mang đến trải nghiệm đặt vé nhanh chóng, an toàn và tiện lợi.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <img src={assets.googlePlay} alt="google play" className="h-10 w-auto border border-white rounded" />
                        <img src={assets.appStore} alt="app store" className="h-10 w-auto border border-white rounded" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>

                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>0869435425</p>
                            <p>giap100404@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © DangGiap. All Right Reserved.
            </p>
        </footer>
    )
}

export default Footer
