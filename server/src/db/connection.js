import { Sequelize } from 'sequelize';

const config = require('./config.js');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.sequelize1, config.sequelize2, config.sequelize3, {
    host: config.host,
    dialect: 'mysql'
  });

  export default sequelize;