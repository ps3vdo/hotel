const Router = require('express');
const staffController = require('../controller/staffController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authStaffController = require('../controller/authStaffController');

const router = new Router();

router.post('/staff/reg', authStaffController.createStaff);
router.post('/staff/auth', authStaffController.staffAuthorization);
router.get('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.getStaff);
router.get('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.getOneStaff);
router.put('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.updateStaff);
router.delete('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.deleteStaff);

module.exports = router