/**
 * Timer model.
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    "name": {
        "type": String,
        "required": true,
    },
    "expirationDate": {
        "type": Date,
        "required": true,
        "index": true,
    },
    "isDeleted": {
        "type": Boolean,
        "default": false,
        "index": true,
    },
}, {
    "timestamp": true,
});

module.exports = mongoose.model('Timer', TimerSchema);
