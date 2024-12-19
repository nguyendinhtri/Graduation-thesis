const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op, QueryTypes } = require("sequelize");

const bmiService = {
  createBMI: async (BMI) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Bmi.create({
          ...BMI,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create BMI successfully!"
            : "Error while create BMI",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getBMIByUser: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Bmi.findAll({
          where: {
            IS_DELETED: false,
            USER_ID: userId,
          },
          include: [
            {
              model: db.Conclusion_Recommendation,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
          ],
          order: [["WEEK", "DESC"]],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list bmi successfully"
            : "Error while get list bmi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  dashboardByTypeBmi: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.sequelize.query(
          "SELECT NAME, COUNT(Bmis.id) AS `count` FROM Classifies LEFT JOIN Bmis ON Classifies.id = Bmis.CLASSIFICATION_ID GROUP BY Classifies.NAME;",
          {
            type: QueryTypes.SELECT,
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get count user successfully"
            : "Error while get count user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = bmiService;
