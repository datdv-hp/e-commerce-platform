const { HttpStatus, HttpReason } = require('../constants/http.constant');

class SuccessResponse {
  constructor(data, statusCode = HttpStatus.OK, message = HttpReason.OK) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { SuccessResponse };
