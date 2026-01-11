import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth().userId; // Đúng cú pháp

        const bookings = await Booking.find({ user: userId })
            .populate({
                path: "show",
                populate: { path: "movie" }
            })
            .sort({ createdAt: -1 }); // Sửa lỗi .apply

        res.json({ success: true, bookings });
    } catch (error) {
        console.error("Lỗi lấy vé:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId;
        const user = await clerkClient.users.getUser(userId);

        const metadata = user.privateMetadata || {};
        let favorites = metadata.favorites || [];

        if (!favorites.includes(movieId)) {
            favorites.push(movieId);
        } else {
            favorites = favorites.filter(item => item !== movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { ...metadata, favorites: favorites }
        });

        res.json({ success: true, message: "Đã cập nhật danh sách yêu thích" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getFavorites = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata.favorites || [];

        const movies = await Movie.find({ _id: { $in: favorites } });
        res.json({ success: true, movies });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}