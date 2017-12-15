const express = require('express');
const router = express.Router();
const status = require('../../server/shared/status');
const Captcha = require('../../server/models/captcha');

/**
 * 检测验证码
 */
router.get('/', function (req, res) {
    const captcha = req.query.captcha;
    Captcha.find({}, function (err, captchaList) {
        res.send(findCaptcha(captchaList, captcha) ? status.success(null) : status.error());
    });
});

/**
 * 查找 session 里面有没有验证码
 * @param {*} aCaptcha 
 */
function findCaptcha (aCaptcha, reqCaptcha) {
    if (aCaptcha && aCaptcha.length) {
        for (let i = 0; i < aCaptcha.length; i++) {
            let sessionCaptcha = JSON.parse(aCaptcha[i].session).captcha;
            if (sessionCaptcha === reqCaptcha) {
                return true;
            }
        }
    }
    return false;
}

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