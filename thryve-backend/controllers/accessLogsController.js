const AccessLog = require('../models/accessLogsModel');

exports.logAction = async (req, res) => {
  try {
    const log = new AccessLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await AccessLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
