const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const dinhDuongService = {
  createDinhDuong: async (DinhDuong) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { FOOD_ID } = DinhDuong;
        const exist = await db.Food.findOne({
          where: {
            id: FOOD_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Nutrition.create({
          ...DinhDuong,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Nutrition successfully!"
            : "Error while create Nutrition",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDinhDuong: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Nutrition.findAll({
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
            ? "Get list DinhDuong successfully"
            : "Error while get list DinhDuong",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDDinhDuong: async (DinhDuongId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Nutrition.findOne({
          where: {
            id: DinhDuongId,
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
            ? "Get id Nutrition successfully"
            : "Error while get id Nutrition",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDinhDuong: async (DinhDuong, DinhDuongId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Food.findOne({
          where: {
            id: DinhDuong?.FOOD_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Nutrition.update(
          {
            ...DinhDuong,
          },
          {
            where: {
              id: DinhDuongId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Nutrition successfully"
            : "Error while update Nutrition",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDinhDuong: async (DinhDuongId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Nutrition.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: DinhDuongId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Nutrition successfully"
            : "Error while delete Nutrition",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = dinhDuongService;
