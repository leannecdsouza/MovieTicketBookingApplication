'use strict';

import mongoose from 'mongoose';

var MoviesintheatreSchema = new mongoose.Schema({
  TheatreName: String,
  MovieName: String,
  Timings: Array,
  Dates: String
});

export default mongoose.model('Moviesintheatre', MoviesintheatreSchema);
