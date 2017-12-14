const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');

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
router.post('/', function (req, res) {

    const articalId = req.body.articalId;

    // 如果没有文章 ID，返回错误
    if (!(articalId)) {
        res.send(deleteStatus.lackID);
        return;
    }
    
    dao.removeById(Artical, articalId)
    .then((data) => {
        console.log('删除文章成功：' + data);
        res.send(status.success(null));
    })
    .catch((err) => {
        console.log('删除文章失败：' + err);
        res.send(status.error());
    });

});

module.exports = router;
