const multer = require("multer");
const upload = multer({
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("檔案格式錯誤，僅限 jpg、jpeg、png"));
    }
    // cb(錯誤訊息,是否帶檔案)
    cb(null, true);
  },
  // any 為獲取所有資料
}).any();

module.exports = upload;
