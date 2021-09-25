const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  sequelize.define("diet", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
