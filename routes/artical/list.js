const express = require('express');
const router = express.Router();
const Artical = require('../../server/models/artical');
const status = require('../../server/shared/status');
const commonMethod = require('../../server/shared/method');

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

    const requestParams = commonMethod.queryParamsSplit(req.query);
    const params = requestParams.params;
    const page = requestParams.page;

    Artical.find(params).limit(Number(page.pageSize)).skip(Number(page.pageNo)).exec((err, data) => {
        if (err) {
            console.log('查找用户文章列表失败：' + err);
            res.send(status.error());
        } else {
            // console.log('查找用户文章列表成功：' + data);
            Artical.count(params, function (getCountErr, count) {
                if (getCountErr) {
                    console.log('查询分页总数失败：' + getCountErr);
                    res.send(listStatus.getCountErr);
                } else {
                    // console.log('查询分页总数成功：' + count);
                    res.send(status.pagination(data, count, page));
                }
            });
        }
    });

});

module.exports = router;