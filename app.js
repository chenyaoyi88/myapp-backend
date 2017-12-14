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
const register = require('./routes/user/register');
const login = require('./routes/user/login');
const logout = require('./routes/user/logout');
const artical_add = require('./routes/artical/add');
const artical_list = require('./routes/artical/list');
const artical_delete = require('./routes/artical/delete');
const artical_detail = require('./routes/artical/detail');
const artical_edit = require('./routes/artical/edit');
const file_uploadAvatar = require('./routes/file/upload_avatar');
const comment_add = require('./routes/comment/add');
const comment_list = require('./routes/comment/list');
const check = require('./routes/check');
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

app.use('/', index);
// 用户注册
app.use('/user/register', register);
// 用户登录
app.use('/user/login', login);
// 用户退出
app.use('/user/logout', logout);
// 添加文章
app.use('/artical/add', midCheckToken, artical_add);
// 获取文章列表
app.use('/artical/list', midCheckToken, artical_list);
// 文章删除
app.use('/artical/delete', midCheckToken, artical_delete);
// 获取文章详情
app.use('/artical/detail', midCheckToken, artical_detail);
// 编辑/更新文章
app.use('/artical/edit', midCheckToken, artical_edit);
// 上传头像
app.use('/file/upload_avatar', midCheckToken, file_uploadAvatar);
// 添加评论
app.use('/comment/add', midCheckToken, comment_add);
// 获取文章的评论列表
app.use('/comment/list', midCheckToken, comment_list);
// 检查 token 
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