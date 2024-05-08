const Post = require("../models/postModel");
const User = require("../models/userModel");
const { successHandler } = require("../utils/handler");
const appError = require("../utils/appError");

const PostController = {
  getPosts: async (req, res) => {
    const { user } = req;
    // 🚩 順序
    // asc 遞增(由小到大，由舊到新) createdAt ;
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createAt";
    // 🚩 關鍵詞
    const q =
      req.query.q !== undefined
        ? {
            content: new RegExp(req.query.q),
          }
        : {};
    // 🚩 只篩選追蹤者對象的貼文
    if (req.query.isFollowers) {
      q.author = {
        $all: user.followers,
      };
    }
    successHandler(
      res,
      "取得貼文",
      await Post.find(q)
        .populate({
          // 關聯的 key
          path: "author",
          select: "nickname image",
        })
        .sort(timeSort)
    );
  },

  async getPostById(req, res) {
    const { id } = req.params;
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createAt";
    const q =
      req.query.q !== undefined
        ? {
            id,
            content: new RegExp(req.query.q),
          }
        : { id };
    successHandler(
      res,
      "取得貼文",
      await Post.find(q)
        .populate({
          // 關聯的 key
          path: "author",
          select: "nickname image",
        })
        .sort(timeSort)
    );
  },

  createPost: async (req, res) => {
    const { body } = req;
    // 🚩 標題去除空格
    if (body.title) body.title = body.title.trim();
    // 🚩 不用使用 JSON.parse
    successHandler(res, "上傳成功", await Post.create(body));
  },

  deleteAllPosts: async (req, res, next) => {
    // 🚩 單筆刪除沒有輸入 id 會跑來 deleteAllPosts
    if (req.originalUrl == "/posts/") {
      appError(400, "查無此 id", next);
      return;
    }
    successHandler(res, "成功刪除所有貼文", await Post.deleteMany({}));
  },

  // 🚩 deletePost 和 updatePost 的 ID 亂打而非 MongoDB 的格式，會跑 catch
  deletePost: async (req, res) => {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    result
      ? successHandler(res, `刪除 ${id} 貼文`)
      : appError(400, "查無此 id", next);
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const result = await Post.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    result
      ? successHandler(res, "更新成功", result)
      : appError(400, "查無此 id", next);
  },
};

module.exports = PostController;
