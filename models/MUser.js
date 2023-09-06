const { DataTypes } = require("sequelize");

// User 테이블 생성
const UserModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false, // NOT NULL
      },
      userId: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      pw: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0, // point 속성의 기본값을 0으로 설정
      },
      link: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      tableName: "User",
      freezeTableName: true,
      timestamps: false, // 레코드 생성 및 수정 시 타임스탬프 필드 생성하지 않도록 설정
    }
  );

  return User;
};

module.exports = UserModel;
