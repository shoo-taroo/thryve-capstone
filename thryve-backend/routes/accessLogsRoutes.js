const express = require('express');
const router = express.Router();
const accessLogsController = require('../controllers/accessLogsController');

router.get('/', accessLogsController.getLogs);
router.post('/', accessLogsController.logAction);

module.exports = router;
