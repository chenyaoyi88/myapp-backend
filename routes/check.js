const express = require('express');
const router = express.Router();
const status = require('../server/shared/status');

router.post('/', function (req, res) {
  res.send(status.success(req.tokenDecoded));
});

module.exports = router;