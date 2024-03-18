import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import logger from '../logger';

const syncDatabase = async (configService: ConfigService) => {
  const sequelize = new Sequelize(configService.get<string>('database.url'), {
    models: [__dirname + '/../../shared/models/*.ts'],
    logging: (query) => logger.info(query),
  });

  // propagate the error to the server, so we can catch it later
  // create schema if not exists
  await sequelize.query(
    `CREATE SCHEMA IF NOT EXISTS ${configService.get<string>('database.schema')}`,
  );
  await sequelize.sync({ alter: true, force: false });
  logger.debug(
    `connected to ${configService.get<string>('database.name')} database`,
  );

  return sequelize;
};

const ping = async (sequelize: Sequelize) => {
  await sequelize.authenticate();
  logger.debug('Connection has been established successfully.');
};

const closeConnection = async (sequelize: Sequelize) => {
  await sequelize.close();
  logger.debug('Connection has been closed gracefully');
};

export { syncDatabase, ping, closeConnection };
