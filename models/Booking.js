import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  doctor: String,
  timeslot: String,
  date: String,
  message: String,
  formType: String, 
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
