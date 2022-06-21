const express = require('express');
const router = express.Router();
const user = require('./auth.routes');
const car = require('./car.routes')

router.use('/user', user);
router.use('/cars', car);

module.exports = router;