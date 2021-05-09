const Router = require('express');
const ownerRouter = require('./ownerRoutes');
const petRouter = require('./petsRoutes');
const staffRouter = require('./staffRoutes');
const placeRoutes = require('./placeRoutes')
const reservationRouting = require('./reservationRouting')
const eatRouter = require('./eatRoutes')
const router = new Router();

router.use('/', ownerRouter);
router.use('/', petRouter);
router.use('/', staffRouter);
router.use('/', placeRoutes);
router.use('/', reservationRouting);
router.use('/', eatRouter);

module.exports = router;