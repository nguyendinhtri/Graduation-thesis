const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const createSuccess = require("../helpers/createSuccess");
exports.authenticate = async (req, res, next) => {
  try {
    // console.log(process.env.AUTHENTICATE_TYPE)
    const token =
      req.header("Authorization") || req.params?.token || req.query?.token;
    if (!token) {
      return res.status(400).json({
        status: 400,
        message: "No Authentication header found.",
      });
    }
    //allow token from specific service calls

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
