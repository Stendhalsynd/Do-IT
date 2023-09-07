const { DataTypes } = require("sequelize");

const CsSubjectModel = (sequelize) => {
  const CsSubject = sequelize.define(
    "CsSubject",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "CsSubject",
      freezeTableName: true,
      timestamps: false, // 레코드 생성 및 수정 시 타임스탬프 필드 생성하지 않도록 설정
    }
  );
  return CsSubject;
};

module.exports = CsSubjectModel;
