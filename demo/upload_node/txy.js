/**
 * @description 腾讯云上传 demo
 */
// 引入模块
var COS = require('cos-nodejs-sdk-v5');
// 创建实例
var cos = new COS({
    AppId: '1252753508',
    SecretId: 'AKIDlQFj2AbsSwBJH47ASYTEpESWP6c5lSkp',
    SecretKey: '61kQwHLN5cx9E6qQp3C4uQlvtfJm4HIC',
});
// 分片上传
cos.sliceUploadFile({
    // 腾讯云上面写的 bucket 名字
    Bucket: 'myappbucket',
    // 必须这么写
    Region: 'ap-guangzhou',
    Key: 'abc.png',
    FilePath: './public/avatar/abc.png'
}, function (err, data) {
    console.log(err, data);
});