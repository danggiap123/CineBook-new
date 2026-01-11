import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movie: {
        type: String, // QUAN TRỌNG: Để String để khớp với ID phim từ TMDB
        ref: 'Movie',
        required: true
    },
    showDateTime: {
        type: Date,
        required: true
    },
    showPrice: {
        type: Number,
        required: true
    },
    occupiedSeats: {
        type: Array, // QUAN TRỌNG: Phải là Array để lưu danh sách ghế
        default: []
    }
}, { minimize: false });

const Show = mongoose.models.Show || mongoose.model("Show", showSchema);

export default Show;