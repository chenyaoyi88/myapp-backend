const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');

// 状态-根据 ID 修改指定文章
const deleteStatus = {
    lackID: {
        lackID: '3040',
        msg: '操作失败，缺少请求参数',
        data: null
    },
    someEmpty: {
        code: '3041',
        msg: '操作失败，请检查必填项',
        data: null
    }
};

/**
 * @description 根据 ID 修改指定文章
 */
router.post('/', function (req, res) {

    const articalId = req.body.articalId;
    const articalTitle = req.body.title;
    const articalType = req.body.type;
    const articalContent = req.body.content;

    // 如果没有文章 ID，返回错误
    if (!(articalId)) {
        res.send(deleteStatus.lackID);
        return;
    }

    // 如果有必填项没有填，返回错误
    if (!(articalTitle && articalType && articalContent)) {
        res.send(deleteStatus.someEmpty);
        return;
    }

    // token 验证通过，修改指定文章
    const articalData = Object.assign(req.body, {
        username: req.tokenDecoded.username
    });
    
    dao.update(Artical, { _id: articalId }, articalData)
    .then((data) => {
        console.log('更新文章成功：' + data);
        res.send(status.success(null));
    })
    .catch((err) => {
        console.log('更新文章失败：' + err);
        res.send(status.error());
    });

});

module.exports = router;