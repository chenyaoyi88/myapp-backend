function objectIsEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}


const dbControl = {
  insert: function (Model) {
    return Model.save(function (err, res) {
      if (err) {
        console.log("保存数据失败:" + err);
      } else {
        console.log("保存数据成功:" + res);
      }
    });
  },
  remove: function (Model, conditions) {
    return Model.remove(conditions, function (err, res) {
      if (err) {
        console.log("删除数据失败:" + err);
      } else {
        console.log("删除数据成功:" + res);
      }
    })
  },
  removeById: function (Model, id) {
    return Model.findByIdAndRemove(id, function (err, res) {
      if (err) {
        console.log("根据ID删除数据失败:" + err);
      } else {
        console.log("根据ID删除数据成功:" + res);
      }
    });
  },
  removeByConditions: function (Model, conditions, options) {
    return Model.findOneAndRemove(conditions, options || {}, function (err, res) {
      if (err) {
        console.log("根据条件删除数据失败:" + err);
      } else {
        console.log("根据条件删除数据成功:" + res);
      }
    });
  },
  find: function (Model, conditions, options) {
    let promise = Model.find(conditions, options || {}, function (err, res) {
      if (err) {
        console.log("查找数据失败:" + err);
      } else {
        // console.log('conditions：' + JSON.stringify(conditions));
        console.log("查找数据成功:" + res);
        // objectIsEmpty(res) ? null : res;
      }
    });

    return promise.then((res) => {
      // 有空数组的情况[]
      return objectIsEmpty(res) ? null : res;
    });
  },
  findOne: function (Model, conditions) {
    return Model.findOne(conditions, function (err, res) {
      if (err) {
        console.log("根据查找一条数据失败:" + err);
      } else {
        console.log("根据查找一条数据成功:" + res);
      }
    });
  },
  findById: function (Model, id) {
    return Model.findById(id, function (err, res) {
      if (err) {
        console.log("根据ID查找数据失败:" + err);
      } else {
        console.log("根据ID查找数据成功:" + res);
      }
    });
  },
  getCountByConditions: function (Model, conditions) {
    return Model.count(conditions, function (err, res) {
      if (err) {
        console.log("根据条件查找数据记录个数失败:" + err);
      } else {
        console.log("根据条件查找数据记录个数成功:" + res);
      }
    });
  },
  update: function (Model, conditions, updateConditions) {
    return new Promise((resolve, reject) => {
      Model.update(conditions, updateConditions, function (err, res) {
        if (err) {
          console.log("更新数据失败:" + err);
          reject(err);
        } else {
          console.log("更新数据成功:" + JSON.stringify(res));
          resolve(res);
        }
      });
    });
  },
  updateById: function (Model, id, updateConditions) {
    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(id, updateConditions, {
        new: true
      }, function (err, res) {
        if (err) {
          console.log("根据ID更新数据失败:" + err);
          reject(err);
        } else {
          console.log("根据ID更新数据成功:" + res);
          resolve(res);
        }
      });
    });
  }
};

module.exports = dbControl;