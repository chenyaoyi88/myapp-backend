const dbControl = {
  insert: function (Model) {
    return Model.save(function (err, res) {
      if (err) {
        console.log("save Error:" + err);
      } else {
        console.log("save Res:" + res);
      }
    });
  },
  remove: function (Model, conditions) {
    return Model.remove(conditions, function (err, res) {
      if (err) {
        console.log("remove Error:" + err);
      } else {
        console.log("remove Res:" + res);
      }
    })
  },
  removeById: function (Model, id) {
    return Model.findByIdAndRemove(id, function (err, res) {
      if (err) {
        console.log("removeById Error:" + err);
      } else {
        console.log("removeById Res:" + res);
      }
    });
  },
  removeByConditions: function (Model, conditions) {
    return Model.findByIdAndRemove(conditions, function (err, res) {
      if (err) {
        console.log("removeByConditions Error:" + err);
      } else {
        console.log("removeByConditions Res:" + res);
      }
    });
  },
  find: function (Model, conditions, options) {
    // return new Promise((resolve, reject) => {
    //   Model.find(conditions, options || {}, function (err, res) {
    //     if (err) {
    //       console.log("Error:" + err);
    //       reject(err);
    //     } else {
    //       console.log("Res:" + res);
    //       resolve(objectIsEmpty(res) ? null : res);
    //     }
    //   });
    // });

    let promise = Model.find(conditions, options || {}, function (err, res) {
      if (err) {
        console.log("find Error:" + err);
      } else {
        console.log('conditions：' + JSON.stringify(conditions));
        console.log("find Res:" + res);
        // objectIsEmpty(res) ? null : res;
      }
    });

    return promise.then((res) => {
      return objectIsEmpty(res) ? null : res;
    });
  },
  findById: function (Model, id) {
    return Model.findById(id, function (err, res) {
      if (err) {
        console.log("findById Error:" + err);
      } else {
        console.log("findById Res:" + res);
      }
    });
  },
  getCountByConditions: function (Model, conditions) {
    return Model.count(conditions, function (err, res) {
      if (err) {
        console.log("getCountByConditions Error:" + err);
      } else {
        console.log("getCountByConditions Res:" + res);
      }
    });
  },
  update: function (Model, conditions, updateConditions) {
    return Model.update(conditions, updateConditions, function (err, res) {
      if (err) {
        console.log("update Error:" + err);
      } else {
        console.log("update Res:" + res);
      }
    });
  },
  updateById: function (Model, id, updateConditions) {
    return Model.findByIdAndUpdate(id, updateConditions, function (err, res) {
      if (err) {
        console.log("updateById Error:" + err);
      } else {
        console.log("updateById Res:" + res);
      }
    });
  }
};

function objectIsEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}

module.exports = dbControl;