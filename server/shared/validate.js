const validate = {
  isEmpty: function(reqData) {
    for (let pro in reqData) {
      if (!reqData[pro]) {
        return true
      }
    }
    return false;
  }
};

module.exports = validate;