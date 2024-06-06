const BorrowedBookApplicationService = require("../application/services/BorrowedBookService");

class BorrowedBookController {
  static async borrowBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const memberId = req.member.id;
      const borrowedBook = await BorrowedBookApplicationService.borrowBook(bookId, memberId);
      res.status(201).json(borrowedBook);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const memberId = req.member.id;
      const returnedBook = await BorrowedBookApplicationService.returnBook(bookId, memberId);
      res.status(200).json(returnedBook);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BorrowedBookController;
