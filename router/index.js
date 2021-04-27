const Router = require('express');
const ownerRouter = require('./owner.router');
const petRouter = require('./pet.router');
const staffRouter = require('./staff.router');

const router = new Router();

router.use('/', ownerRouter);
router.use('/', petRouter);
router.use('/', staffRouter);

module.exports = router;