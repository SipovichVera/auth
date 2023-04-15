module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lesson", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        }
      });
      return Lesson;
}