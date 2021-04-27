const express = require('express');
const ownerRouter = require('owner.router');
const petRouter = require('pet.router')
app.use('/api', ownerRouter);
app.use('/api', petRouter);


module.exports = router;