const BookApplicationService = require("../application/services/BookAplicationService");

class BookController {
  static async getAllBook(req, res, next) {
    try {
      const books = await BookApplicationService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
