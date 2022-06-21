module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
      model: {
        type: Sequelize.STRING
      },
      mark: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Car;
  };