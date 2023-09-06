const { DataTypes } = require("sequelize");

const StudyUserModel = (sequelize) => {
  const StudyUser = sequelize.define(
    "StudyUser",
    {
      id: {
        type: DataTypes.UUID(50),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("WAITING", "ALLOWED", "REJECTED"),
        allowNull: false,
        defaultValue: "WAITING",
      },
    },
    {
      tableName: "StudyUser",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return StudyUser;
};

module.exports = StudyUserModel;
