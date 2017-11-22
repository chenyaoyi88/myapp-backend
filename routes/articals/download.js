const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const jwt = require("jsonwebtoken");
const config = require('../../config');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const colors = require('colors');

// 下载状态
const downloadStatus = {
    lackID: {
        code: '5001',
        msg: '操作失败，缺少请求参数',
        data: null
    }
};

/**
 * @description 下载文章
 */
router.post('/', function (req, res, next) {

    const articalId = req.body.id;

    // 如果没有文章 ID，返回错误
    if (!(articalId)) {
        res.send(downloadStatus.lackID);
        return;
    }

    // 检查 token
    const token = req.headers.token;
    // console.log('***********'.yellow);
    // console.log(token);
    // console.log('***********'.yellow);
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            // console.log(decoded.username);
            if (err) {
                // token 验证失败：时间失效、伪造 => 超时（需要重新登录）
                res.send(status.timeout());
            } else {
                // token 验证通过，插入文章数据
                
            }
        });

    } else {
        res.send(status.error());
    }

});

module.exports = router;