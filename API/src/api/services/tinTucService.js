const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const tinTucService = {
  createTinTuc: async (tinTuc) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.News.create({
          ...tinTuc,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create News successfully!"
            : "Error while create News",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllTinTuc: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.News.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list TinTuc successfully"
            : "Error while get list TinTuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDTinTuc: async (TinTucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.News.findOne({
          where: {
            id: TinTucId,
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id News successfully"
            : "Error while get id News",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateTinTuc: async (TinTuc, TinTucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.News.update(
          {
            ...TinTuc,
          },
          {
            where: {
              id: TinTucId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update News successfully"
            : "Error while update News",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteTinTuc: async (TinTucId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.News.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: TinTucId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete News successfully"
            : "Error while delete News",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = tinTucService;
