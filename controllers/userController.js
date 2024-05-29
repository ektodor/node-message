const User = require("../models/userModel");
const { successHandler } = require("../utils/handler");
const bcrypt = require("bcryptjs");

const validator = require("validator");
const appError = require("../utils/appError");
const { generateSendJWT } = require("../utils/auth");

const userController = {
  async signUp(req, res, next) {
    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      return appError("400", "欄位請勿空白", next);
    }
    // 密碼 8 碼以上
    if (!validator.isLength(password, { min: 8 })) {
      return appError("400", "密碼字數低於 8 碼", next);
    }
    // 是否為 Email
    if (!validator.isEmail(email)) {
      return appError("400", "Email 格式不正確", next);
    }
    // 加密密碼
    const bcryptPassword = await bcrypt.hash(password, 12);
    // 將加密的密碼存在資料庫 ( 因此資料庫只會有加密過後的密碼 )
    const newUser = await User.create({
      email,
      password: bcryptPassword,
      nickname,
    });
    res.status(201).send({
      status: "success",
      message: "註冊成功",
    });
  },

  async signIn(req, res, next) {
    const { email, password } = req.body;
    // 是否為 Email
    if (!validator.isEmail(email)) {
      return appError(400, "Email 格式不正確", next);
    }
    if (!email || !password) {
      return appError(400, "帳號密碼不可為空", next);
    }
    // 從資料庫取得加密過的密碼，且回傳不顯示密碼
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return appError(400, "查無此帳戶", next);
    }
    // 使用 bcrypt 對比 是否與加密過後的密碼一致
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return appError(400, "您的密碼不正確", next);
    }
    generateSendJWT(user, 200, res);
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const reuslt = await User.findByIdAndDelete(id);
      reuslt
        ? successHandler(res, "成功刪除此用戶", reuslt)
        : errorHandler(res, "查無此用戶");
    } catch (e) {
      errorHandler(res, "查無此用戶");
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      result
        ? successHandler(res, "成功更新用戶資料")
        : errorHandler(res, "查無此用戶");
    } catch (e) {
      errorHandler(res, e.message);
    }
  },
  async uploadUserImg(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      // 導入第三方圖片 API

      const result = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      result
        ? successHandler(res, "成功更新用戶照片")
        : errorHandler(res, "查無此用戶");
    } catch (e) {
      errorHandler(res, e.message);
    }
  },
};

module.exports = userController;
