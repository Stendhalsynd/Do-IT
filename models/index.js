"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["development"];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// model
db.Study = require("./MStudy")(sequelize);
db.Theme = require("./MTheme")(sequelize);
db.User = require("./User")(sequelize);

// 관계형성
// 스터디-IT카테고리 1대다

db.Study.hasMany(db.Theme);
db.Theme.belongsTo(db.Study);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// , { foreignKey: "studyId", sourceKey: "id" }
