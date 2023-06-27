const { SeatPricing, SeatDetails } = require('../models/seatModel');

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await SeatDetails.find().sort('seat_class');
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
};

// Get seat pricing
exports.getSeatPricing = async (req, res) => {
  const { id } = req.params;
  try {
    const seat = await SeatDetails.find({_id: id});
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }
    const  { seat_class } = seat[0] ;
    const bookingsForClass = await SeatDetails.find({seat_class:seat_class,is_booked:true}).count()
    const seatsInClass = await SeatDetails.find({ seat_class:seat_class }).count();
    const classPrice = await SeatPricing.findOne({seat_class:seat_class});

    var price='0';
    if ((bookingsForClass / seatsInClass) < 0.4) {
      price = classPrice.min_price || classPrice.normal_price || classPrice.max_price;

    } else if ((bookingsForClass / seatsInClass) < 0.6) {

      price = classPrice.normal_price || classPrice.max_price || classPrice.min_price;
    } else {
      price = classPrice.max_price || classPrice.normal_price || classPrice.min_price;
    }
    price = parseInt(price.slice(1));
    res.json({ price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seat pricing' });
  }
};
