const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Captcha 表结构
const CaptchaSchema = new Schema({
    session: {
        type: Object,
        require: true 
    },
    expires: {
        type: Date,
        require: true 
    }
}, { collection: "captchas" });

module.exports = CaptchaSchema;