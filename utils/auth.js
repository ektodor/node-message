const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const handleErrorAsync = require("../utils/handleErrorAsync");
const appError = require("../utils/appError");

// 規劃為註冊後須重新登入才會生成 JWT
const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });
  res.status(statusCode).send({
    status: "success",
    user: {
      token,
      name: user.name,
    },
  });
};

const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  /*
    #swagger.security = [{
        "bearerAuth": []
    }]  
    #swagger.autoHeaders = false
  */
  const authorization = req.headers.authorization;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return appError(401, "你尚未登入！", next);
  }

  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await User.findById(decoded.id).select("-password");
  // 💡 在 req 添加 user 資料，之後有經過此 middleware 的 api req 會有該資料
  req.user = currentUser;
  next();
});

module.exports = {
  generateSendJWT,
  isAuth,
};
