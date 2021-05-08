const Router = require('express');
const petController = require('../controller/pets.controller');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/pet',roleMiddleware(["staff", "doctor", "admin", "owner"]), petController.createPet);
router.get('/pets', roleMiddleware(["staff", "doctor", "admin", "owner"]), petController.getPet);
router.get('/pets/:id', roleMiddleware(["staff", "doctor", "admin", "owner"]), petController.getOnePet);
router.put('/pet',roleMiddleware(["staff", "doctor", "admin"]), petController.updatePet);
router.delete('/pet/:id',roleMiddleware(["staff", "doctor", "admin"]), petController.deletePet);

module.exports = router;