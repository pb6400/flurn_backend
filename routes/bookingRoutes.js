const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);

// GET /bookings?userIdentifier=<email or phone number>
router.get('/', bookingController.getBookingsByUserIdentifier);

module.exports = router;