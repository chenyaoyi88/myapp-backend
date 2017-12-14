const express = require('express');
const router = express.Router();
const status = require('../server/shared/status');
const svgCaptcha = require('svg-captcha');

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

router.get('/', function (req, res) {
    const captcha = svgCaptcha.create();
    // console.log(req);
    // req.session.captcha = captcha.text;
    // res.send(status.success(captcha.data));
    res.send(status.success(req.headers));
});

/**

验证码流程：

注册功能：

前端：
输入帐号密码，点击获取验证码

后端：
接收到获取验证码请求，生成验证码，记录帐号、验证码创建时间、验证码入库
返回验证码图片链接到前端

前端：
输入验证码图片上面的信息，提交

后端：
查库，根据用户名和验证码和库里面的比对，如果匹配，则

 * 
 */

module.exports = router;