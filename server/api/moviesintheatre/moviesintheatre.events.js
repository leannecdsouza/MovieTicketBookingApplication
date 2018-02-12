/**
 * Moviesintheatre model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviesintheatre from './moviesintheatre.model';
var MoviesintheatreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviesintheatreEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviesintheatre.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviesintheatreEvents.emit(event + ':' + doc._id, doc);
    MoviesintheatreEvents.emit(event, doc);
  }
}

export default MoviesintheatreEvents;
