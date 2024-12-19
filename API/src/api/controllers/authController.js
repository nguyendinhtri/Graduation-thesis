const createSuccess = require("../helpers/createSuccess");
const createError = require("http-errors");

const authService = require("../services/authService");
const userService = require("../services/userService");

const authController = {
  registerUser: async (req, res, next) => {
    try {
      const { status, message } = await userService.createuser(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const { PHONE, PASSWORD, remember } = req.body;
    try {
      let user;
      //connect AD to login
      user = await authService.checkUserExist(user, undefined, PHONE);
      // if (!user) throw createError.NotFound("This user does not exist.")
      if (!user) {
        res
          .status(400)
          // .json(createSuccess(400, "This user does not exist.", {}));
          .json(createSuccess(400, "Người dùng này không tồn tại.", {}));
        return;
      }
      // console.log("User: ", user);
      //login by user database
      const isMatch = await authService.checkMatchPassword(
        PASSWORD,
        user.PASSWORD
      );
      if (!isMatch) {
        // throw createError.BadRequest("Password is incorrect.");
        throw createError.BadRequest("Mật khẩu không đúng.");
      }

      // need to set long time for RefToken rather than Access token for remember me button ?
      user.PASSWORD = undefined;

      res.status(200).json(
        // createSuccess(200, "Login successfully !", {
        createSuccess(200, "Login thành công !", {
          user,
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = authController;
