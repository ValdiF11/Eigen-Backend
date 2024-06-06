function errorHandler(error, req, res, next) {
  let status = error.status;
  let message = error.message;
  switch (error.name) {
    case "Invalid Input":
      status = 400;
      message = "Code / Name / Password cannot be empty";
      break;
    case "invalid Member":
      status = 401;
      message = "Error login member not found / password not matched";
      break;
    case "Returned":
      status = 400;
      message = "Book already returned";
      break;
    case "Member Penalized":
      status = 400;
      message = "Member is penalized cannot borrow book";
      break;
    case "Limit Exceeded":
      status = 400;
      message = "Member has exceeded the borrowing limit";
      break;
    case "Stock Empty":
      status = 400;
      message = "Book stock is empty";
      break;
    case "Not Found":
      status = 404;
      message = "Error not found";
      break;
    case "Invalid Token":
      status = 401;
      message = "Error Authentication";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Error Authentication";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = error.errors.map((err) => err.message);
      break;
    case "ValidationErrorItem":
      status = 400;
      message = error.errors.map((err) => err.message);
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((err) => err.message);
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  console.log(error.name);
  res.status(status).json({ message });
}

module.exports = errorHandler;
