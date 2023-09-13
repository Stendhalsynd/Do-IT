const { DataTypes } = require("sequelize");

const StudyModel = (sequelize) => {
  const Study = sequelize.define(
    "Study",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      intro: {
        type: DataTypes.STRING(2500),
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
        defaultValue: 1,
      },
      memTotal: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
      leaderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
    },
    {
      tableName: "Study",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Study;
};

module.exports = StudyModel;
