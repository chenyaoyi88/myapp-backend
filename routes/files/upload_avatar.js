const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const commonMethod = require('../../server/shared/method');
const uploadStatus = require('./status');
const uploadConfig = require('./config');

// 文件夹名字
const uploadFolder = uploadConfig.avatar.folder;
// 保存图片文件的路径 public/xxx
const uploadDir = uploadConfig.path + uploadFolder;
// input 的 name 值
const inputName = uploadConfig.avatar.inputName;

/* 图片上传路由 */
router.post('/', function (req, res) {
    // 创建上传表单
    const form = new formidable.IncomingForm();
    // 设置编辑
    form.encoding = 'utf-8';
    // 设置上传目录
    form.uploadDir = uploadDir;
    // 保留后缀
    form.keepExtensions = true;
    // 文件大小
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(uploadStatus.error);
            return;
        }
        // 后缀名
        let extName = '';
        switch (files[inputName].type) {
            case 'image/jpg':
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
        }

        // 文件格式不支持
        if (extName.length === 0) {
            res.send(uploadStatus.typeError);
            return;
        }

        // 图片名格式：上传的图片名称 + 具体时间（到毫秒）+ 后缀名
        const newImageName = files[inputName].name.split('.')[0] + '_' + commonMethod.getTime() + '.' + extName;
        // 图片写入地址；
        const newPath = form.uploadDir + newImageName;
        // 显示地址；
        const showUrl = uploadConfig.domain + uploadFolder + newImageName;
        // 文件重命名
        fs.rename(files[inputName].path, newPath, function (err) {
            if (err) {
                console.log('文件重命名失败：' + err);
                res.send(uploadStatus.renameError);
            } else {
                // console.log('文件重命名成功');
                res.send(uploadStatus.success({
                    fileUrl: showUrl
                }));
            }
        });

    });
});
module.exports = router;