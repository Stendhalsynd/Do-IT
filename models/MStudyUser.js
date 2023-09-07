const { DataTypes } = require("sequelize");

const StudyUserModel = (sequelize) => {
  const StudyUser = sequelize.define(
    "StudyUser",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("LEADER", "CREW", "APPLIER"),
        allowNull: false,
        defaultValue: "LEADER",
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
