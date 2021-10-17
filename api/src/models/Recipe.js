const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\-\s\,\(\)\:\']{3,64}$/i,
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\-\s\,\(\)\:\'\.]{15,1000}$/i,
        },
      },
      score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 100,
          min: 0,
        },
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          max: 100,
          min: 0,
        },
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          validStrings: function (arr) {
            arr.forEach((str) => {
              if (!/^[\w\-\s\,\(\)\:\']{3,64}$/i.test(str))
                throw new Error("Invalid string on array");
            });
            return arr;
          },
        },
      },
    },
    {
      timestamps: false,
      createAt: false,
      updatedAt: false,
    }
  );
};
