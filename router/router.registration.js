const Router = require('express');
const router = new Router();
const registration = require('../controller/registration.controller');

router.post('/', registration.createUser);

module.exports = router;
