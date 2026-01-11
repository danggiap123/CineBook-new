import axios from 'axios';
import Movie from '../models/Movie.js'; // Đảm bảo import đúng file Movie vừa sửa
import Show from '../models/Show.js';

// Hàm hỗ trợ: Lấy chi tiết phim và Trailer từ TMDB
const fetchAndSaveMovieToDB = async (movieId) => {
    try {
        // Gọi song song API chi tiết và API video
        const [detailRes, videoRes, creditRes] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
                params: { language: 'vi-VN' }
            }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
                headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
            }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
            })
        ]);

        const detail = detailRes.data;
        const videos = videoRes.data.results || [];
        const credits = creditRes.data;

        // Logic tìm Trailer trên YouTube
        const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');
        const trailerLink = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "";

        const newMovie = {
            _id: detail.id.toString(),
            title: detail.title,
            overview: detail.overview || "Đang cập nhật",
            poster_path: detail.poster_path,
            backdrop_path: detail.backdrop_path,
            release_date: detail.release_date,
            original_language: detail.original_language,
            tagline: detail.tagline,
            genres: detail.genres.map(g => g.name),
            casts: credits.cast.slice(0, 10).map(c => ({
                name: c.name,
                character: c.character,
                profile_path: c.profile_path
            })),
            vote_average: detail.vote_average,
            runtime: detail.runtime || 0,
            trailer_link: trailerLink // Lưu link trailer
        };

        // Lưu hoặc cập nhật vào DB
        await Movie.findByIdAndUpdate(newMovie._id, newMovie, { upsert: true, new: true });
        console.log(`✅ Đã lưu phim: ${detail.title} (Có trailer: ${!!trailerLink})`);

        return newMovie;
    } catch (error) {
        console.error(`❌ Lỗi lấy phim ID ${movieId}:`, error.message);
        return null;
    }
};

// API 1: Lấy danh sách phim đang chiếu (Tự động lưu vào DB nếu chưa có)
export const getNowPlayingMovies = async (req, res) => {
    try {
        // Lấy list từ TMDB
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
            params: { language: 'vi-VN', page: 1 }
        });

        const tmdbMovies = data.results;

        // Chạy vòng lặp để đồng bộ dữ liệu vào DB
        // (Dùng map để xử lý bất đồng bộ nhưng không await tất cả để response nhanh hơn cho FE)
        tmdbMovies.forEach(async (movie) => {
            const exists = await Movie.findById(movie.id.toString());
            if (!exists) {
                await fetchAndSaveMovieToDB(movie.id);
            }
        });

        // Trả về dữ liệu ngay cho Frontend đỡ phải chờ lâu
        res.json({ success: true, movies: tmdbMovies });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API 2: Thêm suất chiếu (Đảm bảo phim đã có trong DB)
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;

        // Kiểm tra chắc chắn phim đã có trong DB, nếu chưa thì gọi hàm lấy về
        let movie = await Movie.findById(movieId);
        if (!movie) {
            movie = await fetchAndSaveMovieToDB(movieId);
        }

        if (!movie) {
            return res.json({ success: false, message: "Không thể lấy thông tin phim từ TMDB" });
        }

        // Tạo suất chiếu
        const showsToCreate = [];
        showsInput.forEach(show => {
            show.time.forEach((time) => {
                const dateTimeString = `${show.date}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: []
                });
            });
        });

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({ success: true, message: 'Thêm suất chiếu thành công!' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API 3: Giữ nguyên
export const getShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } })
            .populate('movie') // Chữ 'movie' ở đây là tên field trong Show Schema, ko phải tên Model
            .sort({ showDateTime: 1 });

        const uniqueMovies = new Map();
        shows.forEach(show => {
            if (show.movie) {
                uniqueMovies.set(show.movie._id.toString(), show.movie);
            }
        });

        res.json({ success: true, shows: Array.from(uniqueMovies.values()) });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API 4: Giữ nguyên
export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;
        const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } });
        const movie = await Movie.findById(movieId);

        const dateTime = {};
        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split("T")[0];
            if (!dateTime[date]) dateTime[date] = [];
            dateTime[date].push({ time: show.showDateTime, showId: show._id });
        });

        res.json({ success: true, movie, dateTime });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}