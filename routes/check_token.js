// const express = require('express');
// const router = express.Router();
// const status = require('../server/shared/status');
const fnToken = require('../server/token');

module.exports = function (req, res, next) {
    const token = req.headers.token;
    fnToken.verify(res, token, (decoded) => {
        console.log('token 检测通过cb');
        req.tokenDecoded = decoded;
        next();
    });
};