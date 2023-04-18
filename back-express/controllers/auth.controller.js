const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Lesson = db.lesson;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        surname: req.body.surname,
    },
        {
            include: Lesson
        })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({user, message: "User was registered successfully!"});
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({user, message: "User was registered successfully!"});
                });
            }

            // user.setLessons([1, 2]).then(() => {
            //
            // });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            let authorities = [];
            // Lesson.addUser({raw: true}).then(_ => console.log(_));
            user.getLessons({raw: true}).then(_ => {
                console.log(_);
            })
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push(roles[i].name);
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
