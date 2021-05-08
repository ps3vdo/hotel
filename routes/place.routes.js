const Router = require('express');
const placeController = require('../controller/place.controller');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/place', roleMiddleware(["doctor", "admin"]), placeController.createPlace);
router.get('/place', placeController.getPlace);
router.get('/place/free', placeController.getFreePlace);
router.get('/place/:id', placeController.getOnePlace);
router.put('/place', roleMiddleware(["staff", "doctor", "admin"]),  placeController.updatePlace);
router.delete('/place/:id', roleMiddleware(["staff", "doctor", "admin"]), placeController.deletePlace);

module.exports = router