const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

//This file is used to get routes for several of the data requests
router.get('/data', dataController.getAllData);
router.post('/data', dataController.createData);
router.put('/data/:id', dataController.updateData);
router.delete('/data/:id', dataController.deleteData);

module.exports = router;
