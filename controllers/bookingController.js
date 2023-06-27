const Booking = require('../models/bookingModel');
const {SeatDetails} = require('../models/seatModel');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Creating a booking
exports.createBooking = async (req, res) => {
  const { seatIds, name, phoneNumber } = req.body;
  console.log(seatIds, name, phoneNumber);

  try {
    // Checking if seats are already booked
    const alreadyBookedSeats = await SeatDetails.find({ _id: { $in: seatIds }, isBooked: true });
    if (alreadyBookedSeats.length > 0) {
      return res.status(400).json({ error: 'One or more seats are already booked' });
    }
    var final_price = 0;
    for (let id of seatIds ){
      const res = await fetch(`http://localhost:3000/seats/${id}`)
      const {price} = await res.json();
      final_price += price;
    }

    const booking = new Booking({
      ids:seatIds,
      name,
      phoneNumber,
      price: final_price.toString(),
    });

    // Marking seats as booked
    await SeatDetails.updateMany({ _id: { $in: seatIds } }, { is_booked: true })

    const savedBooking = await booking.save();
    res.status(201).json({ booking: savedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Retrieve bookings by user identifier (email or phone number)
exports.getBookingsByUserIdentifier = async (req, res) => {
  const { userIdentifier } = req.query;
  try {
    if (!userIdentifier) {
      return res.status(400).json({ error: 'User identifier not provided' });
    }

    const bookings = await Booking.find({ $or: [{ email: userIdentifier }, { phoneNumber: userIdentifier }] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
