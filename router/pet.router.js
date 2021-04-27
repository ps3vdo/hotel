const Router = require('express');
const petController = require('../controller/pet.controller');

const router = new Router();

router.post('/pet', petController.createPet);
router.get('/pet', petController.getPet);
router.get('/pet/:id', petController.getOnePet);
router.put('/pet', petController.updatePet);
router.delete('/pet/:id', petController.deletePet);

module.exports = router