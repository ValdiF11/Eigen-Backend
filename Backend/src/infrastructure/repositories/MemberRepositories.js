// infrastructure/repositories/MemberRepository.js
const { Member: MemberModel } = require("../../../models");
const Member = require("../../domain/models/member");

class MemberRepository {
  static async getLastMember() {
    const memberData = await MemberModel.findOne({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] },
    });
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async getByCode(code) {
    const memberData = await MemberModel.findOne({ where: { code } });
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async getByName(name) {
    const memberData = await MemberModel.findOne({ where: { name } });
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async getAll() {
    const memberData = await MemberModel.findAll({
      attributes: { exclude: ["password"] },
    });
    return memberData.map(
      (data) => new Member(data.id, data.code, data.name, data.password, data.penaltyStatus, data.penaltyDate, data.borrowedCount)
    );
  }

  static async getById(id) {
    const memberData = await MemberModel.findByPk(id);
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async updateMemberData(penalized) {
    const memberData = await MemberModel.findByPk(penalized.id);
    await memberData.update({ penaltyStatus: penalized.penaltyStatus, penaltyDate: penalized.penaltyDate });
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async incrementBorrowedCount(memberId) {
    const memberData = await MemberModel.findByPk(memberId, {
      attributes: { exclude: ["password"] },
    });
    await memberData.increment("borrowedCount");
    console.log(memberData);
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async decrementBorrowedCount(memberId) {
    const memberData = await MemberModel.findByPk(memberId, {
      attributes: { exclude: ["password"] },
    });
    await memberData.decrement("borrowedCount");
    return new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.password,
      memberData.penaltyStatus,
      memberData.penaltyDate,
      memberData.borrowedCount
    );
  }

  static async save(member) {
    return await MemberModel.create(member);
  }
}

module.exports = MemberRepository;
