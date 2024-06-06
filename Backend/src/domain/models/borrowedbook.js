class BorrowedBook {
  constructor(id, MemberId, BookId, borrowedAt, returnedAt) {
    this.id = id;
    this.MemberId = MemberId;
    this.BookId = BookId;
    this.borrowedAt = borrowedAt || new Date();
    this.returnedAt = returnedAt || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  returnBook() {
    this.returnedAt = new Date();
    this.updatedAt = new Date();
  }

  update(data) {
    if (data.bookId !== undefined) {
      this.bookId = data.bookId;
    }
    if (data.userId !== undefined) {
      this.userId = data.userId;
    }
    if (data.borrowedAt !== undefined) {
      this.borrowedAt = data.borrowedAt;
    }
    if (data.returnedAt !== undefined) {
      this.returnedAt = data.returnedAt;
    }
    // update the updatedAt field
    this.updatedAt = new Date();
  }
}

module.exports = BorrowedBook;
