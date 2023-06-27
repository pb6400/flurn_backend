const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ids: { type: mongoose.Schema.Types.Array},
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  price: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

