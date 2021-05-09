const Router = require('express');
const ownerController = require('../controller/ownerController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authOwnerController = require('../controller/authOwnerController');

const router = new Router();

//router.post('/owner',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.createOwner);
router.get('/owner', roleMiddleware(['staff', 'doctor', 'admin']), ownerController.getOwners);
router.get('/owner/:id',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.getOneOwner);
router.put('/owner',roleMiddleware(['staff', 'doctor', 'admin']), ownerController.updateOwner);
router.delete('/owner/:id', roleMiddleware(['staff', 'doctor', 'admin']), ownerController.deleteOwner);
router.post('/owner/reg', authOwnerController.createOwner);
router.post('/owner/auth', authOwnerController.authorization);

module.exports = router