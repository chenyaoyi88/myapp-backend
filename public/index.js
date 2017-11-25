var sUserName = document.getElementById('username');
var sPassword = document.getElementById('paassword');
var oBtnSignUp = document.getElementById('signup');
var oBtnSignIn = document.getElementById('signin');
var oBtnTokenCheck = document.getElementById('tokencheck');

const url = 'http://127.0.0.1:8888';

const registerUrl = url + '/users/register';
const loginUrl = url + '/users/login';
const tokenCheckUrl = url + '/check';
const articalUpload = url + '/articals/add';
const articalDownload = url + '/articals/list';
const articalEdit = url + '/articals/edit';

oBtnSignUp.addEventListener('click', function () {
    if (!(/\S/.test(sUserName.value)) || !(/\S/.test(sPassword.value))) {
        alert('帐号或密码不能为空');
        return;
    } else {
        ajax.post(registerUrl, {
                username: sUserName.value,
                password: sPassword.value
            })
            .then((data) => {
                if (data.code === '0000') {
                    // 注册成功
                    sUserName.value = '';
                    sPassword.value = '';
                } else if (data.code === '1001') {
                    // 帐号已注册
                } else {
                    // 注册失败
                }
                alert(JSON.stringify(data));
            })
            .catch((err) => {
                alert('注册请求失败');
            });
    }
});

oBtnSignIn.addEventListener('click', function () {
    if (!(/\S/.test(sUserName.value)) || !(/\S/.test(sPassword.value))) {
        alert('帐号或密码不能为空');
        return;
    } else {
        ajax.post(loginUrl, {
                username: sUserName.value,
                password: sPassword.value
            })
            .then((data) => {
                if (data.code === '0000') {
                    // 登录成功
                    sUserName.value = '';
                    sPassword.value = '';
                    sessionStorage.setItem('token', data.token);
                } else {
                    // 登录失败
                }
                alert(JSON.stringify(data));
            })
            .catch((err) => {
                alert('注册请求失败');
            });
    }
});

oBtnTokenCheck.addEventListener('click', function () {
    ajax.post(tokenCheckUrl, {})
        .then((data) => {
            alert(JSON.stringify(data));
        })
        .catch((err) => {
            alert('注册请求失败');
        });
});

var oArticalTitle = document.getElementById('title');
var radios = document.querySelectorAll('input[type="radio"]');
var oArticalCover = document.getElementById('cover');
var oArticalTag = document.getElementById('tag');
var oArticalContent = document.getElementById('content');

var oBtnUploadArtical = document.getElementById('articalUpload');
var oBtnUploadReset = document.getElementById('articalReset');
var artical = {
    title: '',
    type: '',
    cover: '',
    tag: '',
    content: ''
};
var E = window.wangEditor;
var editor = new E('#editor');
editor.create();
var oBtnSetText = document.getElementById('setText');

oBtnUploadArtical.addEventListener('click', function () {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            artical.type = radios[i].value;
        }
    }
    artical.title = oArticalTitle.value;
    artical.cover = oArticalCover.value;
    artical.tag = oArticalTag.value;
    artical.content = editor.txt.html();
    artical.articalId = '5a169646d01b392f94fc0dce';
    console.log(artical);
    ajax.post(articalUpload, artical)
        // ajax.post(articalEdit, artical)
        .then((data) => {
            alert(JSON.stringify(data));
        })
        .catch((err) => {
            alert('上传文章失败');
        });
});

oBtnUploadReset.addEventListener('click', function () {
    oArticalTitle.value = '';
    oArticalCover.value = '';
    oArticalTag.value = '';
    oArticalContent.value = '';
    radios[0].checked = true;
    for (let pro in artical) {
        artical[pro] = '';
    }
});

oBtnSetText.addEventListener('click', function () {
    ajax.get(articalDownload)
        .then((res) => {
            editor.txt.html(res.data[0].content);
        })
        .catch((err) => {
            alert('下载文章失败');
        });
});