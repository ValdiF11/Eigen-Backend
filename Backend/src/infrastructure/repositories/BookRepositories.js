const { Op } = require("sequelize");
const { Book: BookModel } = require("../../../models");
const Book = require("../../domain/models/book");

class BookRepository {
  static async getAllBooks() {
    const bookData = await BookModel.findAll({ where: { stock: { [Op.gt]: 0 } } });
    return bookData.map((data) => new Book(data.id, data.code, data.title, data.author, data.stock, data.createdAt, data.updatedAt));
  }

  static async getById(id) {
    const bookData = await BookModel.findByPk(id);
    return new Book(bookData.id, bookData.code, bookData.title, bookData.author, bookData.stock, bookData.createdAt, bookData.updatedAt);
  }

  static async incrementStock(book) {
    const bookData = await BookModel.findByPk(book.id);
    await bookData.increment("stock");
    return new Book(bookData.id, bookData.code, bookData.title, bookData.author, bookData.stock, bookData.createdAt, bookData.updatedAt);
  }

  static async decrementStock(book) {
    const bookData = await BookModel.findByPk(book.id);
    await bookData.decrement("stock");
    return new Book(bookData.id, bookData.code, bookData.title, bookData.author, bookData.stock, bookData.createdAt, bookData.updatedAt);
  }
}

module.exports = BookRepository;
