"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_Recommended_Nutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detail_Recommended_Nutrition.belongsTo(models.Recommended_Nutrition, {
        foreignKey: "RECOMMENDED_NUTRITION_ID",
      });
    }
  }
  Detail_Recommended_Nutrition.init(
    {
      NAME: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      VALUE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UNIT: {
        type: DataTypes.STRING,
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
      modelName: "Detail_Recommended_Nutrition",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Detail_Recommended_Nutrition;
};
