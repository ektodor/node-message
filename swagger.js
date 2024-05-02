const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
const userSchema = require("./schema/userSchema");
const statusSchema = require("./schema/statusSchema");
// host 設定
dotenv.config({ path: "./config.env" });
const host = process.env.URL.replace("<port>", process.env.PORT);
console.log(userSchema);
console.log(statusSchema);
const doc = {
  info: {
    title: "Node Message Api",
    description: "練習使用 swagger 生成 api 文件",
  },
  host,
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "headers",
      name: "authorization",
      description: "請加上 API Token",
    },
  },
  definitions: {
    ...userSchema,
    ...statusSchema,
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
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
