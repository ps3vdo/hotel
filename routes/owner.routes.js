const Router = require('express');
const ownerController = require('../controller/owner.controller');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/owner',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.createOwner);
router.get('/owner', roleMiddleware(['staff', 'doctor', 'admin']), ownerController.getOwners);
router.get('/owner/:id',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.getOneOwner);
router.put('/owner',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.updateOwner);
router.delete('/owner/:id', roleMiddleware(['staff', 'doctor', 'admin']), ownerController.deleteOwner);

module.exports = router