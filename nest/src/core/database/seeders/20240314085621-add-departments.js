/* eslint-disable prettier/prettier */
'use strict';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Department', [
    {
      name: 'CEO',
      description: 'description',
      managing_id: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CTO',
      description: 'description',
      managing_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CFO',
      description: 'description',
      managing_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CMO',
      description: 'description',
      managing_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CTO21',
      description: 'description',
      managing_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CTO21',
      description: 'description',
      managing_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CFO21',
      description: 'description',
      managing_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'CFO22',
      description: 'description',
      managing_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'CMO21',
      description: 'description',
      managing_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      name: 'CMO22',
      description: 'description',
      managing_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),
  // down: async (queryInterface) => {
  //   await queryInterface.bulkDelete('Departments', {[Op.or]: [{name: ''}, {name: ''}]});
  // }
};
