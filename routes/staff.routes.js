const Router = require('express');
const staffController = require('../controller/staff.controller');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.createStaff);
router.get('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.getStaff);
router.get('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.getOneStaff);
router.put('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.updateStaff);
router.delete('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.deleteStaff);

module.exports = router