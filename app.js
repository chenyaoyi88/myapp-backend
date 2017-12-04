const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
// 关于http请求的日志中间件
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const index = require('./routes/index');
// 用户注册、登录、退出 
const register = require('./routes/users/register');
// 用户登录
const login = require('./routes/users/login');
// 用户退出
const logout = require('./routes/users/logout');
// 添加添加
const artical_add = require('./routes/articals/add');
// 查询文章列表
const artical_list = require('./routes/articals/list');
// 删除指定文章
const artical_delete = require('./routes/articals/delete');
// 获取文章想起
const artical_detail = require('./routes/articals/detail');
// 编辑/修改文章
const artical_edit = require('./routes/articals/edit');
// 上传头像
const file_uploadAvatar = require('./routes/files/upload_avatar');
// 校验 token 
const check = require('./routes/check');
// 校验 token 中间件
const midCheckToken = require('./routes/check_token');

const app = express();

console.log(app.get('env'));

/**
 * @description 允许跨域
 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,token');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200).end();
  } else {
    next();
  }
});

// 让 mongoose 操作可以 Promise 化
mongoose.Promise = Promise;

// todo；判断环境要读取数据库

// 连接数据库
mongoose.connect(config.database, {
  useMongoClient: true
});

// 数据库连接成功
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功：' + config.database);
});

// 数据库连接异常
mongoose.connection.on('error', function (err) {
  console.log('数据库连接失败: ' + err);
});

// 数据库连接断开
mongoose.connection.on('disconnected', function () {
  console.log('数据库中断了');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// todo：在这里使用验证 token 的中间件
app.use('/', index);
app.use('/users/register', function(req, res, next) {
  // 中间件，用来处理一些多个接口都有一样处理逻辑的部分
  console.log('中间件:', req.body);
  next();
}, register);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/articals/add', artical_add);
app.use('/articals/list', artical_list);
app.use('/articals/delete', artical_delete);
app.use('/articals/detail', artical_detail);
app.use('/articals/edit', artical_edit);
app.use('/files/upload_avatar', midCheckToken, file_uploadAvatar);
app.use('/check', midCheckToken, check);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;