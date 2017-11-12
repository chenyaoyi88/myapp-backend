const token = {
  sign: function(payload, ) {
    return jwt.sign(payload, 'my_secret', {
      // 过期时间 1800 秒
      expiresIn: 1800
    });
  }
};

module.exports = token;