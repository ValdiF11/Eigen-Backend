// controllers/MemberController.js
const MemberApplicationService = require("../application/services/MemberAplicationService");

class MemberController {
  static async register(req, res, next) {
    try {
      const { name, password, penaltyStatus, penaltyDate } = req.body;
      const newMember = await MemberApplicationService.register(name, password, penaltyStatus, penaltyDate);
      res.status(201).json(newMember);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { code, name, password } = req.body;
      console.log(code, name, password);
      if ((!code && !name) || !password) {
        throw { name: "Invalid Input" };
      }
      const token = await MemberApplicationService.login(code, name, password);
      res.status(200).json({ acces_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async getAllMembers(req, res, next) {
    try {
      const members = await MemberApplicationService.getAllMembers();
      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailMember(req, res, next) {
    try {
      const memberId = req.params.id;
      const count = await MemberApplicationService.getBorrowedBooksCount(memberId);
      res.status(200).json({ count });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MemberController;
