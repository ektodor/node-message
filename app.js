const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
// 載入資料庫設定
require("./connections/dbConnet");
require("./connections/firebase");

const { errorHandler } = require("./utils/handler");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const followersRouter = require("./routes/followers");
const uploadsRouter = require("./routes/upload");

const app = express();

// 🚩程式還是會停掉，但是主要用來記錄 log ，查找到底哪裡發生大問題
process.on("uncaughtException", (err) => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error("Uncaughted Exception！");
  console.error(err.name);
  console.error(err.message);
  // 🚩詳細的錯誤位置，千萬不要傳到前端 (容易被攻擊)
  console.error(err.stack);
  process.exit(1);
});

// 載入 cors
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/upload", uploadsRouter);
app.use("/comments", commentsRouter);
app.use("/followers", followersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404
app.use((req, res, next) => {
  errorHandler(res, "查無此頁面 !!!", 404);
});

// 🚩 Error 處理
// 正式環境 ERR
const errorProd = (err, res) => {
  if (err.isOperational) {
    errorHandler(res, err.message, err.statusCode);
  } else {
    // log 紀錄
    console.error("出現重大錯誤", err);
    errorHandler(res, "系統錯誤，請洽開發人員", 500);
  }
};

// 開發環境 ERR
const errorDev = (err, res) => {
  errorHandler(
    res,
    {
      message: err.message,
      error: err,
      stack: err.stack,
    },
    err.statusCode
  );
};

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // dev
  if (process.env.NODE_ENV == "dev") {
    return errorDev(err, res);
  }

  // production
  if (err.name == "ValidationError" || "SyntaxError") {
    err.statusCode = 400;
    console.log(err);
    err.isOperational = true;
  }

  return errorProd(err, res);
});

// 未捕捉到的 catch
// 🚩(捕捉 promise 的 rejection )假使我們在使用 axios 時，有寫 then 但是沒有寫 catch ，catch 的資訊就會跑到這裡
process.on("unhandledRejection", (reason, promise) => {
  // 記錄於 log 上
  console.error("未捕捉到的 rejection：", promise, "原因：", reason);
});

module.exports = app;
