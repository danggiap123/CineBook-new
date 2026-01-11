import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { sendEmail } from '../utils/sendEmail.js'; // <--- Import hàm gửi mail

// --- CẤU HÌNH ZALOPAY (TEST MODE) ---
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kbtT07EWz2e4l8XG6vC6ZqT2r2sWj4",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) return false;
        const occupiedSeats = showData.occupiedSeats || [];
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats.includes(seat));
        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// --- 1. SỬA HÀM TẠO BOOKING (Lưu thêm Email) ---
export const createBooking = async (req, res) => {
    try {
        const userId = req.auth().userId;
        // Lấy thêm email từ frontend gửi lên
        const { showId, selectedSeats, email } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Vui lòng cung cấp Email để nhận vé!" });
        }

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ success: false, message: "Ghế bạn chọn đã có người đặt rồi!" });
        }

        const showData = await Show.findById(showId);
        if (!showData) return res.json({ success: false, message: "Suất chiếu không tồn tại" });

        const newBooking = await Booking.create({
            user: userId,
            email: email, // <--- Lưu email vào đây
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
            date: new Date()
        });

        await Show.findByIdAndUpdate(showId, {
            $push: { occupiedSeats: { $each: selectedSeats } }
        });

        res.json({ success: true, message: 'Đặt vé thành công!', bookingId: newBooking._id });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);
        const occupiedSeats = showData ? (showData.occupiedSeats || []) : [];
        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// --- 2. API TẠO THANH TOÁN (Giữ nguyên, chỉ sửa callback url nếu cần) ---
export const createPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.json({ success: false, message: "Không tìm thấy đơn hàng" });

        const transID = Math.floor(Math.random() * 1000000);
        const app_trans_id = `${moment().format('YYMMDD')}_${transID}`;

        const embed_data = {
            redirecturl: "http://localhost:5173/my-bookings",
            bookingId: booking._id
        };

        const items = [{}];
        const order = {
            app_id: config.app_id,
            app_trans_id: app_trans_id,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: booking.amount,
            description: `Thanh toan ve phim #${bookingId}`,
            bank_code: "",
            // LƯU Ý: Khi deploy lên mạng thì thay link này bằng link thật
            callback_url: "https://cinebook-server-sandy.vercel.app/api/booking/callback"
        };

        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const result = await axios.post(config.endpoint, null, { params: order });

        return res.json({ success: true, paymentUrl: result.data.order_url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- 3. CALLBACK (Xử lý gửi mail khi thanh toán thành công) ---
export const paymentCallback = async (req, res) => {
    let result = {};
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        if (reqMac !== mac) {
            result.return_code = -1;
            result.return_message = "mac not equal";
        } else {
            // Thanh toán thành công
            let dataJson = JSON.parse(dataStr);
            const embedData = JSON.parse(dataJson.embed_data);
            const bookingId = embedData.bookingId;

            // Cập nhật trạng thái đã thanh toán
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { isPaid: true }, { new: true });

            if (updatedBooking) {
                console.log(`✅ Đã thanh toán thành công đơn hàng: ${bookingId}`);

                // --- GỬI EMAIL ---
                const subject = "🎟️ Vé xem phim của bạn đã thanh toán thành công!";
                const htmlContent = `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
                        <h2 style="color: #e50914;">CineBook - Xác nhận đặt vé</h2>
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                        <hr>
                        <h3>Thông tin vé:</h3>
                        <ul>
                            <li><b>Mã đặt chỗ:</b> ${updatedBooking._id}</li>
                            <li><b>Ghế:</b> ${updatedBooking.bookedSeats.join(', ')}</li>
                            <li><b>Tổng tiền:</b> ${updatedBooking.amount.toLocaleString('vi-VN')} đ</li>
                            <li><b>Trạng thái:</b> Đã thanh toán</li>
                        </ul>
                        <p>Vui lòng đưa mã này cho nhân viên khi đến rạp.</p>
                    </div>
                `;

                // Gọi hàm gửi mail (lấy email từ booking vừa lưu)
                await sendEmail(updatedBooking.email, subject, htmlContent);
            }

            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0;
        result.return_message = ex.message;
        console.log("Callback Error:", ex.message);
    }

    res.json(result);
}