
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password, port } = config.db;

//ORM??

export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: false
})