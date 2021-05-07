const Router = require('express');
const router = new Router();
const authOwnerController = require('../controller/auth.owner.controller');
const authStaffController = require('../controller/auth.staff.controller');
const roleMiddleware = require('../middlewaree/role.middleware');

router.post('/reg', authOwnerController.createUser);
router.post('/auth', authOwnerController.authorization);
router.post('/staff/reg', authStaffController.createStaff);
router.post('/staff/auth', authStaffController.staffAuthorization);

module.exports = router;
