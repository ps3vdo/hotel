const Router = require('express');
const ownerController = require('../controller/owner.controller');
const authMiddleware = require('../middlewaree/auth.middleware');
const roleMiddleware = require('../middlewaree/role.middleware');

const router = new Router();

router.post('/owner',roleMiddleware(["staff"]), ownerController.createOwner);
router.get('/owner', roleMiddleware(["owner"]), ownerController.getOwners); ///test
router.get('/owner/:id', ownerController.getOneOwner);
router.put('/owner', ownerController.updateOwner);
router.delete('/owner/:id', ownerController.deleteOwner);

module.exports = router