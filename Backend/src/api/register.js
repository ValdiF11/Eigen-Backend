const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");
const swagger = require("../../swagger");

/**
 * @swagger
 *  /register:
 *   post:
 *     summary: "Register a user and return data user"
 *     description: "Register user with code, name, and password."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "M001"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Successful register"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: integer
 *                  format: int64
 *                code:
 *                  type: string
 *                name:
 *                  type: string
 *                password:
 *                  type: string
 *                penaltystatus:
 *                  type: boolean
 *                penaltydate:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *
 *       400:
 *         description: "Bad Request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Code is Required, Name is Required, Password is Required, Password must be at least 6 characters"
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
 */

router.post("/", MemberController.register);

module.exports = router;
