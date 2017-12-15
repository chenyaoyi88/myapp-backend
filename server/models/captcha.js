const mongoose = require('mongoose');
const CaptchaSchema = require('../schemas/captcha');

module.exports = mongoose.model('Captcha', CaptchaSchema);