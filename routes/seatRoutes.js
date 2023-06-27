const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

router.get('/', seatController.getAllSeats);
router.get('/:id', seatController.getSeatPricing);

module.exports = router;