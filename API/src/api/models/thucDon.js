"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.Classify, {
        foreignKey: "CLASSIFICATION_ID",
      });
      Menu.hasMany(models.Setting_Menu, {
        foreignKey: "MENU_ID",
      });
    }
  }
  Menu.init(
    {
      PHASE: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DOW: {
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
      modelName: "Menu",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Menu;
};
