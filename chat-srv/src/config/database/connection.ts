import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import logger from '../logger';
import path from 'path';

export const sequelize = (configService: ConfigService) => {
  const modelsPath = path.join(__dirname, '..', '..', 'shared', 'models');
  return new Sequelize(configService.get<string>('database.url'), {
    models: [modelsPath],
  });
};

const syncDatabase = async (configService: ConfigService) => {
  const db = sequelize(configService);
  
  await db.query(
    `CREATE SCHEMA IF NOT EXISTS ${configService.get<string>('database.schema')}`,
  );
  await db.sync({ alter: true, force: false});
  logger.debug(
    `connected to ${configService.get<string>('database.name')} database`,
  );

  return db;
};

const ping = async (db: Sequelize) => {
  await db.authenticate();
  logger.debug('Connection has been established successfully.');
};

const closeConnection = async (db: Sequelize) => {
  await db.close();
  logger.debug('Connection has been closed gracefully');
};

export { syncDatabase, ping, closeConnection };