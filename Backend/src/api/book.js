const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");
const authentication = require("../middlewares/authentication");
const swagger = require("../../swagger");

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Retrieve a list of books from the repository. Can be used to populate a list of books when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
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
 */

router.get("/", authentication, BookController.getAllBook);

module.exports = router;
