const Follower = require("../models/followerModel");
const User = require("../models/userModel");
const { successHandler } = require("../utils/handler");
const appError = require("../utils/appError");

const followerController = {
  async getFollowers(req, res) {
    const { user } = req;
    const result = await User.findById(user).populate({
      path: "followers",
    });
    successHandler(res, "取得追蹤對象", result);
  },

  async addFollower(req, res) {
    // body 會是追蹤對象的 id
    const { user, body } = req;
    const follower = await Follower.create(body);
    const result = await User.findByIdAndUpdate(
      user,
      { $push: { followers: follower._id } },
      {
        new: true,
        runValidators: true,
      }
    );
    successHandler(res, "成功追蹤", result);
  },

  async deleteFollower(req, res, next) {},
};

module.exports = followerController;
