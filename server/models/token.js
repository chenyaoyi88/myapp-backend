const mongoose = require('mongoose');
const TokenSchema = require('../schemas/token');

module.exports = mongoose.model('TokenSave', TokenSchema);