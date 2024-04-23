const Post = require("../models/post");
const { successHandler, errorHandler } = require("../utils/handler");

const getAllPosts = async (req, res) => {
  successHandler(res, "取得所有貼文", await Post.find());
};

const createPost = async (req, res) => {
  try {
    const { body } = req;
    // 🚩 不用使用 JSON.parse
    successHandler(res, "上傳成功", await Post.create(body));
  } catch (e) {
    errorHandler(res, `上傳失敗: ${e.message}`);
  }
};

const deleteAllPosts = async (req, res) => {
  successHandler(res, "成功刪除所有貼文", await Post.deleteMany({}));
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await Post.findByIdAndDelete(id);
  result
    ? successHandler(res, `刪除 ${id} 貼文`, result)
    : errorHandler(res, "查無此 id");
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await Post.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    result
      ? successHandler(res, "更新成功", result)
      : errorHandler(res, "查無此 id");
  } catch (e) {
    errorHandler(res, `更新失敗: ${e.message}`);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  deleteAllPosts,
  updatePost,
};
