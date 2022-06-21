const controller = require("../controllers/cars.controller");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  app.post(
    "/api/cars",
    [jsonParser],
    controller.create
  );
  app.get("/api/cars", [jsonParser], controller.findAll);
};




// const jsonParser = bodyParser.json();

// module.exports = app => {
//     const cars = require("../controllers/car.controller.js");
//     let router = require("express").Router();
//     router.post("/", [jsonParser], cars.create);
//     router.get("/", cars.findAll);
//     app.use('/api/cars', [jsonParser], router);
//   };