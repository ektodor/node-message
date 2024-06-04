const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const { uploadImage } = require("../utils/upload");
const { isAuth } = require("../utils/auth");
const uploadController = require("../controllers/uploadController");

router.post(
  "/file",
  isAuth,
  uploadImage,
  handleErrorAsync(async (req, res, next) => {
    /*
      #swagger.description = '上傳圖片',
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
              schema: { $ref: '#/components/schemas/uploadFile' }
          }
        }
      }
      #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/successSchema' }
      }
    */
    await uploadController.uploadFile(req, res, next);
  })
);

module.exports = router;
