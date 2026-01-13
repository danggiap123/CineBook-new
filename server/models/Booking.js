import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, required: true, ref: 'User' },
    email: { type: String, required: true },
    show: { type: String, required: true, ref: 'Show' },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array, required: true },
    isPaid: { type: Boolean, default: false },
    paymentLink: { type: String },

    // --- BỔ SUNG TRƯỜNG STATUS ---
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed', 'Cancelled'],
        default: 'Pending',
        required: true
    },

}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;