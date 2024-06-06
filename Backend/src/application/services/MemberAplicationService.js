const Member = require("../../domain/models/member");
const { hashPassword, comparePassword } = require("../../helper/bcrypt");
const { createToken } = require("../../helper/jwt");
const MemberRepository = require("../../infrastructure/repositories/MemberRepositories");

class MemberApplicationService {
  static async register(name, password, penaltyStatus, penaltyDate) {
    const lastMember = await MemberRepository.getLastMember();
    const lastCode = lastMember ? parseInt(lastMember.code.slice(1)) : 0;
    const newCode = `M${String(lastCode + 1).padStart(3, "0")}`;
    const newMember = new Member(null, newCode, name, password, penaltyStatus, penaltyDate);
    return await MemberRepository.save(newMember);
  }

  static async login(code, name, password) {
    let member;
    if (code) {
      member = await MemberRepository.getByCode(code);
    } else {
      member = await MemberRepository.getByName(name);
    }
    console.log(member);
    if (!member || !comparePassword(password, member.password)) {
      throw { name: "Invalid Member" };
    }
    let token = createToken({
      id: member.id,
      code: member.code,
    });
    return token;
  }

  static async getAllMembers() {
    return await MemberRepository.getAll();
  }

  static async getBorrowedBooksCount(memberId) {
    const member = await MemberRepository.getById(memberId);
    return member;
  }
}

module.exports = MemberApplicationService;
