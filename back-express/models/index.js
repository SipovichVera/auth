const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    operatorsAliases: false,
    dialect: 'postgres'
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.lesson = require("../models/lesson.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.lesson.belongsToMany(db.user, {
  through: "user_lesson",
  foreignKey: "lessonId",
  otherKey: "userId"
});
db.user.belongsToMany(db.lesson, {
  through: "user_lesson",
  foreignKey: "userId",
  otherKey: "lessonId"
});

db.ROLES = ["user", "admin", "tutor", "student"];
db.LESSON = ["oop", "database"];
module.exports = db;
