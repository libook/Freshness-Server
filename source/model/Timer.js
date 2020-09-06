/**
 * Timer model.
 */

'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../library/sequelize');
const tools = require('../library/tools');

const Timer = sequelize.define('Timer', {
    "id": {
        "type": DataTypes.UUID,
        "defaultValue": DataTypes.UUIDV4,
        "allowNull": false,
        "primaryKey": true,
    },
    "name": {
        "type": DataTypes.STRING,
        "allowNull": false,
    },
    "expirationDate": {
        "type": DataTypes.DATE,
        "allowNull": false,
    },
    "isDeleted": {
        "type": DataTypes.BOOLEAN,
        "defaultValue": false,
        "allowNull": false,
    },
}, {
    "indexes": [
        {
            "name": "Timer-isDeleted-expirationDate",
            "fields": [
                {
                    "attribute": "isDeleted",
                    "order": 'DESC',
                },
                {
                    "attribute": "expirationDate",
                    "order": 'DESC',
                },
            ],
        },
        {
            "name": "Timer-name-isDeleted-expirationDate",
            "fields": [
                {
                    "attribute": "name",
                    "order": 'ASC',
                },
                {
                    "attribute": "isDeleted",
                    "order": 'DESC',
                },
                {
                    "attribute": "expirationDate",
                    "order": 'DESC',
                },
            ],
        },
    ],
});
// "name": {
//     "type": String,
//     "required": true,
// },
// "expirationDate": {
//     "type": Date,
//     "required": true,
//     "index": true,
// },
// "isDeleted": {
//     "type": Boolean,
//     "default": false,
//     "index": true,
// },

Timer.sync();

module.exports = Timer;
