const Router = require('express');
const router = new Router();
const authOwnerController = require('../controller/authOwnerController');
const authStaffController = require('../controller/authStaffController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/reg', authOwnerController.createOwner);
router.post('/auth', authOwnerController.authorization);
router.post('/staff/reg', authStaffController.createStaff);
router.post('/staff/auth', authStaffController.staffAuthorization);

module.exports = router;
