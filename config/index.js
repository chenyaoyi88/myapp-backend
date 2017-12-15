module.exports = {
  name: 'cyy',
  // JSON Web Token 加密密钥设置
  secret: 'secret_test', 
  // 登录超时时间
  expireTime: 3600 * 24,
  // 验证码 超时时间
  expireTimeCaptcha: 60 * 1000,
  // db
  database: 'mongodb://127.0.0.1:27017/cyy'
};