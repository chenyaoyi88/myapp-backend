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

    const token = req.headers.token;
    fnToken.verify(res, token, (decoded) => {
        // token 验证通过，插入文章数据
        const articalData = Object.assign(req.body, {
            username: decoded.username
        });
        artical_add(res, articalData);
    });

});

/**
 * 添加文章到指定用户名上
 * @param {*} res 响应
 * @param {*} insertData 要插入的数据
 */
function artical_add(res, insertData) {
    dao.insert(new Artical(insertData))
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