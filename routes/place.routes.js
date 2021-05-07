const Router = require('express');
const placeController = require('../controller/place.controller');

const router = new Router();

router.post('/place', placeController.createPlace);
router.get('/place', placeController.getPlace);
router.get('/place/:id', placeController.getOnePlace);
router.put('/place', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);

module.exports = router