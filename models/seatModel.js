const mongoose = require('mongoose');

const seatPrice = new mongoose.Schema({
  id:{type: String},
  seat_class: { type: String, required: true },
  min_price: { type: String },
  normal_price: { type: String },
  max_price: { type: String }
});

const seatDetails = new mongoose.Schema({
  _id:{type:String},
  seat_identifier:{type:String},
  seat_class:{type:String},
  is_booked:{type:Boolean,default:false}
})

const SeatPricing = mongoose.model('SeatsPricing', seatPrice);
const SeatDetails = mongoose.model('Seats',seatDetails);

module.exports = {
  SeatPricing: SeatPricing,
  SeatDetails: SeatDetails
}