const mongoose = require('mongoose');
const ArticalSchema = require('../schemas/artical');

module.exports = mongoose.model('Artical', ArticalSchema);