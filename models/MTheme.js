const { DataTypes } = require("sequelize");

const ThemeModel = (sequelize) => {
  const Theme = sequelize.define("Theme", {
    id: {
      type: DataTypes.UUID(50),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  return Theme;
};
module.exports = ThemeModel;
