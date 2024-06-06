"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../src/helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.hasMany(models.BorrowedBook, {
        foreignKey: "MemberId",
      });
    }
  }
  Member.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "code is required",
          },
          notNull: {
            msg: "code is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name is required",
          },
          notNull: {
            msg: "name is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: 5,
            msg: "Password atleast 5 character",
          },
        },
      },
      penaltyStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: "false",
      },
      penaltyDate: DataTypes.DATE,
      borrowedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Member",
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return Member;
};
