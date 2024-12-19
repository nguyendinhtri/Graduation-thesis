"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bmi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bmi.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });
      Bmi.belongsTo(models.Conclusion_Recommendation, {
        foreignKey: "CONCLUSION_RECOMMENDATION_ID",
      });
      Bmi.belongsTo(models.Classify, {
        foreignKey: "CLASSIFICATION_ID",
      });
    }
  }
  Bmi.init(
    {
      HEIGHT: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      WEIGHT_1: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      WEIGHT_2: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      WEIGHT_INCREASE: {
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
      modelName: "Bmi",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Bmi;
};
