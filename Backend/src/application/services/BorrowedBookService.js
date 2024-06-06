const BorrowedBook = require("../../domain/models/borrowedbook");
const BorrowedBookRepository = require("../../infrastructure/repositories/BorrowedRepositories");
const BookRepository = require("../../infrastructure/repositories/BookRepositories");
const MemberRepository = require("../../infrastructure/repositories/MemberRepositories");

class BorrowedBookApplicationService {
  static async borrowBook(bookId, memberId) {
    console.log(memberId);
    const member = await MemberRepository.getById(memberId);
    console.log(member);
    if (member.penaltyStatus) {
      throw { name: "Member Penalized" };
    }
    if (member.borrowedCount >= 2) {
      throw { name: "Limit Exceeded" };
    }
    const book = await BookRepository.getById(bookId);
    if (book.stock <= 0) {
      throw { name: "Stock Empty" };
    }
    await BookRepository.decrementStock(book);
    await MemberRepository.incrementBorrowedCount(memberId);
    const borrowedBook = new BorrowedBook(null, memberId, bookId, new Date(), null);
    console.log(borrowedBook);
    return await BorrowedBookRepository.save(borrowedBook);
  }

  static async returnBook(BookId, memberId) {
    const borrowedBook = await BorrowedBookRepository.getByMemberId(memberId);
    console.log(BookId);
    console.log(borrowedBook);

    if (borrowedBook.BookId != BookId) {
      throw { name: "Not Found" };
    }
    if (borrowedBook.returnedAt) {
      throw { name: "Returned" };
    }
    const book = await BookRepository.getById(borrowedBook.BookId);
    await BookRepository.incrementStock(book);
    borrowedBook.returnedAt = new Date();
    if (borrowedBook.returnedAt > borrowedBook.borrowedAt.setDate(borrowedBook.borrowedAt.getDate() + 7)) {
      const member = await MemberRepository.getById(memberId);
      member.penaltyStatus = true;
      let penaltyDate = new Date();
      penaltyDate.setDate(penaltyDate.getDate() + 3);
      member.penaltyDate = penaltyDate;
      await MemberRepository.updateMemberData(member);
    }
    await MemberRepository.decrementBorrowedCount(memberId);
    return await BorrowedBookRepository.returnedBook(borrowedBook);
  }

  //   static async getBorrowedBooks(memberId) {
  //     const member = await MemberRepository.getById(memberId);
  //     return await BorrowedBookRepository.getUnreturnedByMemberId(member.id);
  //   }
}

module.exports = BorrowedBookApplicationService;
