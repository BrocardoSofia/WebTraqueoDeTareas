import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('b5fmec0udyndxf0l9sld', 'upm83ojhtpk23o1g', 'upm83ojhtpk23o1g', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
