"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      // createdBy: {
      //   type:  Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: {
      //       tableName: 'Users'
      //     },
      //     key: "id"
      //   }
      // },
      // updatedBy: {
      //   type:  Sequelize.INTEGER,
      //   references: {
      //     model: {
      //       tableName: 'Users'
      //     },
      //     key: "id"
      //   }
      // },
      // deletedBy: {
      //   type:  Sequelize.INTEGER,
      //   references: {
      //     model: {
      //       tableName: 'Users'
      //     },
      //     key: "id"
      //   }
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
