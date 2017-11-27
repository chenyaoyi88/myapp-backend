const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
// const dao = require('../../server/dao');
const fnToken = require('../../server/token');
const status = require('../../server/shared/status');
const commonMethod = require('../../server/shared/method');
// const colors = require('colors');

// 状态-文章列表
const listStatus = {
    success: function (data, count, page) {
        return {
            code: '0000',
            msg: '操作成功',
            data: {
                data: data,
                total: count,
                pageNo: page.pageNo / page.pageSize + 1,
                pageSize: page.pageSize
            }
        }
    },
    getCountErr: {
        code: '3050',
        msg: '操作失败，查询分页总数失败',
        data: null
    }
};

/**
 * @description 获取用户的所有文章
 */
router.get('/', function (req, res) {

    // 检查 token
    const token = req.headers.token;
    fnToken.verify(res, token, () => {
        // token 验证通过，查询所有文章数据
        console.log('token 验证通过，查询所有文章数据');

        const requestParams = commonMethod.queryParamsSplit(req.query);
        const params = requestParams.params;
        const page = requestParams.page;

        Artical.find(params).limit(Number(page.pageSize)).skip(Number(page.pageNo)).exec((err, data) => {
            if (err) {
                console.log('查找用户文章列表失败：' + err);
                res.send(status.error());
            } else {
                // console.log('查找用户文章列表成功：' + data);
                console.log('查找用户文章列表成功：');
                Artical.count(params, function (getCountErr, count) {
                    if (getCountErr) {
                        console.log('查询分页总数失败：' + getCountErr);
                        res.send(listStatus.getCountErr);
                    } else {
                        console.log('查询分页总数成功：' + count);
                        res.send(listStatus.success(data, count, page));
                    }
                });
            }
        });

    });

});

module.exports = router;