const { v4: uuid } = require("uuid");
const firebaseAdmin = require("firebase-admin");
const bucket = firebaseAdmin.storage().bucket();
const appError = require("../utils/appError");
const { successHandler } = require("../utils/handler");

const uploadController = {
  async uploadFile(req, res, next) {
    if (!req.files.length) {
      return appError(400, "尚未上傳檔案", next);
    }
    // 取得上傳的檔案資訊列表裡面的第一個檔案
    const file = req.files[0];
    // 加上 uuid 做命名，並擷取原始檔案格式名稱
    const blob = bucket.file(
      `images/${uuid()}.${file.originalname.split(".").pop()}`
    );
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();

    // 註冊監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on("finish", () => {
      // 設定檔案的存取權限
      const config = {
        action: "read", // 權限
        expires: "12-31-2500", // 網址的有效期限
      };
      // 取得檔案的網址
      blob.getSignedUrl(config, (err, fileUrl) => {
        successHandler(res, "上傳成功", fileUrl);
      });
    });

    // 註冊監聽，如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on("error", (err) => {
      return appError(500, "上傳失敗", next);
    });

    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer);
  },
};

module.exports = uploadController;
