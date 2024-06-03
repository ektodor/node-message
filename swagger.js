const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const dotenv = require("dotenv");
const userSchema = require("./schema/userSchema");
const statusSchema = require("./schema/statusSchema");
const postSchema = require("./schema/postSchema");
// host 設定
dotenv.config({ path: "./config.env" });
const host = process.env.URL.replace("<port>", process.env.PORT);
const doc = {
  info: {
    title: "Node Message Api",
    description: "練習使用 swagger 生成 api 文件",
  },
  servers: [
    {
      url: host, // by default: 'http://localhost:3000'
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        description: "請加上 JWT Token，無須包含 Bearer",
        scheme: "bearer",
      },
    },
    // 排除 authorization 部分
    security: ["./utils/auth.js"],
    schemas: {
      ...userSchema,
      ...statusSchema,
      ...postSchema,
    },
  },
  tags: [
    // by default: empty Array
    {
      name: "User", // Tag name
      description: "用戶相關", // Tag description
    },
    {
      name: "Post",
      description: "文章相關",
    },
    {
      name: "Upload",
      description: "上傳檔案相關",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
