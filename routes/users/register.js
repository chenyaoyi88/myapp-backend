const express = require('express');
const router = express.Router();
const User = require('../../server/models/user');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');

router.post('/', function (req, res) {

  if (validate.isEmpty(req.body)) {
    res.send(status.empty);
    return;
  }

  const username = req.body.username;

  const findUser = function (callback) {
    dao.find(User, {
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
        console.log('注册前查找用户失败：' + err);
        res.send(status.error());
      });
  }

  findUser(() => {
    // 没有数据，可以添加
    dao.insert(new User(req.body))
      .then((resMsg) => {
        // 数据添加成功
        console.log('注册用户成功: ' + resMsg);
        res.send(status.success(null));
      })
      .catch((err) => {
        // 数据添加失败
        console.log('注册用户失败: ' + err);
        res.send(status.errorInsert());
      });
  });

});

module.exports = router;