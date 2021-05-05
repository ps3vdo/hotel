const Router = require('express');
const ownerRouter = require('./owner.routes');
const petRouter = require('./pet.routes');
const staffRouter = require('./staff.routes');
const registration = require('./registration.routes');

const router = new Router();

router.use('/', ownerRouter);
router.use('/', petRouter);
router.use('/', staffRouter);
router.use('/', registration);

module.exports = router;