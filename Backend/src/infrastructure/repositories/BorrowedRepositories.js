const { BorrowedBook: BorrowedBookModel } = require("../../../models/");
const BorrowedBook = require("../../domain/models/borrowedbook");

class BorrowedBookRepository {
  static async getAllBorrowedBooks() {
    const borrowedBookData = await BorrowedBookModel.findAll();
    return borrowedBookData.map((data) => new BorrowedBook(data.id, data.MemberId, data.BookId, data.borrowedAt, data.returnedAt));
  }

  static async getByMemberId(memberId) {
    const borrowedBookData = await BorrowedBookModel.findOne({
      where: { MemberId: memberId },
      order: [["id", "DESC"]],
    });
    return new BorrowedBook(
      borrowedBookData.id,
      borrowedBookData.MemberId,
      borrowedBookData.BookId,
      borrowedBookData.borrowedAt,
      borrowedBookData.returnedAt
    );
  }

  static async getByBookId(bookId) {
    const borrowedBookData = await BorrowedBookModel.findOne({ where: { BookId: bookId } });
    return new BorrowedBook(
      borrowedBookData.id,
      borrowedBookData.MemberId,
      borrowedBookData.BookId,
      borrowedBookData.borrowedAt,
      borrowedBookData.returnedAt
    );
  }

  static async getUnreturnedByMemberId(MemberId) {
    const borrowedBookData = await BorrowedBookModel.findAll({ where: { MemberId, returnedAt: null } });
    return borrowedBookData.map((data) => new BorrowedBook(data.id, data.MemberId, data.BookId, data.borrowedAt, data.returnedAt));
  }

  static async save(borrowedBook) {
    return await BorrowedBookModel.create(borrowedBook);
  }

  static async returnedBook(borrowedBook) {
    const borrowedBookData = await BorrowedBookModel.findOne({ where: { id: borrowedBook.id } });
    await borrowedBookData.update({ returnedAt: borrowedBook.returnedAt });
    return new BorrowedBook(
      borrowedBookData.id,
      borrowedBookData.MemberId,
      borrowedBookData.BookId,
      borrowedBookData.borrowedAt,
      borrowedBookData.returnedAt
    );
  }
}

module.exports = BorrowedBookRepository;
