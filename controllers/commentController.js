const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { successHandler } = require("../utils/handler");
const appError = require("../utils/appError");

const commentController = {
  async getCommentByPost(req, res) {},

  // id 為留言 id
  async deleteCommentById(req, res, next) {
    const { id } = req.params;
    const result = await Comment.findByIdAndDelete(id);
    result
      ? successHandler(res, `刪除 ${id} 貼文`, result)
      : appError(400, "查無此 id", next);
  },

  async createComment(req, res) {
    // body.id 為貼文 id
    const { body, user } = req;
    const comment = await Comment.create({
      user,
      message: body.message,
    });
    const result = await Post.findByIdAndUpdate(
      body.id,
      { $push: { comments: comment._id } },
      {
        new: true,
        runValidators: true,
      }
    );
    successHandler(res, "成功新增留言", result);
  },

  // id 為留言 id
  async updateComment(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    const comment = await Comment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    comment
      ? successHandler(res, "更新成功", comment)
      : appError(400, "查無此 id", next);
  },
};

module.exports = commentController;
