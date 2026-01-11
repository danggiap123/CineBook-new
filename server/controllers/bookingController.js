import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { sendEmail } from '../utils/sendEmail.js';

// --- CẤU HÌNH ZALOPAY (TEST MODE - APP 2553) ---
// Dùng cứng ở đây để đảm bảo không bị lỗi sai biến môi trường
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kbtT07EWz2e4l8XG6vC6ZqT2r2sWj4", // <--- Key quan trọng nhất để check MAC
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

export const createBooking = async (req, res) => {
    try {
        const userId = req.auth().userId;
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
            email: email,
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

// --- API TẠO THANH TOÁN ---
export const createPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.json({ success: false, message: "Không tìm thấy đơn hàng" });

        const transID = Math.floor(Math.random() * 1000000);
        const app_trans_id = `${moment().format('YYMMDD')}_${transID}`;

        const embed_data = {
            // Khi thanh toán xong client sẽ quay về trang này
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
            // LINK VERCEL CỦA BẠN (Đã điền sẵn)
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

// --- API CALLBACK (XỬ LÝ KẾT QUẢ) ---
export const paymentCallback = async (req, res) => {
    let result = {};
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        // Dùng config.key2 đã khai báo cứng ở trên -> Chắc chắn đúng
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        if (reqMac !== mac) {
            console.error("❌ MAC không khớp! ZaloPay gửi: " + reqMac + " | Server tính: " + mac);
            result.return_code = -1;
            result.return_message = "mac not equal";
        } else {
            console.log("✅ MAC hợp lệ. Tiến hành update DB...");
            let dataJson = JSON.parse(dataStr);
            const embedData = JSON.parse(dataJson.embed_data);
            const bookingId = embedData.bookingId;

            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { isPaid: true }, { new: true });

            if (updatedBooking) {
                // Gửi email
                const subject = "🎟️ Vé xem phim của bạn đã thanh toán thành công!";
                const htmlContent = `
                    <h1>Thanh toán thành công!</h1>
                    <p>Mã vé: <b>${updatedBooking._id}</b></p>
                    <p>Số tiền: ${updatedBooking.amount}</p>
                    <p>Cảm ơn bạn đã đặt vé tại CineBook.</p>
                `;
                await sendEmail(updatedBooking.email, subject, htmlContent);
            }

            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        console.error("Lỗi Callback:", ex.message);
        result.return_code = 0;
        result.return_message = ex.message;
    }

    res.json(result);
}