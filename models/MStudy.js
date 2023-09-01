const { DataTypes } = require("sequelize");

const StudyModel = (sequelize) => {
  const Study = sequelize.define("Study", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    intro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("WAITING", "ALLOWED", "REJECTED"),
      allowNull: false,
      defaultValue: "WAITING",
    },
    memCurr: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    memTotal: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    leaderId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    },
  });
  return Study;
};

module.exports = StudyModel;
