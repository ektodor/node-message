const Post = require("../models/postModel");
const User = require("../models/userModel");
const { successHandler } = require("../utils/handler");
const appError = require("../utils/appError");

const PostController = {
  // 🚩 [GET]取得所有貼文
  async getPosts(req, res) {
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
    successHandler(
      res,
      "取得貼文",
      await Post.find(q)
        .populate({
          // 關聯的 key
          path: "user",
          select: "nickname image",
        })
        .sort(timeSort)
    );
  },
  // 🚩 [GET]取得單一貼文
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
  // 🚩 [POST]新增貼文
  async createPost(req, res) {
    const { body } = req;
    // 🚩 標題去除空格
    if (body.title) body.title = body.title.trim();
    // 🚩 不用使用 JSON.parse
    successHandler(res, "上傳成功", await Post.create(body));
  },
  // 🚩 [POST]新增一則貼文的讚
  async addLike(req, res) {},
  // 🚩 [DELETE]取消一則貼文的讚
  async cancelLike(req, res) {},
  // 🚩 [POST]新增一則貼文的留言
  async addComment(req, res) {},
  // 🚩 [GET]取得個人所有貼文列表
  async getAllPost(req, res) {},
};

module.exports = PostController;
