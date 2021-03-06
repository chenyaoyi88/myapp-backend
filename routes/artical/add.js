const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');
const fnToken = require('../../server/token');

// 状态-添加文章
const addStatus = {
    someEmpty: {
        code: '3001',
        msg: '操作失败，请检查必填项',
        data: null
    }
};

/**
 * @description 上传文章
 */
router.post('/', function (req, res) {

    const articalTitle = req.body.title;
    const articalType = req.body.type;
    const articalContent = req.body.content;

    // 如果有必填项没有填，返回错误
    if (!(articalTitle && articalType && articalContent)) {
        res.send(addStatus.someEmpty);
        return;
    }

    const articalData = Object.assign(req.body, {
        username: req.tokenDecoded.username
    });

    dao.insert(new Artical(articalData))
    .then(() => {
        // console.log('添加文章成功: ' + resMsg);
        res.send(status.success(null));
    })
    .catch((err) => {
        console.log('添加文章失败: ' + err);
        res.send(status.errorInsert());
    });

});

module.exports = router;