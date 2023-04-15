const express = require('express');
const router = express.Router();
const user = require('./auth.routes');
const car = require('./car.routes')
const lesson = require('./lesson.routes')

router.use('/user', user);
router.use('/cars', car);
router.use('/lesson', lesson);

module.exports = router;