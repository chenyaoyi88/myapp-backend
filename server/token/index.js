const jwt = require('jsonwebtoken');
const config = require('../../config');
const dbcontrol = require('../dbcontrol');
const TokenSave = require('../models/token');

const tokenStatus = {
  success: {
    code: '8000',
    msg: '操作成功',
    data: null
  },
  error: {
    code: '8001',
    msg: 'token 参数缺失',
    data: null
  },
  timeout: {
    code: '8002',
    msg: '登录超时',
    data: null
  },
  logout: {
    code: '8003',
    msg: '该帐号已退出登录',
    data: null
  },
  cleanError: {
    code: '8004',
    msg: '退出帐号失败',
    data: null
  },
  findError: {
    code: '8005',
    msg: '查找 token 失败',
    data: null
  }
};

const fnToken = {
  /**
   * @description 签发 token
   * @param username 用户名
   * @returns token
   */
  sign: function (username) {
    return jwt.sign({
      username
    }, config.secret, {
      expiresIn: config.expireTime
    });
  },
  /**
   * @description 查找 token 相关信息
   * @param res 响应
   * @param tokenCheckConditions 客户端传过来用来查询 token 相关信息的查询条件 
   * @param fnSuccess 查找成功 token 之后的回调
   * @param fnFail  查找失败 token 之后的回调
   */
  find: function (res, tokenCheckConditions, fnSuccess, fnFail) {
    // 带了 token
    dbcontrol.findOne(TokenSave, tokenCheckConditions)
    // 查找成功
    .then((data) => {
      // data 没有数据
      if (!data) {
        console.log('查找成功，进入失败回调，token 相关数据为：' + data);
        fnFail && fnFail(data);
      } else {
        // data 有数据
        console.log('查找成功，进入成功回调，token 相关数据为：' + data);
        fnSuccess && fnSuccess(data);
      }
    })
    // 查找失败
    .catch((err) => {
      console.log('查找 token 失败：' + err);
      res.send(tokenStatus.findError);
    });
  },
  /**
   * @description 校验 token
   * @param res 响应
   * @param tokenString 客户端上传的 token 
   * @param cb  校验之后的回调
   */
  verify: function (res, tokenString, cb) {
    /**
     * step1：校验 token 是否存在（存在代表已登录，不存在代表已退出）
     * step2：校验 token 是否超时
     */
    if (!tokenString) {
      // 没带 token 进来 
      res.send(tokenStatus.error);
    } else {
      this.find(res, { token: tokenString }, () => {
        // 有数据，去验证是否失效
        console.log('验证 token 是否过期');
        jwt.verify(tokenString, config.secret, function (err, decoded) {
          if (err) {
            // 时间失效、伪造 => 超时（需要重新登录）
            console.log('token 已失效');
            res.send(tokenStatus.timeout);
          } else {
            // 校验通过，返回 decoded 
            console.log('token 可以正常使用');
            cb(decoded);
          }
        });
      }, (data) => {
        // 没数据，直接返回
        console.log('用户已退出登录：' + data);
        res.send(tokenStatus.logout);
      });
    }

  },
  /**
   * @description 移除 token
   * @param res 响应
   * @param tokenString 客户端上传的 token 
   */
  remove: function (res, tokenString) {
    // 先校验
    this.verify(res, tokenString, (decoded) => {
      dbcontrol.removeByConditions(TokenSave, {
          username: decoded.username
        })
        .then((data) => {
          console.log('清除 token 成功：' + data);
          res.send(tokenStatus.success);
        })
        .catch((err) => {
          console.log('清除 token 失败：' + err);
          res.send(tokenStatus.cleanError);
        });
    });
  }
};

module.exports = fnToken;