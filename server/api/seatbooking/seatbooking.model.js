'use strict';

import mongoose from 'mongoose';

var SeatbookingSchema = new mongoose.Schema({
  Movie: String,
  Theatre: String,
  ShowDate: String,
  ShowTime: String,
  Seats: Array,
  UserName: String,
  UserEmail: String,
  UserCardNumber: String,
  Amount: String
});

export default mongoose.model('Seatbooking', SeatbookingSchema);
