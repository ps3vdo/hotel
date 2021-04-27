const Router = require('express');
const ownerRouter = require('./owner.router');
const petRouter = require('./pet.router')

const router = new Router()

router.use('/', ownerRouter);
router.use('/', petRouter);

module.exports = router;