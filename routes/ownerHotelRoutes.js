const Router = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');
const authOwnerController = require('../controller/authOwnerController');

const router = new Router();


module.exports = router;