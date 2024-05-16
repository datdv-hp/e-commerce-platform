'use strict';

const { HttpStatus, HttpReason } = require('../constants/http.constant');

class ErrorResponse extends Error {
  statusCode;
  errors; // array of response with format {errorCode, key, message}

  constructor(
    message,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors = undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ConflictedError extends ErrorResponse {
  constructor(message = HttpReason.CONFLICT, errors = undefined) {
    super(message, HttpStatus.CONFLICT, errors);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = HttpReason.BAD_REQUEST, errors = undefined) {
    super(message, HttpStatus.BAD_REQUEST, errors);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = HttpReason.NOT_FOUND, errors = undefined) {
    super(message, HttpStatus.NOT_FOUND, errors);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = HttpReason.UNAUTHORIZED, errors = undefined) {
    super(message, HttpStatus.UNAUTHORIZED, errors);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = HttpReason.FORBIDDEN, errors = undefined) {
    super(message, HttpStatus.FORBIDDEN, errors);
  }
}

module.exports = {
  ErrorResponse,
  ConflictedError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};
