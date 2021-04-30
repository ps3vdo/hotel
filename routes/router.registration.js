const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewaree/auth.middleware');
const roleMiddleware = require('../middlewaree/role.middleware');

router.post('/reg', authController.createUser);
router.post('/auth', authController.authorization);

module.exports = router;
