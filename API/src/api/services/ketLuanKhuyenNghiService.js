const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const ketLuanKhuyenNghiService = {
  createKetLuanKhuyenNghi: async (KetLuanKhuyenNghi) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { CLASSIFICATION_ID } = KetLuanKhuyenNghi;
        const exist = await db.Classify.findOne({
          where: {
            id: CLASSIFICATION_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Conclusion_Recommendation.create({
          ...KetLuanKhuyenNghi,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Conclusion_Recommendation successfully!"
            : "Error while create Conclusion_Recommendation",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllKetLuanKhuyenNghi: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Conclusion_Recommendation.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Classify,
              required: false,
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
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list KetLuanKhuyenNghi successfully"
            : "Error while get list KetLuanKhuyenNghi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getKetLuanKhuyenNghiByValue: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.TYPE !== 2) {
          const { COMPARE } = data;
          const response = await db.Conclusion_Recommendation.findOne({
            where: {
              TYPE: data.TYPE,
              SOSANH: COMPARE,
              IS_DELETED: false,
            },
            include: [
              {
                model: db.Classify,
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
              ? "Get  Conclusion_Recommendation successfully"
              : "Error while get  Conclusion_Recommendation",
            elements: response,
          });
        } else {
          const value = data.VALUE;
          const khoang = data.KHOANG;
          const response = await db.Conclusion_Recommendation.findOne({
            where: {
              [Op.and]: [
                {
                  NHONHAT: {
                    [Op.lte]: value,
                  },
                },
                {
                  LONNHAT: {
                    [Op.gte]: value,
                  },
                },
              ],
              KHOANG: khoang,

              IS_DELETED: false,
            },
            include: [
              {
                model: db.Classify,
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
              ? "Get  Conclusion_Recommendation successfully"
              : "Error while get  Conclusion_Recommendation",
            elements: response,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDKetLuanKhuyenNghi: async (KetLuanKhuyenNghiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Conclusion_Recommendation.findOne({
          where: {
            id: KetLuanKhuyenNghiId,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Classify,
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
            ? "Get id Conclusion_Recommendation successfully"
            : "Error while get id Conclusion_Recommendation",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateKetLuanKhuyenNghi: async (KetLuanKhuyenNghi, KetLuanKhuyenNghiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { CLASSIFICATION_ID } = KetLuanKhuyenNghi;
        const exist = await db.Classify.findOne({
          where: {
            id: CLASSIFICATION_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Conclusion_Recommendation.update(
          {
            ...KetLuanKhuyenNghi,
          },
          {
            where: {
              id: KetLuanKhuyenNghiId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Conclusion_Recommendation successfully"
            : "Error while update Conclusion_Recommendation",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteKetLuanKhuyenNghi: async (KetLuanKhuyenNghiId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Conclusion_Recommendation.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: KetLuanKhuyenNghiId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Conclusion_Recommendation successfully"
            : "Error while delete Conclusion_Recommendation",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = ketLuanKhuyenNghiService;
