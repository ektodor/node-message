const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['User']

  res.send("respond with a resource");
});

// 🚩 新增用戶

router.post("/", (req, res) => {
  /*
      #swagger.tags = ['User']
      #swagger.description = '新增用戶',
      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '新增用戶',
        schema: { $ref: '#/definitions/createUser' }
      }
    */
  /*
    #swagger.responses[200] = {
      schema: {
        status: true,
        message: "新增成功",
        data: {
          id: 'abcd123456',
          nickname: '美女',
          email: 'abc@gmail.com',
          sex: 2,
          image: '',
          password: '',
          followers: [],
          like_posts: []
        }
      }
    }
      */
  /*
    #swagger.responses[400] = {
      schema: { $ref: '#/definitions/errorSchema' }
    }
       */
  userController.createUser(req, res);
});

// 🚩 更新用戶
router.patch("/", (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = '更新用戶'
  */
});

// 🚩 取得追蹤者

module.exports = router;
