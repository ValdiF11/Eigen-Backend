const BookRepository = require("../../infrastructure/repositories/BookRepositories");

class BookApplicationService {
  static async getAllBooks() {
    return await BookRepository.getAllBooks();
  }
}

module.exports = BookApplicationService;
