'use strict';

import mongoose from 'mongoose';

var SeatbookingSchema = new mongoose.Schema({
  Movie: String,
  Theatre: String,
  ShowDate: String,
  ShowTime: String,
  Seats: Array
});

export default mongoose.model('Seatbooking', SeatbookingSchema);
