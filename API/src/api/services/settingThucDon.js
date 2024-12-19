const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const congThucService = {
  createCongThuc: async (CongThuc) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { FOOD_ID } = CongThuc;
        const exist = await db.Food.findOne({
          where: {
            FOOD_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Recipe.create({
          ...CongThuc,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Recipe successfully!"
            : "Error while create Recipe",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllCongThuc: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Recipe.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Food,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list CongThuc successfully"
            : "Error while get list CongThuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDCongThuc: async (CongThucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Recipe.findOne({
          where: {
            id: CongThucId,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Food,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Recipe successfully"
            : "Error while get id Recipe",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCongThuc: async (CongThuc, CongThucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Food.findOne({
          where: {
            FOOD_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Recipe.update(
          {
            ...CongThuc,
          },
          {
            where: {
              id: CongThucId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Recipe successfully"
            : "Error while update Recipe",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteCongThuc: async (CongThucId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Recipe.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: CongThucId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Recipe successfully"
            : "Error while delete Recipe",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = congThucService;
