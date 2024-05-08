const User = require("../models/userModel");
const { successHandler, errorHandler } = require("../utils/handler");

const userController = {
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (body.email) body.email = body.email.trim();
      successHandler(res, "新增成功", await User.create(body));
    } catch (e) {
      errorHandler(res, `新增失敗: ${e.message}`);
    }
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
