const validate = {
  // 检测是否为空
  isEmpty: function (reqData) {
    for (let pro in reqData) {
      if (!reqData[pro]) {
        return true
      }
    }
    return false;
  },
  // 检测手机号码
  checkPhone: function (phone) {
    return /^1[3-9][0-9]{9}$/g.test(phone) ? true : false;
  }
};

module.exports = validate;