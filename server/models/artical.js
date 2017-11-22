const mongoose = require('mongoose');
const ArticalSchema = require('../schemas/articals');

module.exports = mongoose.model('Artical', ArticalSchema);