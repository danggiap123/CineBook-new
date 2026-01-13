import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// Khởi tạo Inngest Client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// --- PHẦN 1: ĐỒNG BỘ USER 
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = { _id: id, email: email_addresses[0].email_address, name: first_name + " " + last_name, image: image_url }
        await User.create(userData);
    }
)

const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => { await User.findByIdAndDelete(event.data.id); }
)

const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-with-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = { _id: id, email: email_addresses[0].email_address, name: first_name + " " + last_name, image: image_url }
        await User.findByIdAndUpdate(id, userData);
    }
)

// --- PHẦN 2: HỦY VÉ TREO
const releaseSeats = inngest.createFunction(
    { id: 'release-seats-if-unpaid' },
    { event: 'booking/created' },
    async ({ event, step }) => {
        const { bookingId } = event.data;

        // B1: Ngủ đông đúng 5 phút (Inngest tự đếm giờ)
        await step.sleep("5m");

        // B2: Thức dậy kiểm tra
        await step.run('check-payment-and-cancel', async () => {
            const booking = await Booking.findById(bookingId);

            // Nếu vé vẫn còn đó VÀ trạng thái vẫn là 'Pending' (Chưa trả tiền)
            if (booking && booking.status === 'Pending') {
                console.log(`⏳ Đơn hàng ${bookingId} quá hạn 5 phút. Đang hủy...`);

                // 1. Nhả ghế ra khỏi suất chiếu
                await Show.findByIdAndUpdate(booking.showId, {
                    $pull: { occupiedSeats: { $in: booking.bookedSeats } }
                });

                // 2. Đổi trạng thái vé thành 'Failed' (Hủy)
                await Booking.findByIdAndUpdate(bookingId, { status: 'Failed' });

                return { success: true, message: "Booking cancelled automatically" };
            }
            return { success: false, message: "Booking already paid or cancelled" };
        });
    }
);

// --- XUẤT RA TẤT CẢ ---
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeats];