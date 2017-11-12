// 全局常用默认 code 
const defaultCode = {
  // 成功
  success: '0000',
  // 失败
  error: '9999',
  // 数据为空
  empty: '7777',
  // 已存在
  exist: '1001',
  // 插入数据失败
  errorInsert: '4001',
  // 超时
  timeout: '8888'
};

const status = {
  success: function (data, options) {
    return Object.assign({
      code: defaultCode.success,
      msg: '操作成功',
      data: data
    }, options);
  },
  error: function (code) {
    return {
      code: code || defaultCode.error,
      msg: '操作失败',
      data: null
    }
  },
  empty: function () {
    return {
      code: defaultCode.empty,
      msg: '数据不能为空',
      data: null
    }
  },
  exist: function () {
    return {
      code: defaultCode.exist,
      msg: '记录已存在',
      data: null
    }
  },
  errorInsert: function () {
    return {
      code: defaultCode.errorInsert,
      msg: '添加记录失败',
      data: null
    }
  },
  timeout: function () {
    return {
      code: defaultCode.timeout,
      msg: '登录超时',
      data: null
    }
  },
  showMsg: function (code, msg) {
    return {
      code: code,
      msg: msg,
      data: null
    }
  } 
};

module.exports = status;