/* eslint-disable prettier/prettier */
import { Department } from './department.entity';

export const departmentProviders = [{
    provide: 'USER_REPOSITORY',
    useValue: Department,
}];