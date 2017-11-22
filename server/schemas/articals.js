const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const colors = require('colors');

const ArticalSchema = new Schema({
    // 用户
    username: {
        type: String,
        require: true
    },
    // 文章标题
    title: {
        type: String,
        require: true,
        default: '无标题文章'
    },
    // 文章分类
    type: {
        type: String,
        require: true
    },
    // 文章封面
    cover: {
        type: String
    },
    // 文章标签
    tag: {
        type: String
    },
    // 文章内容
    content: {
        type: String,
        default: '当前内容为空'
    },
    // 访问量
    hits: {
        type: Number,
        default: 0
    },
    // 创建/更新时间+
    time: {
        createAt: {
            type: String,
            default: new Date().toLocaleString()
        },
        updateAt: {
            type: String,
            default: new Date().toLocaleString()
        }
    }
});

ArticalSchema.pre('save', function (next) {
    // 如果是新文章
    if (this.isNew) {
        this.time.updateAt = this.time.createAt = new Date().toLocaleString();
    } else {
        // 如果是编辑文章
        this.time.updateAt = new Date().toLocaleString();
    }
    next();
});


// 用户的表结构
module.exports = ArticalSchema;