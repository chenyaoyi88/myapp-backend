const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    // 文章 ID
    articalId: {
        type: String,
        require: true
    },
    // 用户 ID
    comment_user_id: {
        type: String,
        require: true
    },
    // 评论内容
    comment_content: {
        type: String,
        require: true,
        default: ''
    },
    // 创建时间
    createTime: {
        type: String,
        default: new Date().toLocaleString()
    },
    // 更新时间
    updateTime: {
        type: String,
        default: new Date().toLocaleString()  
    }
});

CommentSchema.pre('save', function (next) {
    // 如果是新评论
    if (this.isNew) {
        this.updateTime = this.createTime= new Date().toLocaleString();
    } else {
        // 如果是编辑评论
        this.updateTime = new Date().toLocaleString();
    }
    next();
});

CommentSchema.pre('update', function (next) {
    // update 的时候触发
    this.update({}, {
        $set: {
            updateTime: new Date().toLocaleString()
        }
    });
    next();
});


// 评论的表结构
module.exports = CommentSchema;