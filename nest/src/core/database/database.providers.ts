/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from './const';
import { databaseConfig } from './database.config';
import { Department } from 'src/structure/department.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Department]);
        await sequelize.sync();
        return sequelize;
    },
}];