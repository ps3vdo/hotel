const Router = require('express');
const ownerRouter = require('./owner.routes');
const petRouter = require('./pets.routes');
const staffRouter = require('./staff.routes');
const registration = require('./registration.routes');
const placeRoutes = require('./place.routes')
const router = new Router();

router.use('/', ownerRouter);
router.use('/', petRouter);
router.use('/', staffRouter);
router.use('/', placeRoutes);
router.use('/', registration);

module.exports = router;