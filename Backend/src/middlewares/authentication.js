const { verifyToken } = require("../helper/jwt");
const { Member } = require("../../models");

const authentication = async (req, res, next) => {
  try {
    let acces_token = req.headers.authorization;
    if (!acces_token) {
      throw { name: "Invalid Token" };
    }
    let [bearer, token] = acces_token.split(" ");
    if (bearer !== "Bearer") {
      throw { name: "Invalid Token" };
    }
    let payload = verifyToken(token);
    let member = await Member.findByPk(payload.id);
    if (!member) {
      throw { name: "Invalid Token" };
    }
    req.member = {
      id: member.id,
      code: member.code,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
