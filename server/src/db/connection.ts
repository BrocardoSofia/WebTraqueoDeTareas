import { Sequelize } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('b5fmec0udyndxf0l9sld', 'upm83ojhtpk23o1g', 'W7LK7WcFsIol6cxn05Ln', {
    host: 'b5fmec0udyndxf0l9sld-mysql.services.clever-cloud.com',
    dialect: 'mysql'
  });

  export default sequelize;