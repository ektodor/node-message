const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const handleErrorAsync = require("../utils/handleErrorAsync");
const { isAuth } = require("../utils/auth");

// 🚩 註冊
router.post(
  "/sign_up",
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.tags = ['User']
      #swagger.description = '新增用戶',
      #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '新增用戶',
        schema: { $ref: '#/definitions/signUp' }
      }
    */
    /*
    #swagger.responses[200] = {
      schema: {
        status: "success",
        message: "註冊成功",
      }
    }
      */
    /*
    #swagger.responses[400] = {
      schema: { $ref: '#/definitions/errorSchema' }
    }
    */

    await userController.signUp(req, res, next);
  })
);

// 🚩 登入
router.post(
  "/sign_in",
  handleErrorAsync(async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = '登入',
    #swagger.parameters['body'] = {
        in:'body',
        type: 'object',  
        required: true,
        description: '用戶登入',
        schema: { $ref: '#/definitions/signIn' }
    }
    #swagger.responses[200] = {
        schema: { 
          name:'小美',
          token:"abcdefg..."
         }
    }
    #swagger.responses[401] = {
    schema: { 
      status:false,
      message:'你尚未登入'
      }
    }
    */
    await userController.signIn(req, res, next);
  })
);

// 🚩 重設密碼
router.post("/updatePassword", isAuth, (req, res) => {});

// 🚩 取得用戶資料 ?? 如果沒帶參數為自己介面，帶參數視為看別人資料
router.get(
  "/profile",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.security = [{
          "apiKeyAuth": []
        }]  
    */
    res.send("respond with a resource");
  })
);

// 🚩 更新用戶
router.patch("/profile", isAuth, (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = '更新用戶'
  */
});

// 🚩 取得追蹤者
router.post(
  "/:userId/follow",
  isAuth,
  handleErrorAsync(async (req, res) => {})
);
// 🚩 取消追蹤朋友：{url}/users/{userID}/unfollow
router.delete(
  "/:userId/unfollow",
  isAuth,
  handleErrorAsync(async (req, res) => {})
);
// 🚩 取得個人按讚列表：{url}/users/getLikeList
router.get(
  "/getLikeList",
  isAuth,
  handleErrorAsync(async (req, res) => {})
);
// 🚩 取得個人追蹤名單：{url}/users/following
router.get(
  "/following",
  isAuth,
  handleErrorAsync(async (req, res) => {})
);
module.exports = router;
