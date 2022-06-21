const db = require("../models")
const Car = db.car;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.model || !req.body.mark || !req.body.color || !req.body.price) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const car = {
      model: req.body.model,
      mark: req.body.mark,
      color: req.body.color,      
      price: req.body.price,
      published: req.body.published ? req.body.published : false
    };
    Car.create(car)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error with creating the Car."
        });
      });
    };

exports.findAll = (req, res) => {
    Car.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "can't get data"
        });
        });
    };