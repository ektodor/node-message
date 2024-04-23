// 🚩 使用 cors 套件所以不用再設定 header
const successHandler = (res, message, data = null) => {
  const response = {
    status: true,
    message,
  };
  if (data) response.data = data;
  // 🚩 默認為 200
  res.send(response);
  res.end();
};

const errorHandler = (res, message, statusCode = 400) => {
  res.status(statusCode).send({
    status: false,
    message,
  });
  res.end();
};

module.exports = { successHandler, errorHandler };
