import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Show from './models/Show.js';
import Movie from './models/Movie.js'; // Bắt buộc phải import Movie để lấy ID

dotenv.config();

// Cấu hình các khung giờ chiếu và giá vé
const showTimes = ["09:30", "11:00", "13:30", "16:00", "19:00", "21:30", "23:00"];
const prices = [50000, 75000, 90000, 110000]; // Giá vé random

const generateShows = async () => {
    try {
        console.log("🔌 Đang kết nối MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);

        // 1. Kiểm tra xem đang kết nối vào DB nào (để chắc chắn bạn sửa .env đúng)
        console.log(`✅ Đã kết nối vào Database: [ ${mongoose.connection.name} ]`);

        // 2. Lấy danh sách phim đang có trong kho
        const movies = await Movie.find({});

        if (movies.length === 0) {
            console.error("⚠️  CẢNH BÁO: Không tìm thấy phim nào trong Database!");
            console.error("👉 Bạn hãy vào trang Admin (Frontend) để thêm vài phim trước đã.");
            process.exit(1);
        }

        console.log(`🎬 Tìm thấy ${movies.length} bộ phim. Đang tạo lịch chiếu...`);

        // 3. Xóa suất chiếu cũ (để tránh bị trùng lặp rác)
        await Show.deleteMany({});
        console.log("🗑️  Đã dọn dẹp các suất chiếu cũ.");

        const shows = [];
        const today = new Date();

        // 4. Tạo lịch chiếu cho từng phim
        for (const movie of movies) {

            // Tạo cho 7 ngày tới (Tính từ hôm nay)
            for (let i = 0; i < 7; i++) {
                const showDate = new Date(today);
                showDate.setDate(today.getDate() + i);

                // Mỗi ngày random tạo khoảng 3-5 suất chiếu cho mỗi phim
                for (const time of showTimes) {
                    // Tỉ lệ 50/50: Có lúc chiếu, có lúc không (để lịch nhìn tự nhiên hơn)
                    if (Math.random() > 0.5) continue;

                    const [hour, minute] = time.split(':');
                    showDate.setHours(hour, minute, 0, 0);

                    // Đẩy vào mảng chuẩn bị lưu
                    shows.push({
                        movie: movie._id, // Lấy ID thật từ Database (Chính xác 100%)
                        showDateTime: new Date(showDate),
                        showPrice: prices[Math.floor(Math.random() * prices.length)],
                        occupiedSeats: []
                    });
                }
            }
        }

        // 5. Lưu tất cả vào Database
        if (shows.length > 0) {
            await Show.insertMany(shows);
            console.log(`------------------------------------------------`);
            console.log(`🎉 THÀNH CÔNG RỰC RỠ!`);
            console.log(`👉 Đã tạo xong ${shows.length} suất chiếu mới.`);
            console.log(`👉 Hãy vào trang Admin hoặc App để kiểm tra.`);
            console.log(`------------------------------------------------`);
        } else {
            console.log("⚠️ Không tạo được suất nào (Do random quá tay hoặc lỗi logic).");
        }

        process.exit();

    } catch (error) {
        console.error("❌ Lỗi Script:", error);
        process.exit(1);
    }
};

generateShows();