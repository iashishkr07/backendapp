import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email }).sort({ date: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error });
  }
};

export const getBookingsByDoctor = async (req, res) => {
  try {
    const { doctorName } = req.params;

    const bookings = await Booking.find({
      doctor: { $regex: doctorName, $options: 'i' }
    }).sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by doctor:", error);
    res.status(500).json({ message: "Error fetching bookings by doctor", error });
  }
};

