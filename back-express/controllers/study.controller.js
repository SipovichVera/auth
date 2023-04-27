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

exports.addCall = (req, res) => {
    console.log(req.body.lessonId);
    Lesson.update({callId: 123}, {
        where: {
            id: req.body?.lessonId
        },
        returning: true
    }).then(([id, lection]) => {
        res.status(201).send(lection[0].dataValues)
    }).catch(err => {
        res.status(404).send({
            message: err.message || 'Lection not found'
        })
    })
}
