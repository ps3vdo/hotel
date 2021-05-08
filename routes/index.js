const Router = require('express');
const ownerRouter = require('./ownerRoutes');
const petRouter = require('./petsRoutes');
const staffRouter = require('./staffRoutes');
const registration = require('./registrationRoutes');
const placeRoutes = require('./placeRoutes')
const reservationRouting = require('./reservationRouting')
const router = new Router();

router.use('/', ownerRouter);
router.use('/', petRouter);
router.use('/', staffRouter);
router.use('/', placeRoutes);
router.use('/', registration);
router.use('/', reservationRouting);

module.exports = router;