const { ErrorResponse } = require('../core/error.response');
const { SuccessResponse } = require('../core/success.response');
const { HttpStatus, HttpReason } = require('../constants/http.constant');

function errorHandler(error, _, res, __) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = HttpReason.INTERNAL_SERVER_ERROR;
  let stack = undefined;
  let errors = undefined;
  if (error instanceof ErrorResponse) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (typeof error === 'string') {
    message = error;
  }
  if (process.env.NODE_ENV !== 'production') {
    stack = String(error?.stack);
    console.log(stack);
  }
  return res
    .status(statusCode)
    .json({
      success: false,
      message,
      stack,
      errors,
    })
    .end();
}

const asyncHandler = (fn) => (req, res, next) =>
  fn(req, res, next)
    .then((result) => {
      let statusCode = HttpStatus.OK,
        message = HttpReason.OK,
        data = result;
      if (result instanceof SuccessResponse) {
        statusCode = result.statusCode;
        message = result.message;
        data = result.data;
      }
      return res.status(result.statusCode).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    })
    .catch(next);
module.exports = { errorHandler, asyncHandler };
