var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const token = req.header
  res.send({
    code: '0000',
    msg: '操作成功',
    data: token
  });
});

module.exports = router;
