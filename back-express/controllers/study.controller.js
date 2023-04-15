const db = require("../models")
const Lesson = db.lesson;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Lesson.findAll()
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