const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require('./routes/auth.routes')(app);
require('./routes/car.routes')(app);
require('./routes/lesson.routes')(app);
app.use(cors());
const db = require("./models");
const bcrypt = require("bcryptjs");
const Role = db.role;
const Lesson = db.lesson;
const User = db.user;
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    User.create({
        name: "Илья",
        password: bcrypt.hashSync('2281337id', 8),
        surname: "Поух",
        username: "redster652@gmail.com"
    }, {include: Lesson})
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    });
    Role.create({
        id: 3,
        name: "tutor"
    });
    Role.create({
        id: 4,
        name: "student"
    });
    Lesson.create({
        id: 1,
        name: "oop",
        description: "Object-oriented programming (OOP) is a style of programming characterized by the identification of classes of objects closely linked with the methods (functions) with which they are associated."
    });
    Lesson.create({
        id: 2,
        name: "database",
        description: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS)."
    });
}

let corsOptions = {
    origin: "http://localhost:4200"
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
