const Router = require('express');
const petsController = require('../controller/petsController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post('/pet',roleMiddleware(["staff", "doctor", "admin", "owner"]), petsController.createPet);
router.get('/pets', roleMiddleware(["staff", "doctor", "admin", "owner"]), petsController.getPet);
router.get('/pets/:id', roleMiddleware(["staff", "doctor", "admin", "owner"]), petsController.getOnePet);
router.put('/pet',roleMiddleware(["staff", "doctor", "admin"]), petsController.updatePet);
router.delete('/pet/:id',roleMiddleware(["staff", "doctor", "admin"]), petsController.deletePet);

module.exports = router;