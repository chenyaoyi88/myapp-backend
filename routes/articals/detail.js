const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');
const fnToken = require('../../server/token');

// 状态-根据 ID 获取指定文章详情
const deleteStatus = {
    lackID: {
        lackID: '3030',
        msg: '操作失败，缺少请求参数',
        data: null
    }
};

/**
 * 获取文章详情返回
 * @param {*} res response  
 * @param {*} id 文章 id
 */
function artical_detail(res, id) {
    dao.findById(Artical, id)
    .then((data) => {
        console.log('获取文章详情成功：' + data);
        res.send(status.success(data));
    })
    .catch((err) => {
        console.log('获取文章详情失败：' + err);
        res.send(status.error());
    });
}

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

    const token = req.headers.token;
    fnToken.verify(res, token, () => {
        // token 验证通过，获取指定文章
        artical_detail(res, articalId);
    });

});

module.exports = router;