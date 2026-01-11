import express from 'express';
import { createBooking, getOccupiedSeats, createPayment, paymentCallback } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getOccupiedSeats);

// API Tạo link thanh toán (Cần đăng nhập)
bookingRouter.post('/payment', createPayment);

// API ZaloPay gọi về (Không cần đăng nhập vì ZaloPay gọi)
bookingRouter.post('/callback', paymentCallback);

export default bookingRouter;