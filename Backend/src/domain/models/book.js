class Book {
  constructor(id, code, title, author, stock, createdAt, updatedAt) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.author = author;
    this.stock = stock;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  update(data) {
    if (data.code !== undefined) {
      this.code = data.code;
    }
    if (data.title !== undefined) {
      this.title = data.title;
    }
    if (data.author !== undefined) {
      this.author = data.author;
    }
    if (data.stock !== undefined) {
      this.stock = data.stock;
    }
    this.updatedAt = new Date();
  }

  checkStock() {
    return this.stock > 0;
  }

  borrowBook() {
    if (this.checkStock()) {
      this.stock--;
      this.updatedAt = new Date();
      return true;
    }
    return false;
  }

  returnBook() {
    this.stock++;
    this.updatedAt = new Date();
  }
}

module.exports = Book;
