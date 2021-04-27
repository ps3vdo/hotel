const Router = require('express');
const staffController = require('../controller/staff.controller');

const router = new Router();

router.post('/staff', staffController.createStaff);
router.get('/staff', staffController.getStaff);
router.get('/staff/:id', staffController.getOneStaff);
router.put('/staff', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router