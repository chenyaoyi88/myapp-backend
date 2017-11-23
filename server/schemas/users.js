const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const colors = require('colors');

const UserSchema = new Schema({
  // 用户名
  username: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  // 密码
  password: {
    type: String,
    require: true // 不可为空约束
  },
  token: {
    type: String
  },
  //最近登录时间+
  createTime: {
    type: String,
    default: new Date().toLocaleString()
  },
  updateTime: {
    type: String,
    default: new Date().toLocaleString()
  }
});

/**
 * @description 添加用户保存时中间件对 password 进行 bcrypt 加密,这样保证用户密码只有用户本人知道
 */
UserSchema.pre('save', function (next) {
  const user = this;
  // 如果是新注册的，添加创建和登录时间，同时加盐和哈希
  if (this.isModified('password') || this.isNew) {
    this.updateTime = this.createTime = new Date().toLocaleString();

    // 密码加盐
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        // console.log('**********'.green);
        // console.log('genSalt err: ' + err);
        // console.log('**********'.green);
        return next(err);
      }
      // 密码哈希
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          // console.log('**********'.yellow);
          // console.log('user.password: ' + user.password);
          // console.log('salt: ' + salt);
          // console.log('hash err: ' + err);
          // console.log('**********'.yellow);
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
    
  } else {
    // 如果是用户登录，则更新登录时间
    this.updateTime = new Date().toLocaleString();
    next();
  }
});

/**
 * @description UserSchema 的静态方法，在Model层就能使用，用于校验用户输入密码是否正确
 * @param OriginalPassword 用户输入的密码
 * @param hashPassword 数据库里面的加盐+哈希的密码
 * @param callback 回调
 */
UserSchema.statics.comparePassword = function (OriginalPassword, hashPassword, callback) {
  // 通过 bcrypt.compare 去比较密码是否正确
  bcrypt.compare(OriginalPassword, hashPassword, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(isMatch);
  });
};

// 用户的表结构
module.exports = UserSchema;