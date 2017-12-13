const fnToken = require('../server/token');

module.exports = function (req, res, next) {
    const token = req.headers.token;
    fnToken.verify(res, token, (decoded) => {
        // console.log('token 中间件检测通过');
        req.tokenDecoded = decoded;
        next();
    });
};