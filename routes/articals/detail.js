const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');

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
router.post('/', function (req, res) {

    const articalId = req.body.articalId;

    // 如果没有文章 ID，返回错误
    if (!(articalId)) {
        res.send(deleteStatus.lackID);
        return;
    }

    dao.findById(Artical, articalId)
    .then((data) => {
        console.log('获取文章详情成功：' + data);
        res.send(status.success(data));
    })
    .catch((err) => {
        console.log('获取文章详情失败：' + err);
        res.send(status.error());
    });

});

module.exports = router;