const Router = require('express');
const ownerRouter = require('./owner.router');
const petRouter = require('./pet.router')

const router = new Router()

router.use('/owner', ownerRouter);
router.use('/pet', petRouter);

module.exports = router;