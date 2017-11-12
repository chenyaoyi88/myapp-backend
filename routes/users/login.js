const express = require('express');
const router = express.Router();
const User = require('../../server/models/user');
const dbcontrol = require('../../server/dbcontrol');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const config = require('../../config');
// token 
const jwt = require('jsonwebtoken');

const colors = require('colors');

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

/* GET users listing. */
router.post('/', function (req, res, next) {

  if (validate.isEmpty(req.body)) {
    res.send(status.empty);
    return;
  }

  // console.log('**********'.green);
  // console.log(req);
  // console.log('**********'.green);

  const username = req.body.username;

  dbcontrol.find(User, { username })
  .then((data) => {
    // 用户名匹配
    if (data) {
      // 验证用户名对应的密码
      User.comparePassword(req.body.password, data[0].password, (isMatch) => {
        if (isMatch) {
          /**
           * @description 根据用户名生成对应的 token
           * @param 参数一：必须是个 object, buffer或者string，这里用用户名来做标识符
           * @param 参数二：包含 HMAC 算法的密钥或 RSA 和 ECDSA 的 PEM 编码私钥的 string 或 buffer， 用来加密的字符串
           * @param 参数三：好多参数，这里只设置过期时间，具体翻译：https://segmentfault.com/a/1190000009494020
           */
          const token = jwt.sign({
            username: data[0].username
          }, config.secret, {
            // 过期时间 30 秒 
            expiresIn: 30
          });
          // 返回给前端
          res.send(status.success(null, { token: token }));
        } else {
          res.send(status.showMsg(loginStatus.userPasswordError));
        }
      });
    } else {
      // 用户不存在
      res.send(status.showMsg(loginStatus.userNotExist));
    }
  })
  .catch((err) => {
    res.send(status.error());
  });


});

module.exports = router;