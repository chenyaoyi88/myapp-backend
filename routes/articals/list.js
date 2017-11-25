const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const fnToken = require('../../server/token');
const status = require('../../server/shared/status');

// // 状态-文章列表
// const listStatus = {
//     lackID: {
//         code: '3010',
//         msg: '操作失败，缺少请求参数',
//         data: null
//     }
// };

/**
 * 查找用户文章列表
 * 
 * @param {any} res response
 * @param {any} updateConditions 要更新的内容
 */
function artical_findAll(res, conditions) {
    dbcontrol.find(Artical, conditions)
    .then((data) => {
        console.log('查找用户文章列表成功：' + data);
        res.send(status.success(data));
    })
    .catch((err) => {
        console.log('查找用户文章列表成功：' + err);
        res.send(status.error());
    });
}

/**
 * @description 获取用户的所有文章
 */
router.get('/', function (req, res) {

    const pageSize = req.query.pageSize;
    const pageNo = req.query.pageNo;

    // 检查 token
    const token = req.headers.token;
    fnToken.verify(res, token, (decoded) => {
        // token 验证通过，查询所有文章数据
        artical_findAll(res, {
            username: decoded.username
        });
    });

});

module.exports = router;