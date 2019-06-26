import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configuration from '../config/sequelize';
import logger from '../helpers/logger';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configuration[env];

const db = {};
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  logging: logger.info.bind(logger),
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
