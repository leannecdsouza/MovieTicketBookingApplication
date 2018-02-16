'use strict';

import mongoose from 'mongoose';

var RatingsendpointSchema = new mongoose.Schema({
  MovieName : String,
  Rating : Number,
  UserId : String
});

export default mongoose.model('Ratingsendpoint', RatingsendpointSchema);
