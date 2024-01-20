"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require('./config.js');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new sequelize_1.Sequelize(config.sequelize1, config.sequelize2, config.sequelize3, {
    host: config.host,
    dialect: 'mysql'
});
exports.default = sequelize;
