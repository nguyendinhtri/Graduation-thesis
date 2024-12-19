"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recommended_Nutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recommended_Nutrition.hasMany(models.Detail_Recommended_Nutrition, {
        foreignKey: "RECOMMENDED_NUTRITION_ID",
      });
    }
  }
  Recommended_Nutrition.init(
    {
      NAME: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      WEEK: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DATE: {
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
      modelName: "Recommended_Nutrition",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Recommended_Nutrition;
};
