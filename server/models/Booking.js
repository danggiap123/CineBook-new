import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, required: true, ref: 'User' },
    email: { type: String, required: true },
    show: { type: String, required: true, ref: 'Show' },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array, required: true },

    // Giữ nguyên isPaid để tương thích code cũ
    isPaid: { type: Boolean, default: false },
    paymentLink: { type: String },

    // --- BỔ SUNG QUAN TRỌNG ---

    // 1. Thêm date (để làm mốc tính 5 phút đếm ngược)
    date: { type: Date, required: true },

    // 2. Thêm status (để hiển thị trạng thái "Đã hủy" ở giao diện)
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending'
    }

}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;