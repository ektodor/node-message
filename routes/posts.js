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
      #swagger.tags = ['Post']
      #swagger.description = '查看貼文',
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
      #swagger.parameters['isFollowers'] = {
        in:'query',
        type: 'boolean',  
        description: '是否只看追蹤對象的貼文',
      }
      #swagger.responses[200] = {
        schema: { $ref: '#/definitions/postsResponse' }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }
    */
    await postController.getPosts(req, res);
  })
);
// 🚩 [GET]取得單一貼文：{url}/posts/{postID}
router.get(
  "/postId",
  isAuth,
  handleErrorAsync(async (req, res) => {
    /*
      #swagger.start
      #swagger.tags = ['Post']
      #swagger.description = '查看特定用戶貼文'
      #swagger.parameters['id'] = { 
        in: 'path',
        description: '用戶 id',
        required: true,
        type: 'string',
      }

      #swagger.parameters['q'] = {
        in:'query',
        type: 'string',  
        description: '關鍵字',
      }

      #swagger.parameters['timeSort'] = {
        in: 'query',
        type: 'string',  
        description: '時間排序，asc 由舊到新，desc 由新到舊',
      }


      #swagger.responses[200] = {
        schema: { $ref: '#/definitions/postsResponse' }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
    handleErrorAsync(postController.getPostById);
  })
);

// 🚩 [POST]新增貼文：{url}/posts
router.post("/", isAuth, () => {
  /*
      #swagger.description = '張貼個人動態',

      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '新增貼文',
        schema: { $ref: '#/definitions/createPosts' }
      }

      #swagger.responses[200] = {
        schema: { $ref: '#/definitions/postsResponse' }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(postController.createPost);
});

// 🚩 [POST]新增一則貼文的讚：{url}/posts/{postID}/like
router.get(
  "/:postId/like",
  handleErrorAsync(async (req, res) => {})
);
// 🚩 [DELETE]取消一則貼文的讚：{url}/posts/{postID}/unlike
router.get(
  "/:postId/unlike",
  handleErrorAsync(async (req, res) => {})
);
// 🚩 [POST]新增一則貼文的留言：{url}/posts/{postID}/comment
router.get(
  "/:postId/comment",
  handleErrorAsync(async (req, res) => {})
);
// 🚩 [GET]取得個人所有貼文列表：{url}/post/user/{userID}
router.get(
  "/user/:userId",
  handleErrorAsync(async (req, res) => {})
);

// ❌ 刪除個人動態
router.delete("/:id", () => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = '刪除個人動態',

      #swagger.parameters['id'] = { 
        in: 'path',
        description: '貼文 id',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        schema: { 
          status: 200,
          message: '刪除貼文',
         }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(postController.deletePost);
});

// ❌ 更新個人動態
router.patch("/:id", () => {
  /*
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
        schema: { $ref: '#/definitions/updatePosts' }
      }

      #swagger.responses[200] = {
        schema: { $ref: '#/definitions/postsResponse' }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(postController.updatePost);
});

// 🚩 記得要 export router
module.exports = router;
