"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.hasMany(models.Nutrition, {
        foreignKey: "FOOD_ID",
      });
      Food.hasMany(models.Image_Food, {
        foreignKey: "FOOD_ID",
      });
      Food.hasMany(models.Recipe, {
        foreignKey: "FOOD_ID",
      });
      Food.hasMany(models.Setting_Menu, {
        foreignKey: "FOOD_ID",
      });
    }
  }
  Food.init(
    {
      NAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TYPE: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CREATED_DATE: DataTypes.DATE,
      CREATED_BY: DataTypes.INTEGER,
      MODIFIED_DATE: DataTypes.DATE,
      MODIFIED_BY: DataTypes.INTEGER,
      IS_DELETED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Food",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Food;
};
