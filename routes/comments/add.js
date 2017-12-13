const express = require('express');
const router = express.Router();
const Comment = require('../../server/models/comment');
const Artical = require('../../server/models/artical');
const User = require('../../server/models/user');
const dao = require('../../server/dao');
const status = require('../../server/shared/status');

// 状态-添加评论
const addStatus = {
    someEmpty: {
        code: '4001',
        msg: '操作失败，请检查必填项',
        data: null
    },
    findUserDataError: {
        code: '4002',
        msg: '操作失败，查找用户ID失败',
        data: null
    },
    insertCommentError: {
        code: '4003',
        msg: '操作失败，插入文章评论失败',
        data: null
    },
    commentError: {
        code: '4004',
        msg: '操作失败，评论内容类型错误',
        data: null
    },
    findArticalDataError: {
        code: '4005',
        msg: '操作失败，查找文章ID失败',
        data: null
    },
};

/**
 * @description 添加评论
 */
router.post('/', function (req, res) {

    // 文章 ID
    const artical = req.body.artical;
    // 评论内容
    const content = req.body.content;
    // 给谁评论
    const commentTo = req.body.commentTo;

    // 如果评论内容有必填项没有填，返回错误
    if (!(artical && content)) {
        res.send(addStatus.someEmpty);
        return;
    }

    // 如果评论内容不是字符串，返回错误
    if (typeof content !== 'string') {
        res.send(addStatus.commentError);
    }

    // step1：先查询 artical（文章是否存在）
    dao.findById(Artical, artical)
        .then((artical) => {
            // 文章不存在
            if (!artical) {
                res.send(addStatus.findArticalDataError);
                return;
            }
            // step2: 根据 tokenDecoded 查到评论用户的 id 
            const username = req.tokenDecoded.username;

            dao.findOne(User, {
                username
            })
            .then((userInfo) => {
                // 添加的评论字段
                let commentData = {
                    // 文章 ID
                    artical: artical,
                    // 评论者 ID
                    from: userInfo._id,
                    // 文章内容
                    content: content
                };

                if (commentTo) {
                    // 如果是评论给其他人，添加对方的 id
                    Object.assign(commentData, {
                        to: commentTo
                    });
                }

                // step3: 插入评论集合 
                dao.insert(new Comment(commentData))
                .then(() => {
                    res.send(status.success(null));
                })
                .catch((err) => {
                    console.log('插入文章评论失败：' + err);
                    res.send(addStatus.insertCommentError);
                });

            })
            .catch((err) => {
                console.log('查询用户ID失败：' + err);
                res.send(addStatus.findUserDataError);
            });
        })
        .catch((err) => {
            console.log('找不到这篇文章' + err);
            res.send(addStatus.findArticalDataError);
        });



});

module.exports = router;