/**
 * Ratingsendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Ratingsendpoint from './ratingsendpoint.model';
var RatingsendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RatingsendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ratingsendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RatingsendpointEvents.emit(event + ':' + doc._id, doc);
    RatingsendpointEvents.emit(event, doc);
  }
}

export default RatingsendpointEvents;
