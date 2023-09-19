const { constants } = require("../constants");
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation failed",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "not found",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized user",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "server down",
        message: error.message,
        stackTrace: error.stack,
      });
    default:
      console.log("no error");
      break;
  }
};

module.exports = errorHandler;
