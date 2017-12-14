const express = require('express');
const router = express.Router();
const Comment = require('../../server/models/comment');
const status = require('../../server/shared/status');
const commonMethod = require('../../server/shared/method');

// 状态-添加评论
const listStatus = {
    someEmpty: {
        code: '4001',
        msg: '操作失败，请检查必填项',
        data: null
    },
    getCountErr: {
        code: '4010',
        msg: '操作失败，查询分页总数失败',
        data: null
    }
};

/**
 * @description 添加评论
 */
router.get('/', function (req, res) {

    const requestParams = commonMethod.queryParamsSplit(req.query);
    const artical = req.query.artical;
    const page = requestParams.page;
    
    // 查找文档对应的评论
    Comment.find({ artical })
    .limit(Number(page.pageSize)).skip(Number(page.pageNo))
    // 引用 User 文档中的 username 字段，来填充 from 字段
    // 引用 User 文档中的 username 字段，来填充 to 字段
    .populate([
        {
            path: 'from',
            select: 'username'
        },
        {
            path: 'to',
            select: 'username'
        }
    ])
    .exec(function (err, comments) {
        if (err) {
            console.log('查找用户评论列表失败：' + err);
            res.send(status.error());
        } else {
            Comment.count({ artical }, function (getCountErr, count) {
                if (getCountErr) {
                    console.log('查询分页总数失败：' + getCountErr);
                    res.send(listStatus.getCountErr);
                } else {
                    // console.log('查询分页总数成功：' + count);
                    res.send(status.pagination(comments, count, page));
                }
            });
        }
    });

});

module.exports = router;