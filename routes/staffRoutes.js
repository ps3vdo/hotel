const Router = require('express');
const staffController = require('../controller/staffController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.get('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.getStaff);
router.get('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.getOneStaff);
router.put('/staff', roleMiddleware(["staff", "doctor", "admin"]), staffController.updateStaff);
router.delete('/staff/:id', roleMiddleware(["staff", "doctor", "admin"]), staffController.deleteStaff);

module.exports = router