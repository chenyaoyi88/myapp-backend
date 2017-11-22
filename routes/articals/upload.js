const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const jwt = require("jsonwebtoken");
const config = require('../../config');
const status = require('../../server/shared/status');
const validate = require('../../server/shared/validate');
const colors = require('colors');

// 上传状态
const uploadStatus = {
    someEmpty: {
        code: '3001',
        msg: '操作失败，请检查必填项',
        data: null
    }
};

/**
 * @description 上传文章
 */
router.post('/', function (req, res, next) {

    const articalTitle = req.body.title;
    const articalType = req.body.type;
    const articalContent = req.body.content;

    // 如果有必填项没有填，返回错误
    if (!(articalTitle && articalType && articalContent)) {
        res.send(uploadStatus.someEmpty);
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
                // token 验证通过，插入文章数据
                const articalData = Object.assign(req.body, {
                    username: decoded.username
                });
                artical_add(res, articalData);
            }
        });

    } else {
        res.send(status.error());
    }

});

/**
 * 添加文章到指定用户名上
 * @param {*} res 响应
 * @param {*} insertData 要插入的数据
 */
function artical_add(res, insertData) {
    dbcontrol.insert(new Artical(insertData))
        .then((resMsg) => {
            console.log('添加文章成功: ' + resMsg);
            res.send(status.success(null));
        })
        .catch((err) => {
            console.log('添加文章失败: ' + err);
            res.send(status.errorInsert());
        });
}

module.exports = router;

// https://www.cnblogs.com/pspgbhu/p/5794160.html