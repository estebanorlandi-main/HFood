const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "RecipeDiets",
    {},
    {
      timestamps: false,
      createAt: false,
      updatedAt: false,
    }
  );
};
