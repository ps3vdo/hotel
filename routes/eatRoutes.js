const Router = require('express');
const eatController = require('../controller/eatController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post('/eat',roleMiddleware(['staff', 'doctor', 'admin']), eatController.createEat);
router.get('/eat', roleMiddleware(['staff', 'doctor', 'admin']), eatController.getAllEat);
router.get('/eat/:id',roleMiddleware(['staff', 'doctor', 'admin']), eatController.getEat);
router.put('/eat',roleMiddleware(['staff', 'doctor', 'admin']), eatController.updateEat);
router.delete('/eat/:id', roleMiddleware(['staff', 'doctor', 'admin']), eatController.deleteEat);

module.exports = router;