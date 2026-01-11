import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, // ID phim giữ nguyên từ TMDB
        title: { type: String, required: true },
        overview: { type: String, required: true },
        poster_path: { type: String, required: true },
        backdrop_path: { type: String, required: true },
        release_date: { type: String, required: true },
        original_language: { type: String },
        tagline: { type: String },
        genres: { type: Array, required: true },
        casts: { type: Array, required: true },
        vote_average: { type: Number, required: true },
        runtime: { type: Number, required: true },

        // --- THÊM TRƯỜNG NÀY ĐỂ LƯU LINK TRAILER ---
        trailer_link: { type: String, default: "" },
    },
    { timestamps: true }
)

// --- SỬA LẠI DÒNG NÀY (Quan trọng nhất) ---
// Đổi 'movie' thường thành 'Movie' hoa
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;