const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const { successHandler } = require("../utils/handler");
const appError = require("../utils/appError");

const PostController = {
  // 🚩 [GET]取得所有貼文
  async getPosts(req, res) {
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
        .populate({
          path: "comments user",
        })
        .sort(timeSort)
    );
  },
  // 🚩 [GET]取得單一貼文
  async getPostById(req, res) {
    const { postId } = req.params;
    const post = await Post.find({
      _id: postId,
    })
      .populate({
        // 關聯的 key
        path: "user",
        select: "nickname image",
      })
      .populate({
        path: "comments user",
      });
    successHandler(res, "取得貼文", post);
  },
  // 🚩 [POST]新增貼文
  async createPost(req, res, next) {
    const { id } = req.user;
    const { title, content } = req.body;
    // 🚩 標題去除空格
    if (title) req.body.title = req.body.title.trim();
    // 🚩 不用使用 JSON.parse
    console.log({
      user: id,
      ...req.body,
    });
    await Post.create({
      user: id,
      ...req.body,
    });
    successHandler(res, "上傳成功");
  },
  // 🚩 [POST]新增一則貼文的讚
  async addLike(req, res, next) {
    const { postId } = req.params;
    const likeStatus = await Post.updateOne(
      {
        _id: postId,
        likes: { $ne: postId },
      },
      {
        $addToSet: { likes: [postId] },
      }
    );
    if (!likeStatus.upsertedId) {
      return appError(400, "查無按讚貼文", next);
    }
    successHandler(res, "成功按讚");
  },
  // 🚩 [DELETE]取消一則貼文的讚
  async cancelLike(req, res) {
    const { postId } = req.params;
    const likeStatus = await Post.updateOne(
      {
        _id: postId,
      },
      {
        $pull: { likes: [postId] },
      }
    );
    if (!likeStatus.upsertedId) {
      return appError(400, "查無按讚貼文", next);
    }
    successHandler(res, "成功取消按讚");
  },
  // 🚩 [POST]新增一則貼文的留言
  async createComment(req, res) {
    const { id } = req.user;
    const { postId } = req.params;
    const { body } = req;
    if (!body) {
      return appError(400, "留言不能為空", next);
    }
    await Comment.create({
      user: id,
      post: postId,
      comment: body,
    });
    successHandler(res, "成功新增留言");
  },
  // 🚩 [GET]取得個人所有貼文列表
  async getUserPosts(req, res) {
    const { userId } = req.params;
    const postList = await Post.find({
      user: userId,
    })
      .populate({
        // 關聯的 key
        path: "author",
        select: "nickname image",
      })
      .populate({
        path: "comments user",
      });
    successHandler(res, "成功取得個人所有貼文列表", postList);
  },
};

module.exports = PostController;
