"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BorrowedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BorrowedBook.belongsTo(models.Member, {
        foreignKey: "MemberId",
      });
      BorrowedBook.belongsTo(models.Book, {
        foreignKey: "BookId",
      });
    }
  }
  BorrowedBook.init(
    {
      MemberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "MemberId is required",
          },
          notNull: {
            msg: "MemberId is required",
          },
        },
      },
      BookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "BookId is required",
          },
          notNull: {
            msg: "BookId is required",
          },
        },
      },
      borrowedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      returnedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BorrowedBook",
    }
  );
  return BorrowedBook;
};
