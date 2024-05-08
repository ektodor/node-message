const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const postController = require("../controllers/postController");
const User = require("../models/userModel");
router.use(async (req, res, next) => {
  const user = await User.findById("66323d58c467a54b968f64c2");
  req.user = user;
  console.log(req.user);
  next();
});

// 🚩 觀看所有動態
router.get(
  "/",
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

router.get("/:id", () => {
  /*
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
});

// 🚩 張貼個人動態
router.post("/", () => {
  /*
      #swagger.tags = ['Post']
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

// 🚩 刪除個人所有動態
router.delete("/", () => {
  /*
      #swagger.tags = ['Post']
      #swagger.description = '刪除個人所有動態',

      #swagger.responses[200] = {
        schema: { 
          status: 200,
          message: '成功刪除所有貼文',
         }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(postController.deleteAllPosts);
});

// 🚩 刪除個人動態
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

// 🚩 更新個人動態
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
