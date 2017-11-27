/**
 * @description 检测对象是否为空
 * @param {*Object} obj 要检测的对象
 * @returns {*Boolean}  false 不为空 true 为空
 */
function objectIsEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}

const dao = {
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
  },
  pagination: function (Model, params, page) {

    return Model.find(params).limit(Number(page.pageSize)).skip(Number(page.pageNo));

    // Model.find(params).limit(Number(page.pageSize)).skip(Number(page.pageNo)).exec((err, data) => {
    //     if (err) {
    //         console.log('查找用户文章列表失败：' + err);
    //         res.send(status.error());
    //     } else {
    //         console.log('查找用户文章列表成功：');
    //         Model.count(params, function (err, count) {
    //             res.send({
    //                 code: '0000',
    //                 msg: '操作成功',
    //                 data: {
    //                     pageNo: page.pageNo + 1,
    //                     pageSize: page.pageSize,
    //                     total: count,
    //                     data: data
    //                 }
    //             });
    //         });
    //     }
    // });

  }
};

module.exports = dao;