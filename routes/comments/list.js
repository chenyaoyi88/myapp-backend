const express = require('express');
const router = express.Router();
const Comment = require('../../server/models/comment');
const Artical = require('../../server/models/artical');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');

// 状态-添加评论
const listStatus = {
    someEmpty: {
        code: '4001',
        msg: '操作失败，请检查必填项',
        data: null
    },
    findArticalIdError: {
        code: '4004',
        msg: '操作失败，查找文章ID失败',
        data: null
    }
};

/**
 * @description 添加评论
 */
router.post('/', function (req, res) {

    const artical = req.body.artical;
    // 如果有必填项没有填，返回错误
    if (!(artical)) {
        res.send(listStatus.someEmpty);
        return;
    }

    Artical.findById(artical, function (err, articals) {
        // 查找文档对应的评论
        Comment.find({
            artical: artical
        })
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
            res.send(status.success({
                articals: articals,
                comments: comments
            }));
        });
    });

});

module.exports = router;