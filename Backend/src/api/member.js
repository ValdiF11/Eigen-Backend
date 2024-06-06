// routes/member.js
const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");
const authentication = require("../middlewares/authentication");
const swagger = require("../../swagger");

/**
 * @swagger
 * /member:
 *   get:
 *     summary: Retrieve a list of members
 *     description: Retrieve a list of members from the repository.
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
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
 * /member/:id:
 *   get:
 *     summary: Retrieve a member
 *     description: Retrieve a member from the repository.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the member to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A member.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Member'
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

router.get("/", authentication, MemberController.getAllMembers);
router.get("/:id", authentication, MemberController.getDetailMember);

module.exports = router;
