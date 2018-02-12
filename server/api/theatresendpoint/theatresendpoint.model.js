'use strict';

import mongoose from 'mongoose';

var TheatresendpointSchema = new mongoose.Schema({
  TheatreName: String,
  City: String
});

export default mongoose.model('Theatresendpoint', TheatresendpointSchema);
