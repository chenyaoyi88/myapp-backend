const express = require('express');
const router = express.Router();
const Comment = require('../../server/models/comment');
// const User = require('../../server/models/user');
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
    
    const articalId = req.body.articalId;
    // 如果有必填项没有填，返回错误
    if (!(articalId)) {
        res.send(listStatus.someEmpty);
        return;
    }

    dao.find(Comment, {
        articalId
    })
    .then((data) => {
        console.log('查找评论列表成功');
        res.send(status.success(data));
    })
    .catch((err) => {
        console.log('查找评论列表失败：' + err);
        res.send(listStatus.findArticalIdError);
    });

    // // step1: 根据 tokenDecoded 查到用户的 id 
    // const username = req.tokenDecoded.username;
    // dao.findOne(User, { username })
    // .then((data) => {

    //     const commentData = {
    //         artical: articalId,
    //         articalId: articalId,
    //         comment_user_id: data._id,
    //         comment_content: commentContent
    //     };

    //     // step2: 插入评论集合 
    //     dao.insert(new Comment(commentData))
    //     .then(() => {
    //         res.send(status.success(null));
    //     })
    //     .catch((err) => {
    //         console.log('插入文章评论失败：' + err);
    //         res.send(addStatus.insertCommentError);
    //     });

    // })
    // .catch((err) => {
    //     console.log('查询用户ID失败：' + err);
    //     res.send(addStatus.findUserDataError);
    // });

});

module.exports = router;