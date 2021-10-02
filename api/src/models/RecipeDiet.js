const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "RecipeDiets",
    {
      recipeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      timestamps: false,
      createAt: false,
      updatedAt: false,
    }
  );
};
