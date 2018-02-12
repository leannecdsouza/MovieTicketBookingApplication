'use strict';

import mongoose from 'mongoose';

var RatingsendpointSchema = new mongoose.Schema({
  MovieId : String,
  MovieName : String,
  Rating : String,
  UserId : String
});

export default mongoose.model('Ratingsendpoint', RatingsendpointSchema);
