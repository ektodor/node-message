const Post = require("../models/post");
const { successHandler, errorHandler } = require("../utils/handler");

const PostController = {
  getAllPosts: async (req, res) => {
    successHandler(res, "取得所有貼文", await Post.find());
  },

  createPost: async (req, res) => {
    try {
      const { body } = req;
      // 🚩 標題去除空格
      if (body.title) body.title = body.title.trim();
      // 🚩 不用使用 JSON.parse
      successHandler(res, "上傳成功", await Post.create(body));
    } catch (e) {
      errorHandler(res, `上傳失敗: ${e.message}`);
    }
  },

  deleteAllPosts: async (req, res) => {
    // 🚩 單筆刪除沒有輸入 id 會跑來 deleteAllPosts
    if (req.originalUrl == "/posts/") {
      errorHandler(res, "查無此 id");
      return;
    }
    successHandler(res, "成功刪除所有貼文", await Post.deleteMany({}));
  },

  // 🚩 deletePost 和 updatePost 的 ID 亂打而非 MongoDB 的格式，會跑 catch
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Post.findByIdAndDelete(id);
      result
        ? successHandler(res, `刪除 ${id} 貼文`, result)
        : errorHandler(res, "查無此 id");
    } catch (error) {
      errorHandler(res, "查無此 id");
    }
  },

  updatePost: async (req, res) => {
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
  },
};

module.exports = PostController;
