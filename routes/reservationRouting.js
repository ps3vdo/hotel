const Router = require('express');
const router = new Router();
const reservationController = require('../controller/reservationController');

router.post('/reservation', reservationController.reservation);

module.exports = router;