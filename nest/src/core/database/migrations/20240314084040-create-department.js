/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Departments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      managing_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Departments');
  }
};

// export default (sequelize, DataTypes) => {
//   const department = sequelize.define('Department', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     }
//   },
//   {
//     paranoid: true,
//   });
//   return department;
// };