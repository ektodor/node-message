const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 🚩 註冊
router.post("/sign_up", (req, res) => {
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

// 🚩 登入
router.post("/sign_in", (req, res) => {});

// 🚩 重設密碼
router.post("/updatePassword", (req, res) => {});

// 🚩 取得用戶資料 ?? 如果沒帶參數為自己介面，帶參數視為看別人資料
router.get("/profile", function (req, res, next) {
  // #swagger.tags = ['User']

  res.send("respond with a resource");
});

// 🚩 更新用戶
router.patch("/profile", (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = '更新用戶'
  */
});

// 🚩 取得追蹤者

module.exports = router;
