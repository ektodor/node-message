const mongoose = require("mongoose");
const dotenv = require("dotenv");

// DB 設定
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch((e) => {
    console.log("資料庫連接失敗", e.message);
  });
