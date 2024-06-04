"use strict";
const fs = require("fs");
const { hashPassword } = require("../src/helper/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./mockData/member.json", "utf-8")).map((item) => {
      item.password = hashPassword(item.password);
      item.createdAt = new Date();
      item.updatedAt = new Date();
      return item;
    });
    await queryInterface.bulkInsert("Members", data);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Members", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
