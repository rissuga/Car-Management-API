'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        foreignKey: 'updatedBy',
        foreignKey: 'deletedBy'
      })
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    available: DataTypes.STRING,
    createdBy : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: "id"
      }
    },
    updatedBy : {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: "id"
      }
    },
    deletedBy : {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Car',
    paranoid: true,
  });
  return Car;
};