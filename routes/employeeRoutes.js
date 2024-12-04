const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.listEmployees);
router.post('/employees', employeeController.addOrEditEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/statistics', employeeController.getStatistics);

module.exports = router;
