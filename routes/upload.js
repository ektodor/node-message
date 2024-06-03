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
    await uploadController.uploadFile(req, res, next);
  })
);

module.exports = router;
