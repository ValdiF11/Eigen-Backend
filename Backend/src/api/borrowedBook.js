const express = require("express");
const router = express.Router();
const BorrowedBookController = require("../controllers/BorrowedController");
const authentication = require("../middlewares/authentication");
const swagger = require("../../swagger");

/**
 * @swagger
 * /booklend/borrow/:bookId:
 *   post:
 *     summary: Borrow a book
 *     description: Borrow a book from the repository.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         description: ID of the book to borrow
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Succes Borrow a book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookLending'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member is penalized cannot borrow book, Member has exceeded the borrowing limit, Book stock is empty"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error Authentication"
 *       500:
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *     security:
 *       - bearerAuth: []
 * /booklend/return/:bookId:
 *   get:
 *     summary: Return a book
 *     description: Return a book from the repository.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         description: ID of the book to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Success return book.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/BookLending'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book already returned"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error Authentication"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error not found"
 *       500:
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *     security:
 *       - bearerAuth: []
 */

router.post("/borrow/:bookId", authentication, BorrowedBookController.borrowBook);
router.patch("/return/:bookId", authentication, BorrowedBookController.returnBook);

module.exports = router;
