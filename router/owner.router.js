const Router = require('express');
const router = new Router();
const ownerController = require('../controller/owner.controller');
router.post('/owner', ownerController.createOwner);
router.get('/owner', ownerController.getOwners);
router.get('/owner/:id', ownerController.getOneOwner);
router.put('/owner', ownerController.updateOwner);
router.delete('/owner/:id', ownerController.deleteOwner);







module.exports = router