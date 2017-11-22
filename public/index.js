var sUserName = document.getElementById('username');
var sPassword = document.getElementById('paassword');
var oBtnSignUp = document.getElementById('signup');
var oBtnSignIn = document.getElementById('signin');
var oBtnTokenCheck = document.getElementById('tokencheck');

const url = 'http://127.0.0.1:8888';

const registerUrl = url + '/users/register';
const loginUrl = url + '/users/login';
const tokenCheckUrl = url + '/check';
const articalUpload = url + '/articals/upload';

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

oBtnUploadArtical.addEventListener('click', function () {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            artical.type = radios[i].value;
        }
    }
    artical.title = oArticalTitle.value;
    artical.cover = oArticalCover.value;
    artical.tag = oArticalTag.value;
    artical.content = oArticalContent.value;
    console.log(artical);
    ajax.post(articalUpload, artical)
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














function checkItem(reqData, checkArr) {
    let isEmpty = function (obj) {
        for (let pro in obj) {
            if (obj[pro]) {
                // 对象有值，返回 false
                return false
            }
        }
        // 对象为空，返回 true
        return true;
    }

    if (isEmpty(reqData)) {
        // 对象为空
        return true;
    } else {
        // 对象不为空
        if (!(checkArr && checkArr instanceof Array && checkArr.length)) {
            // 数组为空，只检查对象
            return false;
        } else {
            // 数组不为空
            console.warn('有数组');
            const maxLen = checkArr.length;
            let count = 0;

            for (let pro in reqData) {
                for (let i = 0; i < checkArr.length; i++) {
                    if (pro === checkArr[i]) {
                        count++;
                    }
                }
            }

            if (count === maxLen) {
                // 必填项已填
                return true;
            } else {
                // 有必填项没有填，返回 false
                return false;
            }
        }
    }
}

var obj = {
    name: 'cyy',
    // age: 18,
    // school: 'abc'
};

// console.log(checkItem(obj, ['abc']));