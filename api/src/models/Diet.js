const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createAt: false,
      updatedAt: false,
    }
  );
};
