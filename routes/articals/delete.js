const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const jwt = require("jsonwebtoken");
const config = require('../../config');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const colors = require('colors');

// 状态-删除文章
const deleteStatus = {
    lackID: {
        lackID: '3020',
        msg: '操作失败，缺少请求参数',
        data: null
    }
};

/**
 * @description 删除文章
 */
router.post('/', function (req, res, next) {
    
    const articalId = req.body.articalId;

    // 如果没有文章 ID，返回错误
    if (!(articalId)) {
        res.send(deleteStatus.lackID);
        return;
    }

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
                // token 验证通过，删除指定文章
                artical_delete(res, articalId);
            }
        });

    } else {
        res.send(status.error());
    }

});

function artical_delete(res, id) {
    dbcontrol.removeById(Artical, id)
    .then((data) => {
        res.send(status.success(null));
    })
    .catch((err) => {
        res.send(status.error());
    });
}

module.exports = router;

// https://www.cnblogs.com/pspgbhu/p/5794160.html