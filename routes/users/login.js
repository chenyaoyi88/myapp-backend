const express = require('express');
const router = express.Router();
const User = require('../../server/models/user');
const TokenSave = require('../../server/models/token');
const dbcontrol = require('../../server/dbcontrol');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const fnToken = require('../../server/token');

// const colors = require('colors');

// 用户登录状态
const loginStatus = {
  userNotExist: {
    code: '1002',
    msg: '用户不存在',
    data: null
  },
  userPasswordError: {
    code: '1003',
    msg: '密码有误',
    data: null
  },
  userFrozen: {
    code: '1004',
    msg: '用户被冻结',
    data: null
  }
};

router.post('/', function (req, res) {

  if (validate.isEmpty(req.body)) {
    res.send(status.empty);
    return;
  }

  const username = req.body.username;

  dbcontrol.find(User, {
    username
  })
  .then((data) => {
    if (!data) {
      // 用户不存在
      res.send(loginStatus.userNotExist);
    } else {
      // 用户存在，用户名匹配
      // 验证用户名对应的密码
      User.comparePassword(req.body.password, data[0].password, (isMatch) => {
        if (!isMatch) {
          // 密码不匹配
          res.send(loginStatus.userPasswordError);
        } else {
          // 密码正确
          const username = data[0].username;
          const token = fnToken.sign(username);

          // 保存新 token
          // note: 如果已登录的情况下没有退出而又再次登录，插入 token 会失败
          fnToken.find(res, { username }, () => {
            // 有 token 记录了，更新
            dbcontrol.update(TokenSave, { username }, { token });
          }, () => {
            // 没有 token 记录，插入
            dbcontrol.insert(new TokenSave({
              username: username,
              token: token
            }));
          });

          // 返回 token 给前端
          res.send(status.success(null, {
            token: token
          }));

        }
      });
    }
  })
  .catch((err) => {
    console.log('查找用户文章失败：' + err);
    res.send(status.error());
  });


});

module.exports = router;