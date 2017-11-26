const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const dbcontrol = require('../../server/dbcontrol');
const fnToken = require('../../server/token');
const status = require('../../server/shared/status');
const commonMethod = require('../../server/shared/method');
const colors = require('colors');

// // 状态-文章列表
// const listStatus = {
//     lackID: {
//         code: '3010',
//         msg: '操作失败，缺少请求参数',
//         data: null
//     }
// };

/**
 * @description 获取用户的所有文章
 */
router.get('/', function (req, res) {

    // 检查 token
    const token = req.headers.token;
    fnToken.verify(res, token, (decoded) => {
        // token 验证通过，查询所有文章数据
        console.log('token 验证通过，查询所有文章数据');
        // artical_findAll(res, {
        //     username: decoded.username
        // });

        const requestParams = commonMethod.queryParamsSplit(req.query);
        const page = requestParams.page;
        const pageSize = page.pageSize || 10;
        const pageNo = page.pageNo < 1 ? 0 :(page.pageNo - 1) * pageSize;
        const params = requestParams.params;

        Artical.find(params).limit(Number(pageSize)).skip(Number(pageNo)).exec((err, data) => {
            if (err) {
                console.log('查找用户文章列表失败：' + err);
                res.send(status.error());
            } else {
                // console.log('查找用户文章列表成功：' + data);
                console.log('查找用户文章列表成功：');
                res.send(status.success(data));
            }
        })
        // .then((data) => {
        //     console.log('查找用户文章列表成功：' + data);
        //     console.log('查找用户文章列表成功：' + data);
        //     res.send(status.success(data));
        // })
        // .catch((err) => {
        //     console.log('查找用户文章列表失败：' + err);
        //     res.send(status.error());
        // });
    });

});

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
            console.log('查找用户文章列表失败：' + err);
            res.send(status.error());
        });
}

module.exports = router;