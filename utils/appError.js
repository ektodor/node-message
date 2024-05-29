// 自定義 Error
const appError = (statusCode, errMessage, next) => {
  const err = new Error(errMessage);
  err.statusCode = statusCode;
  // err.isOperational = true;
  next(err);
};

module.exports = appError;
