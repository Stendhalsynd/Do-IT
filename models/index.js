"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/** model */
db.Study = require("./MStudy")(sequelize);
db.Theme = require("./MTheme")(sequelize);
db.User = require("./MUser")(sequelize);
db.StudyUser = require("./MStudyUser")(sequelize);

/** 관계형성 */
// 스터디-IT카테고리 1대다
db.Study.hasMany(db.Theme);
db.Theme.belongsTo(db.Study);

// 스터디-스터디유저 1대다 & 스터디유저-유저 다대1
db.Study.belongsToMany(db.User, { through: db.StudyUser });
db.User.belongsToMany(db.Study, { through: db.StudyUser });
db.Study.hasMany(db.StudyUser);
db.StudyUser.belongsTo(db.Study);
db.User.hasMany(db.StudyUser);
db.StudyUser.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// , { foreignKey: "studyId", sourceKey: "id" }
