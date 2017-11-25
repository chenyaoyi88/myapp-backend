const express = require('express');
const router = express.Router();
const status = require('../server/shared/status');
const fnToken = require('../server/token');

router.post('/', function (req, res) {
  const token = req.headers.token;
  fnToken.verify(res, token, (data) => {
    res.send(status.success(data));
  });
});

module.exports = router;