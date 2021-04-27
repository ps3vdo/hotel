const Router = require('express');
const router = new Router()
const ownerRouter = require('./owner.router');
const petRouter = require('./pet.router')
router.use('/owner', ownerRouter);
router.use('/pet', petRouter);


module.exports = router;