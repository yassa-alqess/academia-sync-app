import { Sequelize } from 'sequelize-typescript';
import logger from '../logger';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  models: [__dirname + '/../../shared/models/*.ts'],
  logging: (query) => logger.info(query),
});

export const syncDatabase = async () => {
  // propagate the error to the server, so we can catch it later
  await sequelize.sync({ alter: true, force: false });
  logger.debug(`connected to ${process.env.DB_NAME} database`);
};

export const closeConnection = async () => {
  await sequelize.close();
  logger.debug('Connection has been closed gracefully');
}

export default sequelize;
