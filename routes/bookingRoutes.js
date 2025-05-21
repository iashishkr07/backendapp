import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingsByDoctor,  
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book-appointment", createBooking);
router.get("/bookings", getAllBookings);
router.get("/bookings/:email", getUserBookings);
router.get("bookings/doctor/:doctorName", getBookingsByDoctor)


export default router;
