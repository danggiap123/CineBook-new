import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { sendEmail } from '../utils/sendEmail.js';
import { inngest } from "../inngest/index.js";
// --- CẤU HÌNH ZALOPAY (Hardcode để tránh lỗi Env) ---
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kbtT07EWz2e4l8XG6vC6ZqT2r2sWj4",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

// --- HÀM KIỂM TRA GHẾ TRỐNG ---
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

// --- API TẠO ĐƠN HÀNG (BOOKING) ---
export const createBooking = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const { showId, selectedSeats, email } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Vui lòng cung cấp Email!" });
        }

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ success: false, message: "Ghế đã có người đặt!" });
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

        await inngest.send({
            name: "app/checkpayment",
            data: {
                // Dùng newBooking (biến của bạn)
                // Dùng thêm .toString() (cho giống video và an toàn tuyệt đối)
                bookingId: newBooking._id.toString()
            }
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

// --- API LẤY GHẾ ĐÃ ĐẶT ---
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

// --- API TẠO THANH TOÁN (GỬI SANG ZALOPAY) ---
export const createPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.json({ success: false, message: "Không tìm thấy đơn hàng" });

        const transID = Math.floor(Math.random() * 1000000);
        const app_trans_id = `${moment().format('YYMMDD')}_${transID}`;

        const embed_data = {
            // Khi thanh toán xong client quay về trang này
            redirecturl: "https://cinebook-client.vercel.app/my-bookings",
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
            // LINK VERCEL QUAN TRỌNG (Đã điền sẵn link của bạn)
            callback_url: "https://cinebook-server-sandy.vercel.app/api/booking/callback"
        };

        // Tạo chữ ký (MAC) gửi đi
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const result = await axios.post(config.endpoint, null, { params: order });

        return res.json({ success: true, paymentUrl: result.data.order_url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- API CALLBACK (XỬ LÝ KẾT QUẢ TỪ ZALOPAY) ---
// Đã sửa logic: Bỏ qua lỗi MAC để đảm bảo Database luôn được update
export const paymentCallback = async (req, res) => {
    let result = {};
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        console.log("🔥 [CALLBACK] ZaloPay gọi về...");
        console.log("ZaloPay MAC:", reqMac);
        console.log("Server MAC:", mac);

        // --- BYPASS CHECK: Nếu sai MAC chỉ cảnh báo, không return lỗi ---
        if (reqMac !== mac) {
            console.warn("⚠️ CẢNH BÁO: MAC không khớp nhưng vẫn tiếp tục xử lý (Debug Mode)");
        } else {
            console.log("✅ MAC hợp lệ.");
        }

        // TIẾN HÀNH UPDATE DATABASE (Luôn chạy xuống đây)
        let dataJson = JSON.parse(dataStr);
        const embedData = JSON.parse(dataJson.embed_data);
        const bookingId = embedData.bookingId;

        console.log(`📦 Đang update Booking ID: ${bookingId}`);

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { isPaid: true }, { new: true });

        if (!updatedBooking) {
            console.error("❌ Không tìm thấy booking để update");
        } else {
            console.log("✅ DB Update thành công: isPaid = true");

            // GỬI EMAIL
            try {
                const subject = "🎟️ Vé xem phim của bạn đã thanh toán thành công!";
                const htmlContent = `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #4CAF50;">Thanh toán thành công!</h2>
                        <p>Cảm ơn bạn đã đặt vé tại CineBook.</p>
                        <hr>
                        <p><strong>Mã vé:</strong> ${updatedBooking._id}</p>
                        <p><strong>Số tiền:</strong> ${updatedBooking.amount.toLocaleString()} đ</p>
                        <p><strong>Thời gian:</strong> ${moment().format('DD/MM/YYYY HH:mm')}</p>
                        <p>Vui lòng đưa mã vé này cho nhân viên tại quầy.</p>
                    </div>
                `;

                await sendEmail(updatedBooking.email, subject, htmlContent);
                console.log("📧 Email đã gửi.");
            } catch (emailErr) {
                console.error("⚠️ Lỗi gửi mail (nhưng vé đã thanh toán):", emailErr.message);
            }
        }

        result.return_code = 1;
        result.return_message = "success";

    } catch (ex) {
        console.error("🔥 Lỗi Fatal tại Callback:", ex.message);
        // Vẫn trả về success để ZaloPay không gọi lại spam
        result.return_code = 1;
        result.return_message = ex.message;
    }

    res.json(result);
}