"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conclusion_Recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conclusion_Recommendation.belongsTo(models.Classify, {
        foreignKey: "CLASSIFICATION_ID",
      });
      Conclusion_Recommendation.hasMany(models.Bmi, {
        foreignKey: "CONCLUSION_RECOMMENDATION_ID",
      });
    }
  }
  Conclusion_Recommendation.init(
    {
      TYPE: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      RANGE: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MIN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MAX: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      COMPARISON: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CONCLUSION: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      RECOMMENDATION: {
        type: DataTypes.TEXT,
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
      modelName: "Conclusion_Recommendation",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Conclusion_Recommendation;
};
