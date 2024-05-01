const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
// 載入資料庫設定
require("./connections/dbConnet");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();

// 載入 cors
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
