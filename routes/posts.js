const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const postController = require("../controllers/postController");
const User = require("../models/userModel");
const { isAuth } = require("../utils/auth");
// 🚩 [GET]取得所有貼文：{url}/posts
router.get(
  "/",
  isAuth,
  handleErrorAsync(async (req, res) => {
    /*
      #swagger.description = '取得所有貼文',
      #swagger.parameters['timeSort'] = {
        in:'query',
        type: 'string',  
        description: '時間排序，asc 遞增(由小到大，由舊到新)，desc 遞減(由大到小、由新到舊)',
      }
      #swagger.parameters['q'] = {
        in:'query',
        type: 'string',  
        description: '關鍵字',
      }
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/postsResponse' }
      }
    */
    await postController.getPosts(req, res);
  })
);
// 🚩 [GET]取得單一貼文：{url}/posts/{postID}
router.get(
  "/:postId",
  isAuth,
  handleErrorAsync(async (req, res) => {
    /*
      #swagger.description = '取得單一貼文'
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/postsResponse' }
      }
    */
    handleErrorAsync(postController.getPostById(req, res));
  })
);

// 🚩 [POST]新增貼文：{url}/posts
router.post(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '新增貼文',
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/createPosts" }
      }
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/successSchema' }
      }
    */
    await postController.createPost(req, res, next);
  })
);

// 🚩 [POST]新增一則貼文的讚：{url}/posts/{postID}/like
router.post(
  "/:postId/like",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '新增一則貼文的讚'
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
    */
    await postController.addLike(req, res, next);
  })
);
// 🚩 [DELETE]取消一則貼文的讚：{url}/posts/{postID}/unlike
router.delete(
  "/:postId/unlike",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '取消一則貼文的讚'
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
    */
    await postController.cancelLike(req, res, next);
  })
);
// 🚩 [POST]新增一則貼文的留言：{url}/posts/{postID}/comment
router.post(
  "/:postId/comment",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '新增一則貼文的留言',
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/createComments" }
      }
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/successSchema' }
      }
    */
    await postController.createComment(req, res, next);
  })
);
// 🚩 [GET]取得個人所有貼文列表：{url}/post/user/{userID}
router.get(
  "/user/:userId",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '取得個人所有貼文列表'
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/postsResponse' }
      }
    */
    await postController.getUserPosts(req, res, next);
  })
);

// ❌ 刪除個人動態
router.delete("/:id", () => {
  /*
  #swagger.ignore = true
      #swagger.tags = ['Post']
      #swagger.description = '刪除個人動態',
      #swagger.responses[200] = {
        schema: { 
          status: 200,
          message: '刪除貼文',
         }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/components/schemas/errorSchema' }
      }

    */
  handleErrorAsync(postController.deletePost);
});

// ❌ 更新個人動態
router.patch("/:id", () => {
  /*
  #swagger.ignore = true
      #swagger.tags = ['Post']
      #swagger.description = '更新個人動態',


      #swagger.parameters['id'] = { 
        in: 'path',
        description: '貼文 id',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '更新貼文',
        schema: { $ref: '#/components/schemas/updatePosts' }
      }

      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/postsResponse' }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/components/schemas/errorSchema' }
      }

    */
  handleErrorAsync(postController.updatePost);
});

// 🚩 記得要 export router
module.exports = router;
