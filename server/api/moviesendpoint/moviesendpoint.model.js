'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
  MovieName: String,
  Genre: Array,
  Duration: String,
  Language: String,
  Description: String,
  R_date: String,
  Poster: String,
  Status: Boolean
});

export default mongoose.model('Moviesendpoint', MoviesendpointSchema);
