const express = require('express');
const router = express.Router();
const fnToken = require('../../server/token');

router.get('/', function (req, res) {
    const token = req.headers.token;
    fnToken.remove(res, token);
});

module.exports = router;