'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../../freshness.db`,
});

module.exports=sequelize;
