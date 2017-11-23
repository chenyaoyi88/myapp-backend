const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const jwt = require("jsonwebtoken");
const config = require('../../config');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const colors = require('colors');

// 状态-根据 ID 获取指定文章详情
const deleteStatus = {
    lackID: {
        lackID: '3030',
        msg: '操作失败，缺少请求参数',
        data: null
    }
};

/**
 * @description 根据 ID 获取指定文章详情
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
                // token 验证通过，获取指定文章
                artical_detail(res, articalId);
            }
        });
    } else {
        res.send(status.error());
    }

});

/**
 * 获取文章详情返回
 * @param {*} res response  
 * @param {*} id 文章 id
 */
function artical_detail(res, id) {
    dbcontrol.findById(Artical, id)
    .then((data) => {
        res.send(status.success(data));
    })
    .catch((err) => {
        res.send(status.error());
    });
}

module.exports = router;