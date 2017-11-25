const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const colors = require('colors');

// token 表结构
const TokenSchema = new Schema({
    // 用户名
    username: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    // token
    token: {
        type: String,
        require: true // 不可为空约束
    },
    // token 创建时间
    tokenCreateTime: {
        type: String,
        require: true,
        default: new Date().toLocaleString()
    },
    // token 更新时间（重新登录）
    tokenUpdateTime: {
        type: String,
        require: true,
        default: new Date().toLocaleString()
    }
});

TokenSchema.pre('save', function (next) {
    this.tokenCreateTime = this.tokenUpdateTime = new Date().toLocaleString();
    next();
});

TokenSchema.pre('update', function (next) {
    // update 的时候触发
    this.update({}, {
        $set: {
            tokenUpdateTime: new Date().toLocaleString()
        }
    });
    next();
});

module.exports = TokenSchema;