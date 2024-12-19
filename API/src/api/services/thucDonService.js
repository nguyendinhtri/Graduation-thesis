const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const thucDonService = {
  createThucDon: async (ThucDon) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { CLASSIFICATION_ID } = ThucDon;
        const exist = await db.Classify.findOne({
          where: {
            id: CLASSIFICATION_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Menu.create({
          ...ThucDon,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Menu successfully!"
            : "Error while create Menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  SettingThucDon: async (setting) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { FOOD_ID, MENU_ID } = setting;
        const existThucDon = await db.Menu.findOne({
          where: {
            id: MENU_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        const existMonAn = await db.Food.findOne({
          where: {
            id: FOOD_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!existThucDon) throw createError.Conflict("thuc don not exists");
        if (!existMonAn) throw createError.Conflict("mon an not exists");
        const response = await db.Setting_Menu.create({
          ...setting,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Setting_Menu successfully!"
            : "Error while create Setting_Menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteSettingThucDon: async (ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Setting_Menu.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete setting Menu successfully"
            : "Error while delete setting Menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllThucDon: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Menu.findAll({
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
            },
            {
              model: db.Setting_Menu,
              required: false,
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
                  include: [
                    {
                      model: db.Nutrition,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                    {
                      model: db.Recipe,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                    {
                      model: db.Image_Food,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list ThucDon successfully"
            : "Error while get list ThucDon",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllByQueryThucDon: async (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Menu.findAll({
          where: {
            ...query,
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
            {
              model: db.Setting_Menu,
              required: false,
              where: {
                IS_DELETED: false,
              },
              attributes: ["FOOD_ID"],
              include: [
                {
                  model: db.Food,
                  required: false,
                  where: {
                    IS_DELETED: false,
                  },
                  include: [
                    {
                      model: db.Nutrition,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                    {
                      model: db.Recipe,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                    {
                      model: db.Image_Food,
                      required: false,
                      where: {
                        IS_DELETED: false,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list ThucDon successfully"
            : "Error while get list ThucDon",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDThucDon: async (ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Menu.findOne({
          where: {
            id: ThucDonId,
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
            ? "Get id Menu successfully"
            : "Error while get id Menu",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateThucDon: async (ThucDon, ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Classify.findOne({
          where: {
            id: ThucDon?.CLASSIFICATION_ID,
            IS_DELETED: false,
          },
          raw: true,
        });
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Menu.update(
          {
            ...ThucDon,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Menu successfully"
            : "Error while update Menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteThucDon: async (ThucDonId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Menu.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Menu successfully"
            : "Error while delete Menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = thucDonService;
