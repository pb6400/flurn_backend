const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const seatRoutes = require('./routes/seatRoutes');
require('dotenv').config();


const app = express();
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/bookings', bookingRoutes);
app.use('/seats', seatRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
