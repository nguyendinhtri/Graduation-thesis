const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const phanLoaiService = {
  createPhanLoai: async (PhanLoai) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Classify.create({
          ...PhanLoai,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Classify successfully!"
            : "Error while create Classify",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllPhanLoai: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Classify.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Menu,
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
            ? "Get list PhanLoai successfully"
            : "Error while get list PhanLoai",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDPhanLoai: async (PhanLoaiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Classify.findOne({
          where: {
            id: PhanLoaiId,
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Classify successfully"
            : "Error while get id Classify",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updatePhanLoai: async (PhanLoai, PhanLoaiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Classify.update(
          {
            ...PhanLoai,
          },
          {
            where: {
              id: PhanLoaiId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Classify successfully"
            : "Error while update Classify",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deletePhanLoai: async (PhanLoaiId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Classify.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: PhanLoaiId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Classify successfully"
            : "Error while delete Classify",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = phanLoaiService;
