const Router = require('express');
const petController = require('../controller/petController');
const roleMiddleware = require('../middlewaree/role.middleware')

const router = new Router();

router.post('/pet',roleMiddleware(["staff", "doctor", "admin", "owner"]), petController.createPet);
router.get('/pet', petController.getPet);
router.get('/pet/:id', petController.getOnePet);
router.put('/pet',roleMiddleware(["staff", "doctor", "admin"]), petController.updatePet);
router.delete('/pet/:id',roleMiddleware(["staff", "doctor", "admin"]), petController.deletePet);

module.exports = router