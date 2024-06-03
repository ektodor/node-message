const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const handleErrorAsync = require("../utils/handleErrorAsync");
const { isAuth } = require("../utils/auth");

// 🚩 [POST] 註冊會員：{url}/user/sign_up
router.post(
  "/sign_up",
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '新增會員',
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/signUp" }
      }
      #swagger.responses[200] = {
        schema: {
          status: "success",
          message: "註冊成功",
        }
      }
    */
    await userController.signUp(req, res, next);
  })
);

// 🚩 [POST]登入會員：{url}/users/sign_in
router.post(
  "/sign_in",
  handleErrorAsync(async (req, res, next) => {
    /*
    #swagger.description = '會員登入'
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/signIn" }
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

// 🚩 [PATCH]重設密碼：{url}/users/updatePassword
router.post(
  "/updatePassword",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*

      #swagger.description = '重設密碼'
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/updatePassword" }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
     */
    await userController.updatePassword(req, res, next);
  })
);

// 🚩 [GET]取得個人資料：{url}/users/profile
router.get(
  "/profile",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /* 
      #swagger.security = [{
        "bearerAuth": []
      }] 
      #swagger.description = '取得個人資料'
      #swagger.responses[200] = {
      schema: { 
        status:true,
        message:'使用者資料',
        data:{
          nickname:'小美',
          sex:'female',
          image:'url',
          }
        }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    */
    await userController.getProfile(req, res, next);
  })
);

// 🚩 [PATCH]更新個人資料：{url}/users/profile
router.patch(
  "/profile",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.security = [{
        "bearerAuth": []
      }]  
      #swagger.description = '更新個人資料'
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/updateProfile" }
      }
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    */
    await userController.updateProfile(req, res, next);
  })
);

// 🚩 [POST]追蹤朋友：{url}/users/{userID}/follow
router.post(
  "/:userId/follow",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.security = [{
        "bearerAuth": []
      }]  
      #swagger.description = '追蹤朋友'
      #swagger.parameters['userId'] = {
        in: 'path',
        type: 'string',
        required: true,
      }
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    
    */
    await userController.followUser(req, res, next);
  })
);
// 🚩 [DELETE]取消追蹤朋友：{url}/users/{userID}/unfollow
router.delete(
  "/:userId/unfollow",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.description = '退追朋友'
      #swagger.parameters['userId'] = {
        in: 'path',
        type: 'string',
        required: true,
      }
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    */
    await userController.unfollowUser(req, res, next);
  })
);
// 🚩 [GET]取得個人按讚列表：{url}/users/getLikeList
router.get(
  "/getLikeList",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.security = [{
        "bearerAuth": []
      }]  
      #swagger.description = '取得個人按讚列表'
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    */
    await userController.getLikeList(req, res, next);
  })
);
// 🚩 [GET]取得個人追蹤名單：{url}/users/following
router.get(
  "/following",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.security = [{
        "bearerAuth": []
      }]  
      #swagger.description = '取得個人追蹤名單'
      #swagger.responses[200] = {
       schema: { $ref: '#/components/schemas/successSchema' }
      }
      #swagger.responses[401] = {
      schema: { 
        status:false,
        message:'你尚未登入'
        }
      }
    */
    await userController.getFollowing(req, res, next);
  })
);
module.exports = router;
