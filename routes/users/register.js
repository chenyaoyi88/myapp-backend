const express = require('express');
const router = express.Router();
const User = require('../../server/models/user');
const dbcontrol = require('../../server/dbcontrol');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const colors = require('colors');

/* GET users listing. */
router.post('/', function (req, res, next) {

  if (validate.isEmpty(req.body)) {
    res.send(status.empty);
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const findUser = function (callback) {
    dbcontrol.find(User, {
        username
      })
      .then((data) => {
        if (data) {
          // 用户名已注册
          res.send(status.exist());
        } else {
          // 用户名未注册
          callback && callback();
        }
      })
      .catch((err) => {
        res.send(status.error());
      });
  }

  findUser(() => {
    // 没有数据，可以添加
    dbcontrol.insert(new User(req.body))
      .then((resMsg) => {
        // 数据添加成功
        console.log('success: ' + resMsg);
        res.send(status.success(null));
      })
      .catch((err) => {
        // 数据添加失败
        console.log('err: ' + err);
        res.send(status.errorInsert());
      });
  });

});

module.exports = router;