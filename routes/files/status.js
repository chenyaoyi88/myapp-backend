const uploadStatus = {
    success: function (data) {
        return {
            code: '0000',
            msg: '操作成功',
            data: data
        }
    },
    error: {
        code: '5002',
        msg: '文件上传失败',
        data: null
    },
    typeError: {
        code: '5003',
        msg: '只支持png和jpg格式图片',
        data: null
    },
    renameError: {
        code: '5004',
        msg: '文件夹重命名失败',
        data: null
    }
};

module.exports = uploadStatus;