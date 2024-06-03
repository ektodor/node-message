const User = require("../models/userModel");
const Post = require("../models/postModel");
const { successHandler } = require("../utils/handler");
const bcrypt = require("bcryptjs");

const validator = require("validator");
const appError = require("../utils/appError");
const { generateSendJWT } = require("../utils/auth");

const userController = {
  // 🚩 註冊會員 PS. email 在 model 以設為 unique 所以不用判斷是否重複
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

  // 🚩 登入會員
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
  // 🚩 重設密碼
  async updatePassword(req, res, next) {
    const { id } = req.user;
    const { newPassword, checkNewPassword } = req.body;
    if (newPassword !== checkNewPassword) {
      return appError(400, "密碼不一致", next);
    }
    if (!validator.isLength(newPassword, { min: 8 })) {
      return appError(400, "密碼不得少於8個字", next);
    }
    const bcryptPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findByIdAndUpdate(
      id,
      {
        password: bcryptPassword,
      },
      {
        runValidators: true,
      }
    );
    if (!user) {
      return appError(400, "查無此用戶，更新失敗", next);
    }
    successHandler(res, "密碼更新成功");
  },
  // 🚩 取得個人資料
  async getProfile(req, res, next) {
    const { nickname, sex, image } = req.user;
    successHandler(res, "使用者資料", {
      nickname,
      sex,
      image,
    });
  },
  // 🚩 更新個人資料
  async updateProfile(req, res) {
    const { id } = req.user;
    const { body } = req;
    const result = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    result
      ? successHandler(res, "成功更新用戶資料")
      : appError(400, "查無此用戶", next);
  },
  // 🚩 追蹤朋友
  async followUser(req, res, next) {
    const { id } = req.user;
    const { userId: followerId } = req.params;
    if (id == followerId) {
      return appError(400, "無法追蹤自己", next);
    }
    // 方法 1: findByIdAndUpdate 不支援多條件查詢，所以使用 where 和 ne
    await User.findByIdAndUpdate(
      id,
      {
        $addToSet: { following: { user: followerId } },
      },
      {
        runValidators: true,
      }
    )
      .where("following.user")
      .ne(followerId);
    // 方法 2: updateOne
    await User.updateOne(
      {
        _id: followerId,
        "followers.user": { $ne: id },
      },
      {
        $addToSet: { followers: { user: id } },
      }
    );
    successHandler(res, "追蹤成功");
  },
  // 🚩 取消追蹤朋友
  async unfollowUser(req, res, next) {
    const { id } = req.user;
    const { userId: followerId } = req.params;
    if (id == followerId) {
      return appError(400, "無法退追自己", next);
    }
    // 方法 1
    await User.findByIdAndUpdate(
      id,
      {
        $pull: { following: { user: followerId } },
      },
      {
        runValidators: true,
      }
    );
    // 方法 2
    await User.updateOne(
      {
        _id: followerId,
      },
      {
        $pull: { followers: { user: id } },
      }
    );
    successHandler(res, "退追成功");
  },
  // 🚩 取得個人按讚列表
  async getLikeList(req, res, next) {
    const { id } = req.user;
    const likeList = await Post.find({
      likes: { $in: [id] },
    }).populate({
      path: "user",
      select: "name _id",
    });
    successHandler(res, "取得按讚列表", likeList);
  },
  // 🚩 取得個人追蹤名單
  async getFollowing(req, res, next) {
    const { id } = req.user;
    const followList = await User.find({
      "followers.user": { $in: id },
    });

    successHandler(res, "取得個人追蹤名單", followList);
  },
  // ❌ 註銷
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
};

module.exports = userController;
