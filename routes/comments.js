const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const commentController = require("../controllers/commentController");

// 🚩 新增留言
router.post("/", () => {
  /*
      #swagger.tags = ['Comment']
      #swagger.description = '新增留言',

      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '新增留言',
        schema: { 
          $user:'663380c37b78a8155532ce5a',
          $message:'這是留言'
         }
      }

      #swagger.responses[200] = {
        schema: {
          status: true,
          message: "成功",
          data: {
            id: "comment id",
            message: "這是留言",
            user: {
              id: "user id",
              nickname: "小美",
              image: "image url",
            },
          },
          createdAt: "2024-05-02T12:02:11.677Z",
          updatedAt: "2024-05-02T12:02:11.677Z",
        },
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(commentController.createComment);
});

// 🚩 更新留言，此 id 為留言 id
router.patch("/:id", () => {
  /*
      #swagger.tags = ['Comment']
      #swagger.description = '更新留言',

      #swagger.parameters['id'] = { 
        in: 'path',
        description: '留言 id',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '更新留言',
        schema: { 
          $message:'這是更新'
         }
      }

      #swagger.responses[200] = {
        schema: { 
          status: true,
          message: '成功',
          data: {
            id: 'comment id',
            message: '這是更新',
            user: {
              id: 'user id',
              nickname: "小美",
              image: 'image url'
            }
          },
          createdAt: "2024-05-02T12:02:11.677Z",
          updatedAt: "2024-05-02T12:02:11.677Z"
        }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(commentController.updateComment);
});

// 🚩 刪除留言，此 id 為留言 id
router.delete("/:id", () => {
  /*
      #swagger.tags = ['Comment']
      #swagger.description = '更新留言',

      #swagger.parameters['id'] = { 
        in: 'path',
        description: '留言 id',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        schema: { 
          status: true,
          message: '刪除成功'
        }
      }

      #swagger.responses[400] = {
        schema: { $ref: '#/definitions/errorSchema' }
      }

    */
  handleErrorAsync(commentController.deleteCommentById);
});

module.exports = router;
