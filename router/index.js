const Router = require('express');
const router = new Router()
const ownerRouter = require('./owner.router');
const petRouter = require('./pet.router')
router.use('/', ownerRouter);
router.use('/', petRouter);


module.exports = router;