const { DataTypes } = require("sequelize");

const QuestionListModel = (sequelize) => {
  const QuestionList = sequelize.define(
    "QuestionList",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      CsSubjectId: {
        type: DataTypes.UUID(50),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
    },
    {
      tableName: "QuestionList",
      freezeTableName: true,
      timestamps: false, // 레코드 생성 및 수정 시 타임스탬프 필드 생성하지 않도록 설정
    }
  );
  return QuestionList;
};

module.exports = QuestionListModel;
