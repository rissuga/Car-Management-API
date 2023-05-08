"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, {
      //   foreignKey: 'createdBy',
      //   foreignKey: 'updatedBy',
      //   foreignKey: 'deletedBy'
      // })
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      // createdBy : {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'User',
      //     key: "id"
      //   }
      // },
      // updatedBy : {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'User',
      //     key: "id"
      //   }
      // },
      // deletedBy : {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'User',
      //     key: "id"
      //   }
      // },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
